import {format,parseISO} from "date-fns"

const helperFunction = (() => {

    const getURL = (url) => {
        const numberPNG = url.split('/').pop()
        const number = numberPNG.split('.')[0] 
        return number
    }

    const formatDate = (date) => {
        const newDate = parseISO(date.split(' ')[0])
        const displayDate = format(newDate, 'PPPP')
        return displayDate
    }
    const formatTime = (date) => {
        const time = date.split(' ')[1].split(':')
        const hour = Number(time[0])
        const minute = time[1]
        const hourTime = ((hour + 11) % 12 + 1)
        const newTime = `${hourTime}:${minute}`
        if(hour <= 12){
            return `${newTime} AM`
        }
        return `${newTime} PM`  
    }
    
    const FToC = (temp) => {
        const getNum = temp.split('°')[0]
        const numTemp = Number(getNum)
        const celsius = Math.round((numTemp - 32) * (5/9))
        return `${celsius} °C`
    }

    const CToF = (temp) => {
        const getNum = temp.split('°')[0]
        const numTemp = Number(getNum)
        const fahrenheit = Math.round((numTemp * 9/5) + (32))
        return `${fahrenheit} °F`
    }

    return {getURL,formatDate,formatTime, FToC, CToF}
})()

export default helperFunction





