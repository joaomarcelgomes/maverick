function updateRent(rentId, status) {
  const data = {
    rentId,
    status,
  }

  console.log(data)

  fetch(`http://localhost:3000/admin/rent`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      window.location.href = '/admin/rent'
    } else {
      alert('Car not reserver')
    }
  })
}
