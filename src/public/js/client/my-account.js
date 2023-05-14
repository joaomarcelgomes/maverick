function navigationChangePassword() {
  window.location.href = '/client/store/pass'
}

function navigationEditAccount() {
  window.location.href = '/client/store/edit-account'
}

function editAccount() {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const date = document.getElementById('date-birth').value
  const genrer = document.getElementById('genrer').value
  const phone = document.getElementById('phone').value

  const data = {
    name,
    email,
    date,
    genrer,
    phone,
  }

  fetch('http://localhost:3000/client/my-account/edit-account', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    if (data.ok) {
      window.location.href = '/client/store/my-account'
    } else {
      alert(data.message)
    }
  })
}

function changePassword() {
  const password = document.getElementById('password').value
  const newPassword = document.getElementById('new-password').value
  const confirmPassword = document.getElementById('confirm-password').value

  if (newPassword !== confirmPassword) {
    alert('Passwords do not match')
    return
  }

  const data = {
    newPassword,
  }

  fetch('http://localhost:3000/client/my-account/change-password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    if (data.ok) {
      window.location.href = '/client/store/my-account'
    } else {
      alert(data.message)
    }
  })
}
