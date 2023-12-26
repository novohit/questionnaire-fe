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
                                defaultProps: {
                                    text: "一行标题",
                                    level: 1,
                                    isCenter: false,
                                }
                            },
                            {
                                componentId: Random.id(),
                                type: 'paragraph',
                                defaultProps: {
                                    text: "这是段落",
                                    isCenter: false,
                                }
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
                                defaultProps: {
                                    title: "输入框标题",
                                    placeholder: "请输入...",
                                }
                            },
                        ]
                    },
                ],
                message: 'success'
            }
        }
    },
]