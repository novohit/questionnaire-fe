/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const question = require('./question')
const test = require('./test')
const user = require('./user')

const mockList = [
    ...test,
    ...question,
    ...user,
]

module.exports = mockList
