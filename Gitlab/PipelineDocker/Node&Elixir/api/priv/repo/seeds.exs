# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TimemanagerApi.Repo.insert!(%TimemanagerApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

import Faker, only: [localize: 1]
import Ecto
import Ecto.Query, warn: false
alias TimemanagerApi.Repo
alias TimemanagerApi.TimeManager.User
alias TimemanagerApi.TimeManager.WorkingTime
alias TimemanagerApi.TimeManager.Team

Repo.insert! %User{
  username: "Admin",
  email: "admin@admin.fr",
  role: "ROLE_ADMIN",
  password_hash: Comeonin.Bcrypt.hashpwsalt("test1234!")
}

Enum.each(0..20, fn(x) ->
  Repo.insert! %User{
    username: Faker.Person.first_name(),
    email: Faker.Person.first_name() <> "." <> Faker.Person.last_name() <> "@test.fr",
    role: "ROLE_USER",
    password_hash: Comeonin.Bcrypt.hashpwsalt("test")
  }
end)

Enum.each(0..5, fn(x) ->
  Repo.insert! %User{
    username: Faker.Person.first_name(),
    email: Faker.Person.first_name() <> "." <> Faker.Person.last_name() <> "@test.fr",
    role: "ROLE_MANAGER",
    password_hash: Comeonin.Bcrypt.hashpwsalt("test")
  }
end)

Enum.each(0..2, fn(x) ->
  Repo.insert! %User{
    username: Faker.Person.first_name(),
    email: Faker.Person.first_name() <> "." <> Faker.Person.last_name() <> "@test.fr",
    role: "ROLE_ADMIN",
    password_hash: Comeonin.Bcrypt.hashpwsalt("test")
  }
end)

Enum.each(1..28, fn(x) ->
  Enum.each(0..10, fn(y) ->
    startDate = Faker.DateTime.backward(2)
    endDate = Faker.DateTime.forward(2)

    naiveStart = DateTime.to_naive(startDate)
    naiveEnd = DateTime.to_naive(endDate)

    Repo.insert! %WorkingTime{
      start: NaiveDateTime.truncate(naiveStart, :second),
      end: NaiveDateTime.truncate(naiveEnd, :second),
      user_id: x
    }
  end)
end)

filter_manager   = [role: "ROLE_MANAGER"]
filter_user   =  [role: "ROLE_USER"]

query_manager =
  User
  |> where(^filter_manager)
query_user =
  User
  |> where(^filter_user)

manager = Repo.all(query_manager)
user = Repo.all(query_user)

for item <- manager do
  Repo.insert! %Team{
    owner_id: item.id,
    name: "Team " <> item.username,
  }
end
defmodule Number do
  def getRandom(number) do
    randomNumber = Enum.random(1..6);
    if number != randomNumber do
      randomNumber
    else
      getRandom(number)
    end
  end
end

for item_user <- user do
  random = 100;
  Enum.each(0..1, fn(x) ->
    random = Number.getRandom(random)
    team = Repo.get!(Team, random) |> Repo.preload(:members)
    team_changeset = Ecto.Changeset.change(team)

    team_with_members = Ecto.Changeset.put_assoc(team_changeset, :members, [item_user | team.members])
    Repo.update(team_with_members)
  end)
end


# Repo.insert! %WorkingTime{
#   start: NaiveDateTime.local_now(),
#   end: NaiveDateTime.local_now(),
#   user_id: 2
# }

# Repo.insert! %WorkingTime{
#   start: NaiveDateTime.local_now(),
#   end: NaiveDateTime.local_now(),
#   user_id: 2
# }

# post_changeset = Ecto.Changeset.change(post)
# post_with_tags = Ecto.Changeset.put_assoc(post_changeset, :tags, [clickbait_tag, misc_tag])
# post = Repo.update!(post_with_tags)

# user1 = Repo.get!(User, 2)
# user2 = Repo.get!(User, 5)

# team = %Team{
#   name: "test2",
#   owner_id: 2
# }
# team = Repo.insert!(team) |> Repo.preload(:members)
# team = Repo.get!(Team, 18) |> Repo.preload(:members)
# team_changeset = Ecto.Changeset.change(team)
# team_with_members = Ecto.Changeset.put_assoc(team_changeset, :members, [user1, user2])
# Repo.update!(team_with_members)

# Repo.insert! %Team{
#   name: "test",
#   owner: 1
# }
