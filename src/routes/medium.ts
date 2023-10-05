import KoaRouter from "@koa/router"

const router = new KoaRouter({ prefix: "/api/medium" })
export default router

router.get("/", () => {
	// list all the mediums
})

router.get("/:start/:end", ctx => {
	ctx.body = {
		// returns the shortest path composed of any medium
	}
})

router.get("/:start/:end/:medium", () => {
	// returns the shortest path composed of the medium
	// the medium is only of an enum
})

router.put("/:start/:end/:medium", () => {
	// modify an existing medium
})

router.post("/:start/:end/:medium", () => {
	// add a new medium
})
