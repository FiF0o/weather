import React from 'react';
import jQuery from 'jquery';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay'


export default class WeatherHeader extends React.Component  {

  constructor() {
    super();

    this.state = {
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
    // this._fetchWeather = _fetchWeather.bind(this);
  }

  componentWillMount() {
    //add polling for everyday
    this._fetchWeather();
  }

  render() {
    const weatherList = this._getWeatherList();
    const weatherCurrent = this._getCurrentWeather();
    return(
      <div>
        <div>{weatherCurrent}</div>
        <div>{weatherList}</div>
        
      </div>
    );
  }
  //TODO Add the right props to be passed down WeatherList
  _getWeatherList() {
    return this.state.dataWeather.list.map((weather) => (
      <WeatherList
          key={weather.dt}
          dt_txt={weather.dt_txt}
      />
    ));
  }

  //{this.state.dataWeather.list.length > 0 ? this.state.dataWeather.list[0].city.name : null}
  _getCurrentWeather() {
    return (
    <CurrentDay
      temp={this.state.dataWeather.list[0].temp.day}
      description={this.state.dataWeather.list[0].weather[0].description}
    />
    );
  }

  _fetchWeather() {
    jQuery.ajax({
      method:'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&APPID=672aa588c2a9ed1c903cd291e545dcac',
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

// http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=672aa588c2a9ed1c903cd291e545dcac
// http://api.openweathermap.org/data/2.5/forcast?qLondon&APPID=672aa588c2a9ed1c903cd291e545dcac

// &APPID=
// const apiKey = "672aa588c2a9ed1c903cd291e545dcac"
// q=London
