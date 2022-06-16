defmodule TimemanagerApiWeb.ClockController do
  use TimemanagerApiWeb, :controller

  alias TimemanagerApi.TimeManager
  alias TimemanagerApi.TimeManager.Clock
  alias TimemanagerApi.TimeManager.WorkingTime
  alias TimemanagerApi.TimeManager.Task

  action_fallback TimemanagerApiWeb.FallbackController

  def index(conn, _params) do
    clocks = TimeManager.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def getAllClocksByUser(conn, params) do
    user = TimeManager.get_user!(conn.assigns.signed_user.id)
    user_id = Map.get(params, "user_id")

    case Integer.parse(user_id) do
      {user_id, ""} when user_id > 0 ->
        # user_id is a valid positive integer
        if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" || user.id == user_id do
          clocks = TimeManager.list_clock_by_user(params)
          render(conn, "index.json", clocks: clocks)
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

  def createClockUser(conn, %{"user_id" => userId, "clock" => clock}) do
    newClock = %{time: clock["time"], user_id: userId}
    with {:ok, %Clock{} = clock_db} <- TimeManager.create_clock(newClock) do
      conn
      |> put_status(:created)
        #|> put_resp_header("location", Routes.working_time_path(conn, :show, working_time_db))
      |> render("show.json", clock: clock_db)
    end
  end

  def createClockByTask(conn, %{"task_id" => task_id, "clock" => clock}) do
    newClock = %{time: clock["time"], task_id: task_id}
    with {:ok, %Clock{} = clock_db} <- TimeManager.create_clock(newClock) do
      conn
      |> put_status(:created)
        #|> put_resp_header("location", Routes.working_time_path(conn, :show, working_time_db))
      |> render("show.json", clock: clock_db)
    end
  end

  def finishClockByTask(conn, %{"task_id" => task_id}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    task = TimeManager.get_task!(task_id)
    clock = TimeManager.get_clock!(task.clock.id)

    clock_params = %{
      status: false
    }
    TimeManager.update_clock(clock, clock_params)

    # now we create the workingtime associated to it :)
    workingtime_params = %{
      start: clock.time,
      end: NaiveDateTime.local_now(),
      user_id: user.id
    }
    TimeManager.create_working_time(workingtime_params)

    send_resp(conn, :no_content, "")
  end


  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = TimeManager.get_clock!(id)

    with {:ok, %Clock{} = clock} <- TimeManager.update_clock(clock, clock_params) do
      render(conn, "show.json", clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = TimeManager.get_clock!(id)

    with {:ok, %Clock{}} <- TimeManager.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
