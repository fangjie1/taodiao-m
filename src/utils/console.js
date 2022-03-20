if (process.env.NODE_ENV === 'production') {
  console.log = function () {}
  console.dir = function () {}
  console.error = function () {}
}
