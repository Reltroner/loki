// controller/users.js

const { Users } = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.TOKEN_SECRET;


/*
|--------------------------------------------------------------------------
| AUTH HELPERS
|--------------------------------------------------------------------------
*/

const login = async (email) => {

  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    throw Error("incorrect email");
  }

  return user;

};


const createToken = (id, type) => {

  return jwt.sign(
    { id, type },
    secret,
    { expiresIn: maxAge }
  );

};


/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

const handleErrors = (err) => {

  console.log("AUTH ERROR:", err.message);

  const errors = {
    email: "",
    password: "",
  };

  if (err.message === "incorrect email") {
    errors.email = "Email tidak terdaftar";
  }

  if (err.message === "incorrect password") {
    errors.password = "Password salah";
  }

  return errors;

};


/*
|--------------------------------------------------------------------------
| AUTH PAGES
|--------------------------------------------------------------------------
*/

const signup_get = (req, res) => {
  return res.render("signup");
};

const login_get = (req, res) => {
  return res.render("login");
};


/*
|--------------------------------------------------------------------------
| SIGNUP
|--------------------------------------------------------------------------
*/

const signup_post = async (req, res) => {

  const { name, email, password, confPassword, type } = req.body;

  if (password !== confPassword) {
    return res.status(400).send("Password dan Confirm Password tidak cocok");
  }

  try {

    const emailExist = await Users.findOne({
      where: { email },
    });

    if (emailExist) {
      return res.status(400).send("Email sudah dipakai");
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);


    await Users.create({

      name,
      email,
      password: hashPassword,
      type,

    });


    return res.redirect("/auth/login");


  } catch (err) {

    const errors = handleErrors(err);

    return res.status(400).json({ errors });

  }

};


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

const login_post = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await login(email);

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw Error("incorrect password");
    }

    const token = createToken(user.id, user.type);


    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .cookie("type", user.type, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });


    return res.redirect("/");


  } catch (err) {

    const errors = handleErrors(err);

    return res.status(400).json(errors);

  }

};


/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

const logout_get = (req, res) => {

  res.cookie("jwt", "", { maxAge: 1 });

  res.cookie("type", "", { maxAge: 1 });

  return res.redirect("/auth/login");

};


module.exports = {

  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,

};