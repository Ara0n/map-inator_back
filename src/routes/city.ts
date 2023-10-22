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

	const data = ctx.request.body as {
		cityName: string
		lat: number
		lng: number
		hasTree: boolean
		hasCircle: boolean
	}

	const res = await neo4j_driver.executeQuery(
		"MERGE (c:City {name: $cityName, lat: $lat, lng: $lng, hasTree: $hasTree, hasCircle: $hasCircle})",
		{
			cityName: data.cityName,
			lat: data.lat,
			lng: data.lng,
			hasTree: data.hasTree,
			hasCircle: data.hasCircle,
		},
	)

	console.log(res)
	ctx.status = 204
})
