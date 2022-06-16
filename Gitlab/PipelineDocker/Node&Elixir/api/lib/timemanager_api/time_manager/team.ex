defmodule TimemanagerApi.TimeManager.Team do
  use Ecto.Schema
  import Ecto.Changeset

  alias TimemanagerApi.TimeManager.User

  schema "teams" do
    field :name, :string
    belongs_to :owner, User
    many_to_many(:members, User, join_through: "users_teams", on_replace: :delete)

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :owner_id])
    |> cast_assoc(:members, with: &User.changeset/2)
    |> validate_required([:name, :owner_id])
  end

end
