defmodule TimemanagerApi.TimeManager.WorkingTime do
  use Timex
  use Ecto.Schema
  import Ecto.Changeset
  alias TimemanagerApi.TimeManager.User
  alias TimemanagerApi.TimeManager.Task

  schema "workingtimes" do
    field :end, :naive_datetime
    field :start, :naive_datetime

    belongs_to :user, User
    belongs_to :task, Task

    timestamps()
  end

  @doc false
  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:start, :end, :user_id])
    |> validate_required([:start, :end, :user_id])
    |> validate_date(:start)
    |> validate_date(:end)
  end

  @spec validate_date(Ecto.Changeset.t(), any) :: Ecto.Changeset.t()
  def validate_date(changeset, field) when is_atom(field) do
      value = get_field(changeset, field)

      case Timex.format(value, "{YYYY}-{0M}-{0D} {h24}:{m}:{s}") do
        {:ok, _result} ->
          changeset
        {:error, _result} ->
          add_error(changeset, field, "invalid date")
      end
  end
end
