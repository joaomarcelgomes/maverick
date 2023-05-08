function signIn() {
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  const valid = validateFields(email, password)

  if (!valid) {
    return
  }

  const data = {
    email: email.value,
    password: password.value,
  }

  fetch('http://localhost:3000/admin/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      window.location.href = '/admin/menu'
    }

    console.log(response)
  })
}

function validateFields(email, password) {
  const emailError = document.getElementById('email-error')

  if (!isEmail(email.value)) {
    emailError.innerHTML = 'Please enter a valid email address'
    email.classList.add('error')
    return false
  }
  emailError.innerHTML = ''

  const passwordError = document.getElementById('password-error')
  if (!validatePassword(password.value)) {
    passwordError.innerHTML = 'Please enter a valid password'
    password.classList.add('error')
    return false
  }
  passwordError.innerHTML = ''

  return true
}
