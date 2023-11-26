/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/name',
        method: 'get',
        response() {
            return {
                code: 0,
                data: {
                    name: Random.cname()
                }
            }
        }
    }
]
