defmodule TimemanagerApi.Repo.Migrations.CreateTeams do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :name, :string
      add :owner_id, references(:users, on_delete: :delete_all)


      timestamps()
    end

    create index(:teams, [:owner_id])
  end
end
