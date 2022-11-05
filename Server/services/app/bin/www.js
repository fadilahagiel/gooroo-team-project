const test = require('../app')
const port = 3001

test.listen(port, () => {
    console.log('test is running')
})