const {expressjwt: expressJwt} = require('express-jwt');

function authJwt() {
    const secret = "RAJANVANIKARNIKITARATHODISHAVANI"
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        // isRevoked: isRevoked
    }).unless({
        path:[
            {url: /\/api\/product(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/api\/category(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            '/api/user/register',
            '/api/user/login'
        ]
    })
   
}
// async function isRevoked(req, payload, done) {
//     if(!payload.isAdmin) {
//         done(null, true)
//     }

//     done();
// }



module.exports = authJwt