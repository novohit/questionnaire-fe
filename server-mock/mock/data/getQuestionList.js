/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const Mock = require('mockjs')
const Random = Mock.Random

function getQuestionList(len = 10) {
    const list = []
    for (let i = 0; i < len; i++) {
        list.push({
            _id: Random.id(),
            title: Random.ctitle(),
            isStar: Random.boolean(),
            isPublished: Random.boolean(),
            answerCount: Random.natural(50, 100),
            createdAt: Random.datetime()
        })
    }
    return list
}

module.exports = getQuestionList