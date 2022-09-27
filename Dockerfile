FROM node:lts-alpine

WORKDIR /app

COPY . .

# COPY dockerstarter.sh /app

# COPY ./apps/backend /app/apps/backend

# COPY ./libs /app/libs

# COPY .env /app

# COPY nx.json /app

# COPY package.json /app

# COPY tsconfig.base.json /app

# COPY workspace.json /app

# COPY yarn.lock /app

RUN yarn install --frozen-lockfile

ENV PORT=3333

EXPOSE ${PORT}

CMD [ "./dockerstarter.sh" ]