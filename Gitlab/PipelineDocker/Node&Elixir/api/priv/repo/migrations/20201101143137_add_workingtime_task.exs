defmodule TimemanagerApi.Repo.Migrations.AddWorkingtimeTask do
  use Ecto.Migration

  def change do
    alter table(:workingtimes) do
      add :task_id, references(:tasks, on_delete: :delete_all )
    end
  end
end
