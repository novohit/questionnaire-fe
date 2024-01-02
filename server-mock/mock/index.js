/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const questionnaire = require('./questionnaire')
const test = require('./test')
const user = require('./user')
const component = require('./component')

const mockList = [
    ...test,
    ...questionnaire,
    ...user,
    ...component,
]

module.exports = mockList
