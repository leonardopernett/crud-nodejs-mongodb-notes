const passport = require('passport');
const localStategy = require('passport-local').Strategy;

const User = require('../models/User.js');

passport.use('login',new localStategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true

}, async (req,email, password, done)=>{
    
    const user = await User.findOne({email});
     if(!user){
         done(null, false, req.flash('login_error','email no found'))
     }else{
        const verify_password = await user.comparePassword(password);
        if(verify_password){
          done(null, user)
        }else{
            done(null,false, req.flash('login_error','incorrect password'))
        }
     }

   
}))

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser(async(id, done)=>{
     User.findById(id, (err, user)=>{
         done(err, user)
     })
})