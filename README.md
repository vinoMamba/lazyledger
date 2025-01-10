## docker 
```
docker run -d \
	--name lazyledger-postgres \
	-e POSTGRES_PASSWORD=123456 \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v $(pwd)/postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
	postgres

```
