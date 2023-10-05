import KoaRouter from "@koa/router"
// import { auth, driver } from "neo4j-driver"

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

router.put("/:name", ctx => {
	// modify an existing city
	console.log(ctx.request.body)
	ctx.status = 204
})
