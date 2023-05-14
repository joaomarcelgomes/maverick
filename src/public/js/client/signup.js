function signUp() {
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const confirmPassword = document.getElementById('confirm-password')
  const dateBirth = document.getElementById('date-birth')
  const genrer = document.getElementById('genrer')
  const phone = document.getElementById('phone')

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
    date: dateBirth.value,
    genrer: genrer.value,
    phone: phone.value,
  }

  fetch('http://localhost:3000/client/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    if (data.ok) {
      window.location.href = '/'
    } else {
      alert(data.message)
    }
  })
}
