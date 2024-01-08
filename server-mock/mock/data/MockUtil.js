/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const Mock = require('mockjs')

const sexArr = ['男', '女', '保密'];
const nameArr = ['A', 'B'];

function mockPhone() {
    return Mock.mock('@integer(10000000000, 19999999999)');
}

module.exports.sexArr = sexArr;
module.exports.nameArr = nameArr;

module.exports.mockPhone = mockPhone;