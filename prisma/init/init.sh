dropdb devzone

dropuser admin_devzone

psql -f ./prisma/init/init_db.sql -d postgres
