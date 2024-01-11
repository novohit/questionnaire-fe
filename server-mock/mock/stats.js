/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/stats',
        method: 'post',
        response(ctx) {
            const { type } = ctx.request.body;
            if (type === 'radio') {
                return {
                    code: 0,
                    data: [
                        { option: '男', count: Random.integer(1, 50) },
                        { option: '女', count: Random.integer(1, 50) },
                        { option: '保密', count: Random.integer(1, 50) },
                    ],
                    message: 'success',
                }
            } else if (type === 'checkbox') {
                return {
                    code: 0,
                    data: [
                        { option: 'Java', count: Random.integer(1, 50) },
                        { option: 'C++', count: Random.integer(1, 50) },
                        { option: 'Python', count: Random.integer(1, 50) },
                        { option: 'Go', count: Random.integer(1, 50) },
                        { option: 'Java、Python', count: Random.integer(1, 50) },
                    ],
                    message: 'success',
                }
            } else {
                return {
                    code: 0,
                    data: [],
                    message: 'success',
                }
            }       
        }
    }
]
