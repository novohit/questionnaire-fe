/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')
const MockUtil = require('./data/MockUtil')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/answer/:questionnaireId',
        method: 'get',
        response(ctx) {
            const { questionnaireId } = ctx.params
            return {
                code: 0,
                data: {
                    list: [
                        {
                            answerId: Random.id(),
                            questionnaireId: questionnaireId,
                            map: {
                                'c1': Random.cname(),
                                'c2': Random.email(),
                                'c3': MockUtil.mockPhone(),
                                'c4': Random.pick(MockUtil.sexArr),
                                'c5': 'A,C',
                            },
                        },
                        {
                            answerId: Random.id(),
                            questionnaireId: questionnaireId,
                            map: {
                                'c1': Random.cname(),
                                'c2': Random.email(),
                                'c3': MockUtil.mockPhone(),
                                'c4': Random.pick(MockUtil.sexArr),
                                'c5': 'A,C',
                            },
                        },
                        {
                            answerId: Random.id(),
                            questionnaireId: questionnaireId,
                            map: {
                                'c1': Random.cname(),
                                'c2': Random.email(),
                                'c3': MockUtil.mockPhone(),
                                'c4': Random.pick(MockUtil.sexArr),
                                'c5': 'A,C',
                            },
                        },
                        {
                            answerId: Random.id(),
                            questionnaireId: questionnaireId,
                            map: {
                                'c1': Random.cname(),
                                'c2': Random.email(),
                                'c3': MockUtil.mockPhone(),
                                'c4': Random.pick(MockUtil.sexArr),
                                'c5': 'A,C',
                            },
                        },
                        {
                            answerId: Random.id(),
                            questionnaireId: questionnaireId,
                            map: {
                                'c1': Random.cname(),
                                'c2': Random.email(),
                                'c3': MockUtil.mockPhone(),
                                'c4': Random.pick(MockUtil.sexArr),
                                'c5': 'A,C',
                            },
                        },
                    ],
                    total: 100,
                },
                message: 'success'
            }
        }
    }
]