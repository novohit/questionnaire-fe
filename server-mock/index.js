/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Koa = require('koa')
const Router = require('koa-router')
const { bodyParser } = require("@koa/bodyparser");
const mockList = require('./mock/index')

const app = new Koa()
const router = new Router()

async function getRes(fn, ctx) {
    return new Promise(resolve => {
        setTimeout(() => {
            const res = fn(ctx)
            resolve(res)
        }, 1000) // ms
    })
}

// 注册 mock 路由
mockList.forEach(item => {
    const { url, method, response } = item
    router[method](url, async ctx => {
        // const res = response()
        const res = await getRes(response, ctx) // 模拟网络时延
        ctx.body = res // 输入结果
    })
})

app.use(bodyParser()); // request body 解析
app.use(router.routes())
app.listen(8080) // port 端口
