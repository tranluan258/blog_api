module.exports = (message,data) => {
    if(data) return ({message: message, data: data})
    return ({message: message})
}