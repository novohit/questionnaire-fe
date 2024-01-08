/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')
const getQuestionnaires = require('./data/getQuestionnaires')

const Random = Mock.Random

module.exports = [
    {
        // 获取单个问卷信息
        url: '/api/questionnaire/:id',
        method: 'get',
        response() {
            return {
                code: 0,
                data: {
                    _id: Random.id(),
                    title: Random.ctitle(),
                    isStar: Random.boolean(),
                    isPublished: true,
                    answerCount: Random.natural(50, 100),
                    url: 'https://www.baidu.com?params=' + Random.id(),
                    createdAt: Random.datetime(),
                    deletedAt: Random.datetime(),
                    pageSetting: {
                        title: Random.ctitle(),
                        desc: '问卷描述',
                        js: '',
                        css: '',
                    },
                    components: [
                        {
                            userQuestionComponentId: Random.id(),
                            componentId: Random.id(),
                            type: 'title',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: { text: '个人信息调研', level: 1, isCenter: false }
                        },
                        {
                            userQuestionComponentId: 'c1',
                            componentId: Random.id(),
                            type: 'input',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: { title: '你的姓名', placeholder: '请输入姓名' }
                        },
                        {
                            userQuestionComponentId: 'c2',
                            componentId: Random.id(),
                            type: 'input',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: { title: '你的邮箱', placeholder: '请输入邮箱' }
                        },
                        {
                            userQuestionComponentId: 'c3',
                            componentId: Random.id(),
                            type: 'input',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: { title: '你的手机号', placeholder: '请输入手机号' }
                        },
                        {
                            userQuestionComponentId: 'c4',
                            componentId: Random.id(),
                            type: 'radio',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: {
                                title: "性别",
                                options: [
                                    { value: '男', text: '男' },
                                    { value: '女', text: '女' },
                                    { value: '保密', text: '保密' },
                                ],
                                defaultOptionValue: '',
                                direction: 'horizontal'
                            }
                        },
                        {
                            userQuestionComponentId: 'c5',
                            componentId: Random.id(),
                            type: 'checkbox',
                            title: Random.ctitle(),
                            hidden: false,
                            locked: false,
                            props: {
                                title: "学习过哪些语言",
                                options: [
                                    { value: 'Java', text: 'Java', checked: false },
                                    { value: 'C++', text: 'C++', checked: false },
                                    { value: 'Python', text: 'Python', checked: false },
                                    { value: 'Go', text: 'Go', checked: false },
                                ],
                                direction: 'horizontal'
                            }
                        },
                    ]
                },
                message: 'success'
            }
        }
    },
    {
        // 创建问卷
        url: '/api/questionnaire',
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
        url: '/api/questionnaire',
        method: 'get',
        response(ctx) {
            const { url = '', query = {} } = ctx
            const isDeleted = url.indexOf('isDeleted=true') >= 0
            const isStar = url.indexOf('isStar=true') >= 0
            const size = parseInt(query.size) || 10
            return {
                code: 0,
                data: {
                    list: getQuestionnaires({ len: size, isDeleted, isStar }),
                    total: 100
                },
                message: 'success'
            }
        }
    },
    {
        // 更新问卷
        url: '/api/questionnaire/:id',
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
        url: '/api/questionnaire/copy/:id',
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
        url: '/api/questionnaire',
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
        url: '/api/questionnaire/recover',
        method: 'put',
        response() {
            return {
                code: 0,
                message: 'success'
            }
        }
    },
]