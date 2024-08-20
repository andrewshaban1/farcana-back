#!/bin/bash

# Creating an additional Postgres user for web connections from the server.
# This file is necessary to automate db and user creation after db container build

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER $POSTGRES_SERVER_USER WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';
	CREATE DATABASE $POSTGRES_DB_NAME;
	GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB_NAME TO $POSTGRES_SERVER_USER;
	ALTER DATABASE $POSTGRES_DB_NAME OWNER TO $POSTGRES_SERVER_USER;
EOSQL