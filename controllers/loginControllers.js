export const signUp = (req, res) => {
  res.render('login/signUp', { title: 'Sign Up' });
}

export const register = (req, res) => {

}

export const login = (req, res) => {
  res.render('login/login', { title: 'Login' });
}