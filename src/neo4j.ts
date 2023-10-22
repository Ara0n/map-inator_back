import { auth, driver } from "neo4j-driver"

if (!process.env.NEO4J_URI) throw new Error("neo4j: please add a URI")
if (!process.env.NEO4J_LOGIN) throw new Error("neo4j: please add a login")
if (!process.env.NEO4J_PASSWORD) throw new Error("neo4j: please add a password")

export const neo4j_driver = driver(
	process.env.NEO4J_URI,
	auth.basic(process.env.NEO4J_LOGIN, process.env.NEO4J_PASSWORD),
)

console.log(await neo4j_driver.getServerInfo())
