defmodule TimemanagerApiWeb.WorkingTimeView do
  use Timex
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.WorkingTimeView

  def render("index.json", %{workingtimes: workingtimes}) do
    %{data: render_many(workingtimes, WorkingTimeView, "working_time.json")}
  end

  def render("show.json", %{working_time: working_time}) do
    %{data: render_one(working_time, WorkingTimeView, "working_time.json")}
  end

  def render("working_time.json", %{working_time: working_time}) do
    %{id: working_time.id,
      start: working_time.start |> Timex.format!("{YYYY}-{0M}-{0D} {h24}:{m}:{s}"),
      end: working_time.end |> Timex.format!("{YYYY}-{0M}-{0D} {h24}:{m}:{s}"),
      user_id: working_time.user_id
    }
  end
end
