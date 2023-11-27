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
                }
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
        response() {
            return {
                code: 0,
                data: {
                    list: getQuestionList(),
                    total: 100
                },
                message: 'success'
            }
        }
    },
]