function edit(id) {
  window.location.href = `http://localhost:3000/admin/store/edit-car?id=${id}`
}

function remove(id) {
  fetch(`http://localhost:3000/admin/store/remove-car/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    window.location.href = 'http://localhost:3000/admin/store'
  })
}
