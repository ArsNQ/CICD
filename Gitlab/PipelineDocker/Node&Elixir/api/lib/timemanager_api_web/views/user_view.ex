defmodule TimemanagerApiWeb.UserView do
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.UserView
  alias TimemanagerApiWeb.TeamView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      teams: render_many(user.teams, TeamView, "user_team.json")
    }
  end

  def render("team_member.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end
end
