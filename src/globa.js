let global = {
  the_factor (total,min,factor) {
    if(total<=min) return 1
    return (1+(total-min)*factor)
  },
  
  the_factor_hours (total,min,factor) {
    if(total<=min) return 1
    return (1+(total-min)*factor)
  },
  
  exp_factor (total,min,factor) {
    if(total<=min) return 1
    return (1+(total-min)*factor)
  },
  
  exp_factor_hours (total,min,factor) {
    if(total<=min) return 1
    return (1+(total-min)*factor)
  }
}

export default global