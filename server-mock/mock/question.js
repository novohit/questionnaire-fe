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
                    _id: Random.id(),
                    title: Random.ctitle(),
                    isStar: Random.boolean(),
                    isPublished: Random.boolean(),
                    answerCount: Random.natural(50, 100),
                    createdAt: Random.datetime(),
                    deletedAt: Random.datetime(),
                    components: [
                        {
                            userQuestionComponentId: Random.id(),
                            componentId: Random.id(),
                            title: Random.ctitle(),
                            type: 'title',
                            props: { text: '个人信息调研', level: 1, isCenter: false }
                        },
                        {
                            userQuestionComponentId: Random.id(),
                            componentId: Random.id(),
                            title: Random.ctitle(),
                            type: 'input',
                            props: { title: '你的姓名', placeholder: '请输入姓名' }
                        },
                        {
                            userQuestionComponentId: Random.id(),
                            componentId: Random.id(),
                            title: Random.ctitle(),
                            type: 'input',
                            props: { title: '你的手机号', placeholder: '请输入手机号 ' }
                        },
                    ]
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
        // 批量删除问卷
        url: '/api/question',
        method: 'delete',
        response() {
            return {
                code: 0,
                message: 'success'
            }
        }
    },
    {
        // 批量恢复问卷
        url: '/api/question/recover',
        method: 'put',
        response() {
            return {
                code: 0,
                message: 'success'
            }
        }
    },
]