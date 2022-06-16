defmodule TimemanagerApi.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :owner_id, references(:users, on_delete: :delete_all)
      add :workingtime_id, references(:workingtimes, on_delete: :delete_all)

      timestamps()
    end

  end
end
