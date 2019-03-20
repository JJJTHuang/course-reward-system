let checkM = (month) => {
  let date = new Date()
  let m = date.getMonth()+1
  if(month > m){
    return true
  }
  return false
}

let util = {
  checkM
}

export default util