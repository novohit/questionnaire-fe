/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')

const getQuestionList = require('./data/getQuestionList')
const Random = Mock.Random

module.exports = [
    {
        // 获取单个问卷信息
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                code: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                },
                message: 'success'
            }
        }
    },
    {
        // 创建问卷
        url: '/api/question',
        method: 'post',
        response() {
            return {
                code: 0,
                data: Random.id(),
                message: 'success'
            }
        }
    },
    {
        // 问卷列表
        url: '/api/question',
        method: 'get',
        response(ctx) {
            const { url = '', query = {} } = ctx
            const isDeleted = url.indexOf('isDeleted=true') >= 0
            const isStar = url.indexOf('isStar=true') >= 0
            const size = parseInt(query.size) || 10
            return {
                code: 0,
                data: {
                    list: getQuestionList({ len: size, isDeleted, isStar }),
                    total: 100
                },
                message: 'success'
            }
        }
    },
    {
        // 更新问卷
        url: '/api/question/:id',
        method: 'put',
        response() {
            return {
                code: 0,
                message: 'success'
            }
        }
    },
    {
        // 复制问卷
        url: '/api/question/copy/:id',
        method: 'post',
        response() {
            return {
                code: 0,
                data: Random.id(),
                message: 'success'
            }
        }
    },
    {
        // 删除问卷
        url: '/api/question/:id',
        method: 'delete',
        response() {
            return {
                code: 0,
                message: 'success'
            }
        }
    },
]