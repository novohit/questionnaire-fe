/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const questionnaire = require('./questionnaire')
const test = require('./test')
const user = require('./user')
const component = require('./component')
const answer = require('./answer')
const stats = require('./stats')

const mockList = [
    ...test,
    ...questionnaire,
    ...user,
    ...component,
    ...answer,
    ...stats,
]

module.exports = mockList
