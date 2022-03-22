const formatValidationErr = (err) => {
  let formattedErr = err.split('User validation failed: ')[1].split(', ')

  let res = ''
  formattedErr.forEach((err) => {
    let message = err.split(': ')

    res = res + ' ' + message[1]
  })

  return res.trim()
}

export default formatValidationErr
