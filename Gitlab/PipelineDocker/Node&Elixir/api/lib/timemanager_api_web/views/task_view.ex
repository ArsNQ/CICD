defmodule TimemanagerApiWeb.TaskView do
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.TaskView
  alias TimemanagerApiWeb.ClockView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      name: task.name,
      clock: render_one(task.clock, ClockView, "clock.json")
    }
  end
end
