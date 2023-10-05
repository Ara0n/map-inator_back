import Koa from "koa"
import koaBodyparser from "koa-bodyparser"

const server = new Koa()

server.use(
	koaBodyparser({
		enableTypes: ["json"],
		onerror: (err, ctx) => {
			ctx.status = 400
			ctx.body = { err: "invalid_json" }
		},
	}),
)

const { default: city } = await import("./routes/city.ts")

server.use(city.allowedMethods())
server.use(city.middleware())
server.listen(3000)
