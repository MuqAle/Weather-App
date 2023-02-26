import Weather from "./API";

const renderWeather = (() => {
    const cityName = document.querySelector('#city_name')
    const countryName = document.querySelector('#country')
    const date = document.querySelector('#date')
    const temperature = document.querySelector('#temperature')
    const scale = document.querySelector('#temperature_scale')
    const img = document.querySelector('img')
    const details = document.querySelector('#weather')
    const feelsLike = document.querySelector('#feels_like')
    const humidity = document.querySelector('#humidity')
    const windSpeed = document.querySelector('#wind_speed')
    const airQuality = document.querySelector('#air_quality')

    const getURL = (url) => {
        const numberPNG = url.split('/').pop()
        const number = numberPNG.split('.')[0] 
        return number
    }

    const domData = (weather) => {
        cityName.textContent = weather.location.name
        countryName.textContent = weather.location.country
        date.textContent = weather.location.localtime
        if(scale.className === 'celsius'){
            temperature.textContent = `${weather.current.temp_c} °C`
        }
        if(scale.className === 'fahrenheit'){
            temperature.textContent = `${weather.current.temp_f} °F`
        }
        const number = getURL(weather.current.condition.icon)
        if(weather.current.is_day === 0){
            img.src = `../weather_icons/night_weather/${number}.svg`
        }
        if(weather.current.is_day === 1){
            img.src = `../weather_icons/day_weather/${number}.svg`
        }
        details.textContent = weather.current.condition.text
        if(scale.className === 'celsius'){
            feelsLike.nextElementSibling.textContent = `${weather.current.feelslike_c} °C`
            windSpeed.nextElementSibling.textContent = `${weather.current.wind_kph} kph`
        }
        if(scale.className === 'fahrenheit'){
            feelsLike.nextElementSibling.textContent = `${weather.currentWeather.feelslike_f} °F`
            windSpeed.nextElementSibling.textContent = `${weather.current.wind_mph} mph`
        }
        humidity.nextElementSibling.textContent = `${weather.current.humidity}%`

        switch (weather.current.air_quality['us-epa-index']){
            case 1:
                airQuality.nextElementSibling.textContent = 'Good'
                break
            case 2:
                airQuality.nextElementSibling.textContent = 'Moderate'
                break
            case 3:
                airQuality.nextElementSibling.textContent = 'Unhealthy for sensitive group'
                break
            case 4:
                airQuality.nextElementSibling.textContent = 'Unhealthy'
                break
            case 5:
                airQuality.nextElementSibling.textContent = 'Very Unhealthy'
                break
            case 6:
                airQuality.nextElementSibling.textContent = 'Hazardous'
                break
            default:
                airQuality.nextElementSibling.textContent = 'No Data'
        }
    }


    const renderPage = async(city) => {
        const weatherForecast = await Weather(city)
        domData(weatherForecast)
    }
    return renderPage
    
})()

export default renderWeather