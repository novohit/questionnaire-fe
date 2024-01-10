/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/stats',
        method: 'post',
        response() {
            return {
                code: 0,
                data: {
                    data: [
                        { option: '男', count: Random.integer(1, 50) },
                        { option: '女', count: Random.integer(1, 50) },
                        { option: '保密', count: Random.integer(1, 50) },
                    ]
                },
                message: 'success',
            }
        }
    }
]
