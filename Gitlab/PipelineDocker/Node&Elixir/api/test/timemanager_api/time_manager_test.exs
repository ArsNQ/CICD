defmodule TimemanagerApi.TimeManagerTest do
  use TimemanagerApi.DataCase

  alias TimemanagerApi.TimeManager

  describe "workingtimes" do
    alias TimemanagerApi.TimeManager.WorkingTime

    @valid_attrs %{end: ~N[2010-04-17 14:00:00], start: ~N[2010-04-17 14:00:00]}
    @update_attrs %{end: ~N[2011-05-18 15:01:01], start: ~N[2011-05-18 15:01:01]}
    @invalid_attrs %{end: nil, start: nil}

    def working_time_fixture(attrs \\ %{}) do
      {:ok, working_time} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TimeManager.create_working_time()

      working_time
    end

    test "list_workingtimes/0 returns all workingtimes" do
      working_time = working_time_fixture()
      assert TimeManager.list_workingtimes() == [working_time]
    end

    test "get_working_time!/1 returns the working_time with given id" do
      working_time = working_time_fixture()
      assert TimeManager.get_working_time!(working_time.id) == working_time
    end

    test "create_working_time/1 with valid data creates a working_time" do
      assert {:ok, %WorkingTime{} = working_time} = TimeManager.create_working_time(@valid_attrs)
      assert working_time.end == ~N[2010-04-17 14:00:00]
      assert working_time.start == ~N[2010-04-17 14:00:00]
    end

    test "create_working_time/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_working_time(@invalid_attrs)
    end

    test "update_working_time/2 with valid data updates the working_time" do
      working_time = working_time_fixture()
      assert {:ok, %WorkingTime{} = working_time} = TimeManager.update_working_time(working_time, @update_attrs)
      assert working_time.end == ~N[2011-05-18 15:01:01]
      assert working_time.start == ~N[2011-05-18 15:01:01]
    end

    test "update_working_time/2 with invalid data returns error changeset" do
      working_time = working_time_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_working_time(working_time, @invalid_attrs)
      assert working_time == TimeManager.get_working_time!(working_time.id)
    end

    test "delete_working_time/1 deletes the working_time" do
      working_time = working_time_fixture()
      assert {:ok, %WorkingTime{}} = TimeManager.delete_working_time(working_time)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_working_time!(working_time.id) end
    end

    test "change_working_time/1 returns a working_time changeset" do
      working_time = working_time_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_working_time(working_time)
    end
  end

  describe "clocks" do
    alias TimemanagerApi.TimeManager.Clock

    @valid_attrs %{status: true, time: ~N[2010-04-17 14:00:00]}
    @update_attrs %{status: false, time: ~N[2011-05-18 15:01:01]}
    @invalid_attrs %{status: nil, time: nil}

    def clock_fixture(attrs \\ %{}) do
      {:ok, clock} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TimeManager.create_clock()

      clock
    end

    test "list_clocks/0 returns all clocks" do
      clock = clock_fixture()
      assert TimeManager.list_clocks() == [clock]
    end

    test "get_clock!/1 returns the clock with given id" do
      clock = clock_fixture()
      assert TimeManager.get_clock!(clock.id) == clock
    end

    test "create_clock/1 with valid data creates a clock" do
      assert {:ok, %Clock{} = clock} = TimeManager.create_clock(@valid_attrs)
      assert clock.status == true
      assert clock.time == ~N[2010-04-17 14:00:00]
    end

    test "create_clock/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_clock(@invalid_attrs)
    end

    test "update_clock/2 with valid data updates the clock" do
      clock = clock_fixture()
      assert {:ok, %Clock{} = clock} = TimeManager.update_clock(clock, @update_attrs)
      assert clock.status == false
      assert clock.time == ~N[2011-05-18 15:01:01]
    end

    test "update_clock/2 with invalid data returns error changeset" do
      clock = clock_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_clock(clock, @invalid_attrs)
      assert clock == TimeManager.get_clock!(clock.id)
    end

    test "delete_clock/1 deletes the clock" do
      clock = clock_fixture()
      assert {:ok, %Clock{}} = TimeManager.delete_clock(clock)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_clock!(clock.id) end
    end

    test "change_clock/1 returns a clock changeset" do
      clock = clock_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_clock(clock)
    end
  end

  describe "users" do
    alias TimemanagerApi.TimeManager.User

    @valid_attrs %{email: "some email", username: "some username"}
    @update_attrs %{email: "some updated email", username: "some updated username"}
    @invalid_attrs %{email: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TimeManager.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert TimeManager.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert TimeManager.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = TimeManager.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = TimeManager.update_user(user, @update_attrs)
      assert user.email == "some updated email"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_user(user, @invalid_attrs)
      assert user == TimeManager.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = TimeManager.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_user(user)
    end
  end

  describe "teams" do
    alias TimemanagerApi.TimeManager.Team

    @valid_attrs %{name: "some name", users: "some users"}
    @update_attrs %{name: "some updated name", users: "some updated users"}
    @invalid_attrs %{name: nil, users: nil}

    def team_fixture(attrs \\ %{}) do
      {:ok, team} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TimeManager.create_team()

      team
    end

    test "list_teams/0 returns all teams" do
      team = team_fixture()
      assert TimeManager.list_teams() == [team]
    end

    test "get_team!/1 returns the team with given id" do
      team = team_fixture()
      assert TimeManager.get_team!(team.id) == team
    end

    test "create_team/1 with valid data creates a team" do
      assert {:ok, %Team{} = team} = TimeManager.create_team(@valid_attrs)
      assert team.name == "some name"
      assert team.users == "some users"
    end

    test "create_team/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_team(@invalid_attrs)
    end

    test "update_team/2 with valid data updates the team" do
      team = team_fixture()
      assert {:ok, %Team{} = team} = TimeManager.update_team(team, @update_attrs)
      assert team.name == "some updated name"
      assert team.users == "some updated users"
    end

    test "update_team/2 with invalid data returns error changeset" do
      team = team_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_team(team, @invalid_attrs)
      assert team == TimeManager.get_team!(team.id)
    end

    test "delete_team/1 deletes the team" do
      team = team_fixture()
      assert {:ok, %Team{}} = TimeManager.delete_team(team)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_team!(team.id) end
    end

    test "change_team/1 returns a team changeset" do
      team = team_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_team(team)
    end
  end

  describe "tasks" do
    alias TimemanagerApi.TimeManager.Task

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TimeManager.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert TimeManager.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert TimeManager.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = TimeManager.create_task(@valid_attrs)
      assert task.name == "some name"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TimeManager.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = TimeManager.update_task(task, @update_attrs)
      assert task.name == "some updated name"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = TimeManager.update_task(task, @invalid_attrs)
      assert task == TimeManager.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = TimeManager.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> TimeManager.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = TimeManager.change_task(task)
    end
  end
end
