function addCar() {
  const imageUrl = document.getElementById('image-url')
  const name = document.getElementById('name')
  const value = document.getElementById('value')
  const date = document.getElementById('date')
  const dailyPrice = document.getElementById('daily-price')
  const color = document.getElementById('color')

  const data = {
    imageUrl: imageUrl.value,
    name: name.value,
    value: value.value,
    date: date.value,
    dailyPrice: dailyPrice.value,
    color: color.value,
  }

  fetch('http://localhost:3000/admin/store/add-car', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      alert('Car added successfully')
    }
  })
}
