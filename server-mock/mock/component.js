/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        url: '/api/component/list',
        method: 'get',
        response() {
            return {
                code: 0,
                data: [
                    {
                        groupId: Random.id(),
                        groupName: '文本显示',
                        components: [
                            {
                                componentId: Random.id(),
                                type: 'title',
                            },
                        ]
                    },
                    {
                        groupId: Random.id(),
                        groupName: '用户输入',
                        components: [
                            {
                                componentId: Random.id(),
                                type: 'input',
                            },
                        ]
                    },
                ],
                message: 'success'
            }
        }
    },
]