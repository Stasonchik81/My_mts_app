export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
    <div class="mui-textfield">
      <input type="email" id="email" required>
      <label for='email'>Email</label>
    </div>
    <div class="mui-textfield">
      <input type="password" id="password" required>
      <label for='password'>Password</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--primary" id="enter">Войти</button>
  </form>
    `
}
export function authWithEmailAndPassword(email, password) {
  const APIKey = 'AIzaSyDBtFx2skUKkOp8BM0-soncRwI-06c82ec'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`, 
  {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.idToken)
}