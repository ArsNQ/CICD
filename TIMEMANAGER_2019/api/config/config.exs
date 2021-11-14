# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :timemanager_api,
  ecto_repos: [TimemanagerApi.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :timemanager_api, TimemanagerApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "d7VSbP8uo6/SHhPyILH6Vh4vmwXSmn6UhSTDLsvUee1MalLtpc30yAPwWUetBlSu",
  render_errors: [view: TimemanagerApiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: TimemanagerApi.PubSub,
  live_view: [signing_salt: "7ig1nFtA"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
