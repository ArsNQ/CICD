defmodule TimemanagerApiWeb.TeamController do
  use TimemanagerApiWeb, :controller

  alias TimemanagerApi.TimeManager
  alias TimemanagerApi.Repo
  alias TimemanagerApi.TimeManager.Team

  action_fallback TimemanagerApiWeb.FallbackController

  def index(conn, _params) do
    teams = TimeManager.list_teams()
    render(conn, "index.json", teams: teams)
  end

  def create(conn, %{"team" => team_params}) do
    with {:ok, %Team{} = team} <- TimeManager.create_team(team_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.team_path(conn, :show, team))
      |> render("show.json", team: team)
    end
  end

  def get_team_by_id(conn, %{"id" => id}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    team = TimeManager.get_team!(id)
    isMember = Enum.find_value(team.members, fn (x) -> user.id == x.id  end)
    if user.role == "ROLE_ADMIN" || team.owner.id == user.id  || isMember  do
      render(conn, "show.json", team: team)
      else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end

  end

  def get_team_by_manager(conn, _params) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" do
      teams = TimeManager.get_managed_teams(user)
      render(conn, "index.json", teams: teams)
      else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end

  end

  def add_members(conn, %{"id" => id, "users_id" => users_id}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    team = TimeManager.get_team!(id)

    if user.role == "ROLE_ADMIN" || team.owner.id == user.id   do
      with {:ok, _} <- TimeManager.add_team_member(id, users_id) do
        newTeam = TimeManager.get_team!(id)
        conn
        |> put_status(:ok)
        |> render("show.json", team: newTeam)
      end
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end

  def create_team(conn, %{"owner_id" => owner_id, "name" => name , "members" => members}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)

    if user.role == "ROLE_ADMIN" || (user.role == "ROLE_MANAGER" && owner_id == user.id)   do
      with {:ok, %Team{} = createdTeam} <- TimeManager.create_team(%{"owner_id" => owner_id, "name" => name}) do
        TimeManager.add_team_member(createdTeam.id, members)
        IO.inspect("Success")
        teamPreloaded = Repo.get!(Team, createdTeam.id)
                        |> Repo.preload(:owner)
                        |> Repo.preload(:members)
        conn
        |> put_status(:created)
        |> render("team.json", team: teamPreloaded)
      end
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end


  def show(conn, %{"id" => id}) do
    team = TimeManager.get_team!(id)
    render(conn, "show.json", team: team)
  end

  def update(conn, %{"id" => id, "team" => team_params}) do
    team = TimeManager.get_team!(id)

    with {:ok, %Team{} = team} <- TimeManager.update_team(team, team_params) do
      render(conn, "show.json", team: team)
    end
  end

  def delete(conn, %{"id" => id}) do
    team = TimeManager.get_team!(id)

    with {:ok, %Team{}} <- TimeManager.delete_team(team) do
      send_resp(conn, :no_content, "")
    end
  end

  def delete_member(conn, %{"team_id" => team_id, "member_id" => member_id}) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    team = TimeManager.get_team!(team_id)
    if user.role == "ROLE_ADMIN" || team.owner.id == user.id   do
      with {:ok, _} <- TimeManager.delete_team_member(team_id, member_id) do
        team = TimeManager.get_team!(team_id)
        conn
        |> put_status(:ok)
        |> render("show.json", team: team)
        end
      else
        conn
        |> put_status(:unauthorized)
        |>json(%{error: "unauthorized"})
    end
  end

  def get_teams_with_search(conn, params) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" do
      teams = TimeManager.get_teams_with_search(params);
      render(conn, "index.json", teams: teams)
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end


end
