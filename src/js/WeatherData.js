import React from 'react';
import jQuery from 'jquery';
import Item from './components/Item';

export default class WeatherData extends React.Component  {

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
        list: [
        ]
      }
    };
    // this._fetchWeather = _fetchWeather.bind(this);
  }

  componentWillMount() {
    this._fetchWeather();
  }

  render() {
    const weatherList = this._getWeather()
    return(
      <div>{weatherList}</div>
    );
  }
  _getWeather() {
    return this.state.dataWeather.list.map((weather) => (
      <Item
          key={weather.dt}
          dt_txt={weather.dt_txt}
      />
    ));
  }

  _fetchWeather() {
    jQuery.ajax({
      method:'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=672aa588c2a9ed1c903cd291e545dcac',
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
