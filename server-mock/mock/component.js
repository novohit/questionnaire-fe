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
                                    title: "单行输入",
                                    placeholder: "请输入...",
                                }
                            },
                            {
                                componentId: Random.id(),
                                type: 'inputArea',
                                defaultProps: {
                                    title: "多行输入",
                                    placeholder: "请输入多行文本...",
                                }
                            },
                        ]
                    },
                    {
                        groupId: Random.id(),
                        groupName: '用户选择',
                        components: [
                            {
                                componentId: Random.id(),
                                type: 'radio',
                                defaultProps: {
                                    title: "单项选择",
                                    options: [
                                        { value: 'A', text: 'A' },
                                        { value: 'B', text: 'B' },
                                        { value: 'C', text: 'C' },
                                        { value: 'D', text: 'D' },
                                    ],
                                    defaultOptionValue: 'B',
                                    direction: 'horizontal'
                                }
                            },
                            {
                                componentId: Random.id(),
                                type: 'checkbox',
                                defaultProps: {
                                    title: "多项选择",
                                    options: [
                                        { value: 'A', text: 'A', checked: true },
                                        { value: 'B', text: 'B', checked: false },
                                        { value: 'C', text: 'C', checked: true },
                                        { value: 'C', text: 'C', checked: false },
                                    ],
                                    direction: 'horizontal'
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