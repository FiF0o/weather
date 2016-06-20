/**
 * Created by jonlazarini on 20/06/16.
 */
import React from 'react'
import jQuery from 'jquery';


export default class WeatherData extends React.Component  {


  constructor() {
    super();

    this.state = {
      dataWeather: []
    }

    this._fetchWeather = _fetchWeather.bind(this);
  };

  componentWillMount() {
    this._fetchWeather();
  }

  render() {
    return(
      <div>weather</div>
    );

  }
  _fetchWeather() {
    jQuery.ajax({
      method:'GET',
      url: '',
      //context: '',
      success: (dataWeather) => {
        this.setState({dataWeather})
      }
    })
  }
}
// http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=672aa588c2a9ed1c903cd291e545dcac
// http://api.openweathermap.org/data/2.5/forcast?qLondon&APPID=672aa588c2a9ed1c903cd291e545dcac

// &APPID=
// const apiKey = "672aa588c2a9ed1c903cd291e545dcac"
// q=London
