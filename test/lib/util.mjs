function halt (err) {
  console.log(err)
  process.exit(1)
}

function sleep (ms, result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), ms)
  })
}

export { halt, sleep }
