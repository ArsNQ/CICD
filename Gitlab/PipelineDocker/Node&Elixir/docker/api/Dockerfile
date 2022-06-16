##BUILD
FROM elixir:latest

RUN mix local.hex --force && \
    mix archive.install hex phx_new 1.5.3 --force && \
    mix local.rebar --force

ENV APP_HOME /api
COPY ./api /api
WORKDIR /api
RUN mix deps.get --only prod
ENV MIX_ENV=prod
ENV DATABASE_URL=ecto://postgres:postgres@db/timemanager_prod
ENV SECRET_KEY_BASE=vRHJkGAY796sFXJYwUqrWIYuLlvsEwLo
RUN mix compile

## LAUNCH
CMD ["mix", "phx.server"]
