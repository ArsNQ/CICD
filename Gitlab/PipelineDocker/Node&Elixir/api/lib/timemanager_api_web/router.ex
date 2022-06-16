defmodule TimemanagerApiWeb.Router do
  use TimemanagerApiWeb, :router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  pipeline :authenticate do
    plug TimemanagerApiWeb.Plugs.Authenticate
  end

  scope "/oauth", TimemanagerApiWeb do
    pipe_through :api
    post "/token", OauthController, :create
    delete "/logout", OauthController, :delete
    options "/token", OauthController, :options
  end

  scope "/api", TimemanagerApiWeb do
    pipe_through :api
    pipe_through :authenticate

    resources "/teams", TeamController,  except: [:show, :create,]
    options "/teams", TeamController, :options
    post "/teams", TeamController, :create_team
    options "/teams/:id/members", TeamController, :options
    post "/teams/:id/members", TeamController, :add_members
    options "/teams/:team_id/members/:member_id", TeamController, :options
    delete "/teams/:team_id/members/:member_id", TeamController, :delete_member
    get "/teams/:id", TeamController, :get_team_by_id
    options "/teams/:id", TeamController, :options
    get "/teamsSearch", TeamController, :get_teams_with_search
    options "/teamsSearch", TeamController, :options

    get "/managedTeams", TeamController,:get_team_by_manager
    options "/managedTeams", TeamController, :options
    resources "/users", UserController, only: [:index, :create]

    options "/usersSearch", UserController, :options
    get "/usersSearch", UserController, :get_list_users
  end

  scope "/api", TimemanagerApiWeb do
    pipe_through :api
    pipe_through :authenticate

    get       "/users/me", UserController, :me
    resources "/users", UserController, only: [:show, :update, :delete]
    options   "/users", UserController, :options
    options   "/users/:user_id", UserController, :options

    resources "/workingtimes", WorkingTimeController, only: [:delete, :update]
    get       "/workingtimes/:user_id/:workingtime_id", WorkingTimeController, :getOneByUser
    get       "/workingtimes/:user_id", WorkingTimeController, :getAllByUser
    post      "/workingtimes/:user_id", WorkingTimeController, :createWorkingTimeUser
    options   "/workingtimes/:user_id", WorkingTimeController, :options

    post      "/clocks/:task_id", ClockController, :createClockByTask
    post      "/clocks/:task_id/done", ClockController, :finishClockByTask
    options   "/clocks/:task_id", ClockController, :options
    options   "/clocks/:task_id/done", ClockController, :options

    resources "/tasks", TaskController, only: [:delete]
    get       "/tasks/:user_id", TaskController, :getAllByUser
    post       "/tasks/:user_id", TaskController, :createByUser
    options   "/tasks", TaskController, :options
    options   "/tasks/:user_id", TaskController, :options
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TimemanagerApiWeb.Telemetry
    end
  end
end
