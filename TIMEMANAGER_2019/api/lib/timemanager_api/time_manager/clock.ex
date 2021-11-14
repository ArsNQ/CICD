defmodule TimemanagerApi.TimeManager.Clock do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimemanagerApi.TimeManager.User
  alias TimemanagerApi.TimeManager.Task

  schema "clocks" do
    field :status, :boolean, default: true
    field :time, :naive_datetime

    belongs_to :user, User
    belongs_to :task, Task

    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :task_id])
    |> validate_required([:time, :status, :task_id])
  end
end
