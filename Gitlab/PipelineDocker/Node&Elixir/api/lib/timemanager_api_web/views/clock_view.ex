defmodule TimemanagerApiWeb.ClockView do
  use Timex
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.ClockView

  def render("index.json", %{clocks: clocks}) do
    %{data: render_many(clocks, ClockView, "clock.json")}
  end

  def render("show.json", %{clock: clock}) do
    %{data: render_one(clock, ClockView, "clock.json")}
  end

  def render("clock.json", %{clock: clock}) do
    %{id: clock.id,
      time: clock.time |> Timex.format!("{YYYY}-{0M}-{0D} {h24}:{m}:{s}"),
      status: clock.status}
  end
end
