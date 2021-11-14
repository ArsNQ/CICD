defmodule TimemanagerApiWeb.OauthController do
  use TimemanagerApiWeb, :controller
  alias TimemanagerApi.Services.Authenticator

  def create(conn, %{"email" => email, "password" => password}) do
    case Authenticator.sign_in(email, password) do
      {:ok, auth_token} ->
        conn
        |> put_status(:ok)
        |> render("show.json", auth_token: auth_token)
      {:error, reason} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: reason})
    end
  end

  def delete(conn, _) do
    case Authenticator.sign_out(conn) do
      {:error, reason} -> conn |> send_resp(400, reason)
      {:ok, _} -> conn |> send_resp(204, "")
    end
  end
end
