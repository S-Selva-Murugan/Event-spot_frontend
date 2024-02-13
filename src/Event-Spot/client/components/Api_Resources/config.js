export const fileConfig = {
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data',
    },
  }

export const config = {
  headers: {
    Authorization: localStorage.getItem('token'),
    "Content-Type":"application/json"
  },
}

export const paymentConfig = {
  headers: {
    Authorization: localStorage.getItem('token'),
    "Content-Type":"application/json"

  },
}