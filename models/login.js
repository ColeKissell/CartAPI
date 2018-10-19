// const Users = require ('./models/users')
// const passport = require ('passport')
// {method: 'GET',
//         path: '/login',
//         handler: async (login) => {
//             passport.use(new LocalStrategy({
//                 usernameField: 'email'
//               },
//               function(username, password, done) {
//                 Users.findOne({ email: username }, function (err, user) {
//                   if (err) { return done(err); }
//                   // Return if user not found in database
//                   if (!user) {
//                     return done(null, false, {
//                       message: 'User not found'
//                     });
//                   }
//                   // Return if password is wrong
//                   if (!user.validPassword(password)) {
//                     return done(null, false, {
//                       message: 'Password is wrong'
//                     });
//                   }
//                   // If credentials are correct, return the user object
//                   return done(null, user, {
//                       message: 'User is logged in!'
//                   });
//                 });
//               }
//             ))
//             await login()
           
//         }