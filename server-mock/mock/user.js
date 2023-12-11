/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        url: '/api/user/:id',
        method: 'get',
        response() {
            return {
                code: 0,
                data: {
                    id: Random.id(),
                    username: Random.cname(),
                    age: Random.integer(16,40),
                    email: Random.email(),
                },
                message: 'success'
            }
        }
    },
    {
        url: '/api/user/register',
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
        url: '/api/user/login',
        method: 'post',
        response() {
            return {
                code: 0,
                data: Random.word(32),
                message: 'success'
            }
        }
    },
]