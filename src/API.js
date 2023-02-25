const Weather = (() => {
    
    const getCurrentWeather = async (city) => {
        try{const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=fbd1bb439cf94a23a91212508232402&q=${city}&aqi=yes`, {
            mode: 'cors'
        })
        const currentWeather = await response.json()
        console.log(currentWeather)}
        catch (error){
            console.log(error)
        }
    }

    return getCurrentWeather

})()

export default Weather
