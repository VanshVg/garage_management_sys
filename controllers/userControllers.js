import conn from '../config/dbConfig.js';

export const signUp = (req, res) => {
  res.render('login/signUp', { title: 'Sign Up' });
}

export const register = async (req, res) => {
  const { role_id, name, email, password } = req.body;
  if (!name) {
    res.status(301).json({ success: false, message: "Please provide First Name" });
  }
  else if (!email) {
    res.status(301).json({ success: false, message: "Please provide an email address" });
  }
  else if (!password) {
    res.status(301).json({ success: false, message: "Please provide a password" });
  }
  else {
    res.status(200).json({ success: true, message: "Registered Successfully" });
  }
}

export const signIn = (req, res) => {
  res.render('login/login', { title: 'Login' });
}

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  res.status(201).json({ success: true, message: "Logged in successfully" });
}