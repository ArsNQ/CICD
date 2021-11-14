defmodule TimemanagerApiWeb.TeamView do
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.TeamView
  alias TimemanagerApiWeb.UserView

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, TeamView, "team.json")}
  end

  def render("team.json", %{team: team}) do
    %{id: team.id,
      name: team.name,
      owner: render_one(team.owner, UserView, "team_member.json"),
      members: render_many(team.members, UserView, "team_member.json")
    }
  end

  def render("user_team.json", %{team: team}) do
    %{
      id: team.id,
      name: team.name,
      owner: render_one(team.owner, UserView, "team_member.json"),
      nbMembers: length(team.members)
    }
  end
end
