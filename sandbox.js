const random = require('./helpers/useToken')

console.log(random());

const { hashPassword } = require('./helpers/useBcrypt')

console.log(hashPassword('aku'))