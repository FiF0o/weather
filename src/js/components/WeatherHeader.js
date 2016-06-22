import React from 'react';
import jQuery from 'jquery';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay';
import toWeekDay from '../utils/WeekDay';


export default class WeatherHeader extends React.Component  {

  constructor() {
    super();

    this.state = {
      weekDay: "string",
      dataWeather: {
        city: {
          id: 12345,
          name: "string",
          coord: {
            lon: 12.1345,
            lat: 13.12312
          },
          country: "String",
          population: 0
          
        },
        cod: "200",
        message: 0.1234,
        cnt: 40,
        list: [{
          temp: {
            day: 123.12
          },
          weather:[{
            id: 800,
            main:"Clear",
            description:"clear sky",
            icon: "02d"
        }],
          clouds: 8
        }]
      }
    };

  }


  componentWillMount() {
    //add polling for everyday
    this._fetchWeather();
  }

  render() {
    const weatherList = this._getWeatherList();
    const weatherCurrent = this._getCurrentWeather();
    console.log(this.props);
    return(
      <div>
        <p>{toWeekDay()}</p>
        <div>{weatherCurrent}</div>
        <div>{weatherList}</div>
      </div>
    );
  }


//TODO Add the right props to be passed down WeatherList
  
  _getWeatherList() {
    return this.state.dataWeather.list.map((weather) => {
      return (
        <WeatherList
          temp={weather.temp.day}
          description={weather.weather[0].description}
          key={weather.dt}
        />)
    });
  }

  //{this.state.dataWeather.list.length > 0 ? this.state.dataWeather.list[0].city.name : null}
  _getCurrentWeather() {
    const current = this.state.dataWeather.list[0];
    return (
      <CurrentDay
        date={new Date(current.dt * 1000)}
        temp={current.temp.day}
        description={current.weather[0].description}
      />
    );
  }

  
  _fetchWeather() {
    const apiID = '672aa588c2a9ed1c903cd291e545dcac';
    const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    const location = 'London';
    //TODO Create object to store the query to be passed
    jQuery.ajax({
      method:'GET',
      url: `${forecastUrl}?q=${location}&APPID=${apiID}`,
      //context: '',
      success: (dataWeather) => {
        this.setState({dataWeather})
      },
      error: (dataWeather) => {
        alert(`${dataWeather} not found`);
      }
    })
  }
}
