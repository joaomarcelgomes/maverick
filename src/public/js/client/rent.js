/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const initialDate = document.getElementById('initial-reser')
const finalDate = document.getElementById('final-reser')

function validateDate() {
  if (new Date(initialDate.value) >= new Date(finalDate.value)) {
    alert('Date invalid!')
    return false
  }

  return true
}

function rent(id) {
  window.location.href = `/client/store/to-rent?id=${id}`
}

function calcDate() {
  const date1 = new Date(initialDate.value)
  const date2 = new Date(finalDate.value)
  const diffTime = Math.abs(date2 - date1)

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function calcPrice() {
  const days = calcDate()

  const price = document.getElementById('daily-price').value
  const total = days * price

  const value = document.getElementById('reservation-value')
  value.value = total
}

initialDate.addEventListener('change', () => {
  if (initialDate.value !== '' && finalDate.value !== '') {
    if (validateDate() === false) {
      return
    }

    calcPrice()
  }
})

finalDate.addEventListener('change', () => {
  if (initialDate.value !== '' && finalDate.value !== '') {
    if (validateDate() === false) {
      return
    }

    calcPrice()
  }
})

function reserve(id) {
  const value = document.getElementById('reservation-value')
  const payment = document.getElementById('payment-mode')

  if (value.value === '') {
    alert('Please, select the dates!')
    return
  }

  const data = {
    id,
    value: value.value,
    initialDate: initialDate.value,
    finalDate: finalDate.value,
    payment: payment.value,
  }

  fetch('http://localhost:3000/client/store/reserve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    if (data.ok) {
      window.location.href = '/client/store/'
    } else {
      alert(data.message)
    }
  })
}
