export default (message,data) => {
    if(data) return ({message: message, data: data})
    return ({message: message})
}