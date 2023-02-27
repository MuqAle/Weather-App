import Weather from "./API";
import helperFunction from "./helper_fnc";

const renderWeather = (() => {
    const search = document.querySelector('input')
    const searchBtn = document.querySelector('.search_btn')
    const cityName = document.querySelector('#city_name')
    const countryName = document.querySelector('#country')
    const date = document.querySelector('#date')
    const time = document.querySelector('#time')
    const temperature = document.querySelector('#temperature')
    const scale = document.querySelector('#temperature_scale')
    const img = document.querySelector('.weather_icon')
    const details = document.querySelector('#weather')
    const feelsLike = document.querySelector('#feels_like')
    const humidity = document.querySelector('#humidity')
    const windSpeed = document.querySelector('#wind_speed')
    const airQuality = document.querySelector('#air_quality')
    const errorSearch = document.querySelector('.error')




    


    const domData = (weather) => {
        cityName.textContent = weather.location.name
        countryName.textContent = weather.location.country
        date.textContent = helperFunction.formatDate(weather.location.localtime)
        time.textContent = helperFunction.formatTime(weather.location.localtime)
        if(scale.className === 'celsius'){
            temperature.textContent = `${weather.current.temp_c} °C`
        }
        if(scale.className === 'fahrenheit'){
            temperature.textContent = `${weather.current.temp_f} °F`
        }
        const number = helperFunction.getURL(weather.current.condition.icon)
        const dayURL = String(`background_imgs/day_imgs/${helperFunction.getRandomNumber()}.jpg`)
        const nightURL = `background_imgs/night_imgs/${helperFunction.getRandomNumber()}.jpg`
        if(weather.current.is_day === 0){
            img.src = `weather_icons/night_weather/${number}.svg`
            document.body.style.backgroundImage = `url(${nightURL})`
        }
        if(weather.current.is_day === 1){
            img.src = `weather_icons/day_weather/${number}.svg`
            document.body.style.backgroundImage = `url(${dayURL})`
        }
        details.textContent = weather.current.condition.text
        if(scale.className === 'celsius'){
            feelsLike.nextElementSibling.textContent = `${weather.current.feelslike_c} °C`
            windSpeed.nextElementSibling.textContent = `${weather.current.wind_kph} kph`
        }
        if(scale.className === 'fahrenheit'){
            feelsLike.nextElementSibling.textContent = `${weather.current.feelslike_f} °F`
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


    const tempMetric = () => {
        let temp
        let fLTemp
        let wS
        if(scale.className === 'celsius'){
            scale.classList.add('fahrenheit')
            scale.classList.remove('celsius')
            scale.textContent ='Display: °F'
            temp = temperature.textContent
            fLTemp = feelsLike.nextElementSibling.textContent
            wS = windSpeed.nextElementSibling.textContent
            const cTemp = helperFunction.CToF(temp)
            const cFLTemp = helperFunction.CToF(fLTemp)
            const ktoM = helperFunction.kToM(wS)
            temperature.textContent = cTemp
            feelsLike.nextElementSibling.textContent = cFLTemp
            windSpeed.nextElementSibling.textContent = ktoM
        }
        
        else{
            scale.classList.add('celsius')
            scale.classList.remove('fahrenheit')
            scale.textContent ='Display: °C'
            temp = temperature.textContent
            fLTemp = feelsLike.nextElementSibling.textContent
            wS = windSpeed.nextElementSibling.textContent
            const fTemp = helperFunction.FToC(temp)
            const fFLTemp = helperFunction.FToC(fLTemp)
            const mtoK = helperFunction.mToK(wS)
            temperature.textContent = fTemp
            feelsLike.nextElementSibling.textContent = fFLTemp
            windSpeed.nextElementSibling.textContent = mtoK
        }
 
    }

    const renderPage = async(city) => {
        try{
            const weatherForecast = await Weather(city)
            domData(weatherForecast) 
        }catch(error){
            if(city === ''){
                errorSearch.textContent = 'Please input a city'
            }
            else{
                errorSearch.textContent = 'City not found'
            }
        }
       
        scale.addEventListener('click', tempMetric)
         
    }

    const createWeatherAPP = async() => {
        searchBtn.addEventListener('click', async() => {
            renderPage(search.value)
            errorSearch.textContent = ''
        })
    }

    return {renderPage,createWeatherAPP}
    
})()

export default renderWeather