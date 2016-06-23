import React from 'react';
import jQuery from 'jquery';
import WeatherList from './WeatherList';
import CurrentDay from './CurrentDay';
import WeatherHeader from './WeatherHeader';
import toWeekDay from '../utils/WeekDay';


export default class WeatherBody extends React.Component  {

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
  }

  componentWillMount() {
    //TODO add polling for refreshing data every day - timer
    this._fetchWeather();
  }

  render() {
    const weatherList = this._getWeatherList();
    const weatherCurrent = this._getCurrentWeather();

    const current = this.state.dataWeather.list[0];
    
    return(
      <div>
        <WeatherHeader
          today={new Date(current.dt)}
          name={this.state.dataWeather.city.name}
          location={this.state.dataWeather.city.country}
        />
        <div>
          <div>{weatherCurrent}</div>
          <div>{weatherList}</div>
        </div>
      </div>
    );
  }

  _getWeatherList() {
    return this.state.dataWeather.list.map((weather) => {
      const timestampInMilliseconds = weather.dt * 1000;
      const dayMonthNumb = new Date(timestampInMilliseconds);
      const weekDayEng = toWeekDay(dayMonthNumb);
      
      const nowTemp = weather.temp.day;
      
      return (
        <WeatherList
          day={weekDayEng}
          temp={nowTemp}
          description={weather.weather[0].description}
          key={weather.dt}
        />
      )
    });
  }

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
    /**
     * Request for London city for the next 7 days
     *
     *  http://api.openweathermap.org/data/2.5/forecast/daily?q=London&APPID=672aa588c2a9ed1c903cd291e545dcac
     *  
     **/
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
        alert(`${dataWeather} not found! Go and get a decent network provider! :(`);
      }
    });
  }
}

