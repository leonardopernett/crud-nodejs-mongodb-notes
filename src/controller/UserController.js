controller = {}

const User = require('../models/User')
const passport = require('passport')

controller.formSignup = (req,res)=>{
   res.render('users/signup')
}

controller.signup = async (req,res)=>{
      const errors =  [];
      const {name, email, password, confirm_password}= req.body;
      
      if(password != confirm_password){
          errors.push({text:'password do not match'})
      }

      if(password.length < 4){
        errors.push({text:'password must be least 4 character'})
      }

      if(errors.length > 0){
          res.render('users/signup',{
              errors,
              name,
              email
          })
      }else{
         const emailUser =  await User.findOne({email:email});
         if(emailUser){
             req.flash('error','the email is already in use');
             res.redirect('/users/signup')
         }else{
             const user = new User({name, email, password})
             user.password = await user.encryptPassword(user.password)
             await user.save();
             req.flash('info','you are registred')
             res.redirect('/users/signin');
         }
      }

}


controller.formSignin = (req,res)=>{
    res.render('users/signin')

}

controller.signin = passport.authenticate('login',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
})


controller.logout = (req,res)=>{
    req.logout();
    res.redirect('/users/signin')
}


module.exports=controller