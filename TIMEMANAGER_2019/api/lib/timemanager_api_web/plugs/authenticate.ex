defmodule TimemanagerApiWeb.Plugs.Authenticate do
  import Phoenix.Controller
  import Plug.Conn
  import Ecto.Query, warn: false
  alias TimemanagerApi.Repo

  def init(default), do: default

  def call(conn, _default) do
    case TimemanagerApi.Services.Authenticator.get_auth_token(conn) do
      {:ok, token} ->
        case TimemanagerApi.Repo.get_by(TimemanagerApi.AuthToken, %{token: token, revoked: false}) |> Repo.preload(:user) do
          nil -> unauthorized(conn)
          auth_token -> authorized(conn, auth_token.user)
        end
      _ -> unauthorized(conn)
    end
  end

  defp authorized(conn, user) do
    conn
    |> assign(:signed_in, true)
    |> assign(:signed_user, user)
  end

  defp unauthorized(conn) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Unauthorized"})
    |> halt
  end
end
