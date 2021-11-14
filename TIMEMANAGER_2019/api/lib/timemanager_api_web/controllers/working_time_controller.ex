defmodule TimemanagerApiWeb.WorkingTimeController do
  use TimemanagerApiWeb, :controller
  use Timex

  alias TimemanagerApi.TimeManager
  alias TimemanagerApi.TimeManager.WorkingTime

  action_fallback TimemanagerApiWeb.FallbackController

  def index(conn, _params) do
    workingtimes = TimeManager.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def getAllByUser(conn, params) do
    user_id = Map.get(params, "user_id")
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)

    case Integer.parse(user_id) do
      {user_id, ""} when user_id > 0 ->
        # user_id is a valid positive integer
        if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" || user.id == user_id do
          workingtimes = TimeManager.list_workingtimes_by_user(params)
          render(conn, "index.json", workingtimes: workingtimes)
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

  def getOneByUser(conn, params) do
    user_id = Map.get(params, "user_id")

    case Integer.parse(user_id) do
      {user_id, ""} when user_id > 0 ->
        # user_id is a valid positive integer
        workingtime = TimeManager.get_workingtime_by_id_by_user(params)
        render(conn, "show.json", working_time: workingtime)
      _ ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "invalid user_id"})
    end
  end

  def createWorkingTimeUser(conn, %{"user_id" => userId, "working_time" => working_time}) do
    newWorkingTime = %{start: working_time["start"], end: working_time["end"], user_id: userId}
    with {:ok, %WorkingTime{} = working_time_db} <- TimeManager.create_working_time(newWorkingTime) do
      conn
      |> put_status(:created)
      #|> put_resp_header("location", Routes.working_time_path(conn, :show, working_time_db))
      |> render("show.json", working_time: working_time_db)
    end
end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    working_time = TimeManager.get_working_time!(id)

    with {:ok, %WorkingTime{} = working_time} <- TimeManager.update_working_time(working_time, working_time_params) do
      render(conn, "show.json", working_time: working_time)
    end
  end

  def delete(conn, %{"id" => id}) do
    working_time = TimeManager.get_working_time!(id)

    with {:ok, %WorkingTime{}} <- TimeManager.delete_working_time(working_time) do
      send_resp(conn, :no_content, "")
    end
  end
end
