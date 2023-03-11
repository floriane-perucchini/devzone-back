. ../.env

psql -d ${PGDATABASE} -U ${PGUSER} -f prisma/data/seeding.sql
