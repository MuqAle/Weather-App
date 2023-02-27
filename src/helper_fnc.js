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
        if(hour < 12){
            return `${newTime} AM`
        }
        return `${newTime} PM`  
    }
    
    const FToC = (temp) => {
        const getNum = temp.split('°')[0]
        const numTemp = Number(getNum)
        const celsius = Math.round(((numTemp - 32) * (5/9))* 10)/10
        return `${celsius} °C`
    }

    const CToF = (temp) => {
        const getNum = temp.split('°')[0]
        const numTemp = Number(getNum)
        const fahrenheit = Math.round(((numTemp * 9/5) + (32)) * 10)/10
        return `${fahrenheit} °F`
    }

    const mToK = (speed) => {
        const formatSpeed = Number(speed.split(' ')[0])
        const kph = Math.round((formatSpeed * 1.609) * 10)/10
        return `${kph} kph`
    }

    const kToM = (speed) => {
        const formatSpeed = Number(speed.split(' ')[0])
        const mph = Math.round((formatSpeed / 1.609) * 10)/10
        return `${mph} mph`
    }
    const getRandomNumber = () => Math.floor(Math.random() * 13);

    return {getURL,formatDate,formatTime, FToC, CToF,mToK,kToM, getRandomNumber}
})()

export default helperFunction





