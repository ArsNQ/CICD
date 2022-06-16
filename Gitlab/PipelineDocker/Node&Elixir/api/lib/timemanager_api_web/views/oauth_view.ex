defmodule TimemanagerApiWeb.OauthView do
  use TimemanagerApiWeb, :view
  alias TimemanagerApiWeb.OauthView

  def render("show.json", %{auth_token: auth_token}) do
    %{data: render_one(auth_token, OauthView, "auth_token.json", as: :auth_token)}
  end

  def render("auth_token.json", %{auth_token: auth_token}) do
    %{token: auth_token.token}
  end
end
