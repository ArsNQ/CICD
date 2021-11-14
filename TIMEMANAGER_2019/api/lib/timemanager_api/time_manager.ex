defmodule TimemanagerApi.TimeManager do
  @moduledoc """
  The TimeManager context.
  """

  import Ecto.Query, warn: false
  alias TimemanagerApi.Repo

  alias TimemanagerApi.TimeManager.WorkingTime
  alias TimemanagerApi.TimeManager.Clock
  alias TimemanagerApi.TimeManager.Team

  @doc """
  Returns the list of workingtimes.

  ## Examples

      iex> list_workingtimes()
      [%WorkingTime{}, ...]

  """
  def list_workingtimes do
    Repo.all(WorkingTime)
  end

  def list_workingtimes_by_user(params) do
    user_id    = Map.get(params, "user_id")
    start_date = Map.get(params, "start")
    end_date   = Map.get(params, "end")

    filter_user   = if user_id do dynamic([wt], wt.user_id == ^user_id) else true end
    filter_start  = if start_date do dynamic([wt], wt.start >= ^start_date)else true end
    filter_end    = if end_date do dynamic([wt], wt.end <= ^end_date) else true end

    query =
      WorkingTime
      |> where(^filter_user)
      |> where(^filter_start)
      |> where(^filter_end)

    Repo.all(query)
  end

  def get_workingtime_by_id_by_user(params) do
    user_id    = Map.get(params, "user_id")
    workingtime_id    = Map.get(params, "workingtime_id")

    filter_user   = if user_id do dynamic([wt], wt.user_id == ^user_id) else true end
    filter_workingtime   = if workingtime_id do dynamic([wt], wt.id == ^workingtime_id) else true end

    query =
      WorkingTime
      |> where(^filter_user)
      |> where(^filter_workingtime)

    Repo.one(query)
  end

  def list_clock_by_user(params) do
    user_id    = Map.get(params, "user_id")

    filter_user   = if user_id do dynamic([c], c.user_id == ^user_id) else true end

    query =
      Clock
      |> where(^filter_user)

    Repo.all(query)
  end

  @doc """
  Gets a single working_time.

  Raises `Ecto.NoResultsError` if the Working time does not exist.

  ## Examples

      iex> get_working_time!(123)
      %WorkingTime{}

      iex> get_working_time!(456)
      ** (Ecto.NoResultsError)

  """
  def get_working_time!(id), do: Repo.get!(WorkingTime, id)

  @doc """
  Creates a working_time.

  ## Examples

      iex> create_working_time(%{field: value})
      {:ok, %WorkingTime{}}

      iex> create_working_time(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_working_time(attrs \\ %{}) do
    %WorkingTime{}
    |> WorkingTime.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a working_time.

  ## Examples

      iex> update_working_time(working_time, %{field: new_value})
      {:ok, %WorkingTime{}}

      iex> update_working_time(working_time, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_working_time(%WorkingTime{} = working_time, attrs) do
    working_time
    |> WorkingTime.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a working_time.

  ## Examples

      iex> delete_working_time(working_time)
      {:ok, %WorkingTime{}}

      iex> delete_working_time(working_time)
      {:error, %Ecto.Changeset{}}

  """
  def delete_working_time(%WorkingTime{} = working_time) do
    Repo.delete(working_time)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking working_time changes.

  ## Examples

      iex> change_working_time(working_time)
      %Ecto.Changeset{data: %WorkingTime{}}

  """
  def change_working_time(%WorkingTime{} = working_time, attrs \\ %{}) do
    WorkingTime.changeset(working_time, attrs)
  end

  alias TimemanagerApi.TimeManager.Clock

  @doc """
  Returns the list of clocks.

  ## Examples

      iex> list_clocks()
      [%Clock{}, ...]

  """
  def list_clocks do
    Repo.all(Clock)
  end

  @doc """
  Gets a single clock.

  Raises `Ecto.NoResultsError` if the Clock does not exist.

  ## Examples

      iex> get_clock!(123)
      %Clock{}

      iex> get_clock!(456)
      ** (Ecto.NoResultsError)

  """
  def get_clock!(id), do: Repo.get!(Clock, id)

  @doc """
  Creates a clock.

  ## Examples

      iex> create_clock(%{field: value})
      {:ok, %Clock{}}

      iex> create_clock(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_clock(attrs \\ %{}) do
    %Clock{}
    |> Clock.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a clock.

  ## Examples

      iex> update_clock(clock, %{field: new_value})
      {:ok, %Clock{}}

      iex> update_clock(clock, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_clock(%Clock{} = clock, attrs) do
    clock
    |> Clock.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a clock.

  ## Examples

      iex> delete_clock(clock)
      {:ok, %Clock{}}

      iex> delete_clock(clock)
      {:error, %Ecto.Changeset{}}

  """
  def delete_clock(%Clock{} = clock) do
    Repo.delete(clock)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking clock changes.

  ## Examples

      iex> change_clock(clock)
      %Ecto.Changeset{data: %Clock{}}

  """
  def change_clock(%Clock{} = clock, attrs \\ %{}) do
    Clock.changeset(clock, attrs)
  end

  alias TimemanagerApi.TimeManager.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user by email & username.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user_by_email_username("test@test.fr", "username")
      %User{}

      iex> get_user_by_email_username("test@test.fr", "username")
      ** (Ecto.NoResultsError)

  """
  def get_user_by_email_username(email, username) do
      filter_email =
        if email do
          dynamic([u], u.email == ^email)
        else
          true
        end

      filter_username =
        if username do
          dynamic([u], u.username == ^username)
        else
          true
        end

    query =
      User
      |> where(^filter_email)
      |> where(^filter_username)
      |> join(:left, [u], _ in assoc(u, :teams))
      |> join(:left, [_, owner], _ in assoc(owner, :owner))
      |> join(:left, [_, teams], _ in assoc(teams, :members))
      |> preload([_, t, o, m], [teams: {t, owner: o, members: m}])

    Repo.all(query)
  end

  def get_users_with_search(type, value, role) do
      filter = dynamic([u], like(fragment("lower(?)",field(u, ^String.to_atom(type))), ^"#{String.downcase(value)}%"))
      filter_role = if role do [role: role] else true  end

    query =
      User
      |> where(^filter)
      |> where(^filter_role)
      |> join(:left, [u], _ in assoc(u, :teams))
      |> join(:left, [_, owner], _ in assoc(owner, :owner))
      |> join(:left, [_, teams], _ in assoc(teams, :members))
      |> preload([_, t, o, m], [teams: {t, owner: o, members: m}])

    Repo.all(query)
  end


  def get_teams_with_search(params) do
    name = Map.get(params, "name")

    filter_name   = if name do dynamic([u], like(fragment("lower(?)",u.name), ^"#{String.downcase(name)}%")) else true end

    teams_query =
      Team
      |> where(^filter_name)

    Repo.all(teams_query)
    |> Repo.preload(:members)
    |> Repo.preload(:owner)

  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id) do
      User
      |> where([user], user.id == ^id)
      |> join(:left, [u], _ in assoc(u, :teams))
      |> join(:left, [_, owner], _ in assoc(owner, :owner))
      |> join(:left, [_, teams], _ in assoc(teams, :members))
      |> preload([_, t, o, m], [teams: {t, owner: o, members: m}])
      |> Repo.one
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> Repo.preload(:teams)
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.updateChangeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  alias TimemanagerApi.TimeManager.Team

  @doc """
  Returns the list of teams.

  ## Examples

      iex> list_teams()
      [%Team{}, ...]

  """
  def list_teams do
    Repo.all(Team)
    |> Repo.preload(:members)
    |> Repo.preload(:owner)
  end

  @doc """
  Gets a single team.

  Raises `Ecto.NoResultsError` if the Team does not exist.

  ## Examples

      iex> get_team!(123)
      %Team{}

      iex> get_team!(456)
      ** (Ecto.NoResultsError)

  """
  def get_team!(id) do
    Repo.get!(Team, id)
    |> Repo.preload(:members)
    |> Repo.preload(:owner)
  end


  @doc """
  Creates a team.

  ## Examples

      iex> create_team(%{field: value})
      {:ok, %Team{}}

      iex> create_team(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_team(attrs \\ %{}) do
    %Team{}
    |> Team.changeset(attrs)
    |> Repo.insert()
  end

  def add_team_member(id, users_id) do
    users = Enum.map(users_id, fn user_id ->
      get_user!(user_id)
    end)
    team = Repo.get!(Team, id) |> Repo.preload(:members)
    team_changeset = Ecto.Changeset.change(team)
    team_with_members = Ecto.Changeset.put_assoc(team_changeset, :members, Enum.concat(users, team.members))
    Repo.update(team_with_members)
  end

  def delete_team_member(id, user_id) do
    team = Repo.get!(Team, id) |> Repo.preload(:members)
    newMembers = Enum.filter(team.members, fn(x) ->
      {user_id_int, ""} = Integer.parse(user_id)
      x.id != user_id_int
    end)

    team_changeset = Ecto.Changeset.change(team)
    team_with_members = Ecto.Changeset.put_assoc(team_changeset, :members, newMembers)
    Repo.update(team_with_members)
  end


  @doc """
  Updates a team.

  ## Examples

      iex> update_team(team, %{field: new_value})
      {:ok, %Team{}}

      iex> update_team(team, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_team(%Team{} = team, attrs) do
    team
    |> Team.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a team.

  ## Examples

      iex> delete_team(team)
      {:ok, %Team{}}

      iex> delete_team(team)
      {:error, %Ecto.Changeset{}}

  """
  def delete_team(%Team{} = team) do
    Repo.delete(team)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking team changes.

  ## Examples

      iex> change_team(team)
      %Ecto.Changeset{data: %Team{}}

  """
  def change_team(%Team{} = team, attrs \\ %{}) do
    Team.changeset(team, attrs)
  end

  def get_managed_teams(user) do
    filter_manager   = if user.id do dynamic([t], t.owner_id == ^user.id) else true end
    manager_query =
      Team
      |> where(^filter_manager)
    Repo.all(manager_query)
    |> Repo.preload(:members)
    |> Repo.preload(:owner)
  end

  def is_manager_allowed(manager,user) do
    managerTeams = get_managed_teams(manager)
    Enum.any?(managerTeams, fn(team) ->
      Enum.any?(team.members, fn(member) ->
        if member.id == user.id do
          true
        end
      end)
    end)
  end

  def has_right(loggedUser, user) do
    if (loggedUser.role == "ROLE_MANAGER" && is_manager_allowed(loggedUser, user)) || loggedUser.role == "ROLE_ADMIN" do
        true
      else
        false
    end
  end


  alias TimemanagerApi.TimeManager.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
  end

  def list_tasks_by_user(user_id) do
    filter_user = if user_id do dynamic([t], t.owner_id == ^user_id) else true end

    query =
      Task
      |> where(^filter_user)
      |> preload(:clock)

    Repo.all(query)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
    Repo.get!(Task, id)
    |> Repo.preload(:clock)
  end

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{data: %Task{}}

  """
  def change_task(%Task{} = task, attrs \\ %{}) do
    Task.changeset(task, attrs)
  end
end
