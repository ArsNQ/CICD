defmodule TimemanagerApi.TimeManager.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimemanagerApi.TimeManager.User
  alias TimemanagerApi.TimeManager.Clock

  schema "tasks" do
    field :name, :string

    belongs_to :owner, User
    has_one :clock, Clock

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :owner_id])
    |> validate_required([:name, :owner_id])
  end
end
