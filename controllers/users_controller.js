const User = require("../models/user");

//const User = require('user-model'); // Replace 'user-model' with the actual path to your User model

module.exports.profile = async function (req, res) {
  if (req.cookies.user_id) {
    try {
      const user = await User.findById(req.cookies.user_id).exec();
      if (user) {
        return res.render('user_profile', {
          title: "User Profile",
          user: user
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.redirect('/users/sign-in');
  }
};


// render the sign up page
module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "Codial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
      try {
            if (req.body.password != req.body.confirm_password) {
                  return res.redirect('back');
            }

            const existingUser = await User.findOne({ email: req.body.email });

            if (!existingUser) {
                  const newUser = await User.create(req.body);
                  return res.redirect('/users/sign-in');
            } else {
                  throw new Error("Email is already in use");
            }
      } catch (err) {
            console.error('Error in signing up:', err);
            return res.redirect('back');
      }
};


// sign In and create a session for the user
module.exports.createSession = async function (req, res) {
      try {
            // Find the user using await
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                  // Handle user not found
                  return res.redirect("back");
            }

            // Handle password mismatch
            if (user.password !== req.body.password) {
                  return res.redirect("back");
            }

            // Handle session creation
            res.cookie("user_id", user.id);
            return res.redirect("/users/profile");
      } catch (err) {
            console.log("Error in signing in:", err);
            return res.redirect("back");
      }
};


// // user sign-out 

module.exports.signOut = function (req, res) {
      // res.render("user_sign_in", {
      //   title: "Codial | Sign In",
      // });
      res.clearCookie('user_id'); // Replace 'user_id' with the name of your authentication cookie
      // Redirect to a sign-in page or home page
      res.redirect('/users/sign-in');
};
