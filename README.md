# map-inator

This repository contains the back-end for [map-inator](https://github.com/Ara0n/map-inator_front).

TODO: setup script for the cypher database, for now this is needed:

```sql
CREATE CONSTRAINT city_name FOR (c:City) REQUIRE c.name IS UNIQUE
```
