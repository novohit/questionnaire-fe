/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const Mock = require('mockjs')
const Random = Mock.Random

function getQuestionnaires(opt = {}) {
    const { len = 10, isDeleted = false, isStar = false } = opt
    const list = []
    for (let i = 0; i < len; i++) {
        isStarValue = Random.boolean()
        if (isStar) {
            isStarValue = true
        }
        if (isDeleted) {
            list.push({
                _id: Random.id(),
                title: Random.ctitle(),
                isStar: isStarValue,
                isPublished: Random.boolean(),
                answerCount: Random.natural(50, 100),
                createdAt: Random.datetime(),
                deletedAt: Random.datetime()
            })  
        } else {
            list.push({
                _id: Random.id(),
                title: Random.ctitle(),
                isStar: isStarValue,
                isPublished: Random.boolean(),
                answerCount: Random.natural(50, 100),
                createdAt: Random.datetime()
            })
        }
    }
    return list
}

module.exports = getQuestionnaires