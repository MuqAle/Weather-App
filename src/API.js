const Weather = (() => {
    
    const getCurrentWeather = async (city) => {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=fbd1bb439cf94a23a91212508232402&q=${city}&aqi=yes`, {
            mode: 'cors'
        })
        const currentWeather = await response.json()
        return currentWeather
    }

    return getCurrentWeather

})()

export default Weather
