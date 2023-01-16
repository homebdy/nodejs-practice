const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { name: 'abc' },
    'my-secret-key',
    { expiresIn: '30m' },
    (err, token) => {
        if(err) {
            console.log("error");
            return;
        }
        console.log(token);
    }
)

// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHUiLCJpYXQiOjE2NzM4NDQzMTQsImV4cCI6MTY3Mzg0NjExNH0.WUxJ1U99b4mqCFngYFLy4-tMgeLOsLwPAnwklJikfUc', ' my-secret-key', (error, decoded) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     console.log(decoded);
// })