defmodule TimemanagerApi.Repo do
  use Ecto.Repo,
    otp_app: :timemanager_api,
    adapter: Ecto.Adapters.Postgres
end
