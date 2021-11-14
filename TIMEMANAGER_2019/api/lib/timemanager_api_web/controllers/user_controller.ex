defmodule TimemanagerApiWeb.UserController do
  use TimemanagerApiWeb, :controller

  alias TimemanagerApi.TimeManager
  alias TimemanagerApi.TimeManager.User

  action_fallback TimemanagerApiWeb.FallbackController

  def index(conn, params) do
    user = TimeManager.get_user!(conn.assigns.signed_user.id)

    email = Map.get(params, "email")
    username = Map.get(params, "username")

    if user.role == "ROLE_ADMIN" do
      users = TimeManager.get_user_by_email_username(email, username)
      render(conn, "index.json", users: users)
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end

  def get_list_users(conn, params) do
    user = TimeManager.get_user!(conn.assigns.signed_user.id)

    type = (Map.get(params, "username") != nil && "username") || (Map.get(params, "email") != nil && "email")
    value  = Map.get(params, "username") || Map.get(params, "email")
    role  = Map.get(params, "role")

    if user.role == "ROLE_ADMIN" || user.role == "ROLE_MANAGER" do
      users = TimeManager.get_users_with_search(type, value, role);
      render(conn, "index.json", users: users)
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end

  def me(conn, _params) do
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)

    render(conn, "show.json", user: user)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- TimeManager.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end



  def show(conn, %{"id" => id}) do
    loggedUser = TimeManager.get_user!(conn.assigns.signed_user.id)
    user = TimeManager.get_user!(id)

    if TimeManager.has_right(loggedUser,user) do
      render(conn, "show.json", user: user)
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    loggedUser = TimeManager.get_user!(conn.assigns.signed_user.id)
    user = TimeManager.get_user!(id)
    role = Map.get(user_params, "role");
    hasRole = if role do true else false end

    if loggedUser.role == "ROLE_ADMIN" || (user.id == loggedUser.id && hasRole == false ) do
      with {:ok, %User{} = user} <- TimeManager.update_user(user, user_params) do
        render(conn, "show.json", user: user)
      end
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end
  end

  def delete(conn, %{"id" => id}) do
    userToDelete = TimeManager.get_user!(id)
    user =  TimeManager.get_user!(conn.assigns.signed_user.id)
    if user.role == "ROLE_ADMIN" || user.id == userToDelete.id do
      with {:ok, %User{}} <- TimeManager.delete_user(userToDelete) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> put_status(:unauthorized)
      |>json(%{error: "unauthorized"})
    end


  end


end
