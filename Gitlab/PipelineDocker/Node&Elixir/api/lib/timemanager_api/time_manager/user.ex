defmodule TimemanagerApi.TimeManager.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias TimemanagerApi.AuthToken
  alias TimemanagerApi.TimeManager.Team
  alias TimemanagerApi.TimeManager.WorkingTime

  schema "users" do
    field :email, :string
    field :username, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :role, :string

    has_many :auth_tokens, AuthToken, on_delete: :delete_all
    has_many :workingtimes, WorkingTime, on_delete: :delete_all
    many_to_many(:teams, Team, join_through: "users_teams", on_delete: :delete_all)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password, :role])
    |> cast_assoc(:teams, with: &Team.changeset/2)
    |> validate_required([:username, :email, :password])
    |> validate_format(:email, ~r/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/)
    |> unique_constraint(:email, downcase: true)
    |> put_password_hash()
  end

  def updateChangeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password, :role])
    |> cast_assoc(:teams, with: &Team.changeset/2)
    |> validate_format(:email, ~r/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/)
    |> unique_constraint(:email, downcase: true)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
        changeset
    end
  end
end
