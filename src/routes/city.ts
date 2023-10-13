import KoaRouter from "@koa/router"
import { neo4j_driver } from "../neo4j.ts"

const router = new KoaRouter({ prefix: "/api/city" })
export default router

router.get("/", () => {
	// list all the city names
})

router.get("/:name", ctx => {
	ctx.body = {
		// recuperate city info from neo4j
	}
})

router.post("/:name", () => {
	// add the city info in neo4j
})

router.put("/:name", async ctx => {
	// modify an existing city
	console.log(ctx.request.body)
	console.log(await neo4j_driver.getServerInfo())

	const res = await neo4j_driver.executeQuery(
		"MERGE (c:City {name: $body.cityName, lat: $body.lat, lng: $body.lng, hasTree: $body.hasTree, hasCircle: $body.hasCircle})",
		{ body: ctx.request.body },
	)

	console.log(res)
	ctx.status = 204
})
