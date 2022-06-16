defmodule TimemanagerApiWeb.TaskController do
  use TimemanagerApiWeb, :controller

  alias TimemanagerApi.TimeManager
  alias TimemanagerApi.TimeManager.Task

  action_fallback TimemanagerApiWeb.FallbackController

  def getAllByUser(conn, %{"user_id" => user_id}) do
    user = TimeManager.get_user!(conn.assigns.signed_user.id)

    case Integer.parse(user_id) do
      {user_id, ""} when user_id > 0 ->
        # user_id is a valid positive integer
        if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" || user.id == user_id do
          tasks = TimeManager.list_tasks_by_user(user_id)
          render(conn, "index.json", tasks: tasks)
        else
          conn
          |> put_status(:unauthorized)
          |> json(%{error: "unauthorized"})
        end
      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "invalid user_id"})
    end
  end

  def createByUser(conn, %{"user_id" => userId, "task" => task}) do
    loggedUser =  TimeManager.get_user!(conn.assigns.signed_user.id)
    user = TimeManager.get_user!(userId)

    if TimeManager.has_right(loggedUser, user) || user.id == loggedUser.id do
      newTask = %{name: task["name"], owner_id: userId}
      with {:ok, %Task{} = task_db} <- TimeManager.create_task(newTask) do
        createdTask = TimeManager.get_task!(task_db.id)
        conn
        |> put_status(:created)
        |> render("show.json", task: createdTask)
      end
    else
      conn
      |> put_status(:unauthorized)
      |> json(%{error: "unauthorized"})
    end
end

  def delete(conn, %{"id" => id}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    task = TimeManager.get_task!(id)

    if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" || task.owner_id == user.id do
      with {:ok, %Task{}} <- TimeManager.delete_task(task) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> put_status(:unauthorized)
      |> json(%{error: "unauthorized"})
    end
  end
end
