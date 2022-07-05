const d = new Date()
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// time
const year = d.getFullYear()
const month = months[d.getMonth()]
const day = d.getUTCDate()
const hour = d.getHours()
const minute = d.getMinutes()
const second = d.getSeconds()
const milisecond = d.getMilliseconds()

const date = `${month} ${day}, ${year} ${hour}:${minute}:${second}:${milisecond}`
date