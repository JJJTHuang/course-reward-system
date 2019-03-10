let apiError = (self, err) => {
  self.$message({
    showClose: true,
    message: `${err.code}\n${err.error}`,
    type: 'error'
  })
}

export {
  apiError
}