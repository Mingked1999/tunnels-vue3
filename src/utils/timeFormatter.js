export function timeFormatter(value){
    let date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1
    //if 1 digit, 01 02, else 11 12
    let day =  date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${day}-${month}-${year}`
}