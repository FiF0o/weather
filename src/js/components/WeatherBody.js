import React from 'react';
import jQuery from 'jquery';
//import WeatherList from './WeatherList';
import WeatherListTable from './WeatherListTable';
import CurrentDay from './CurrentDay';
import WeatherHeader from './WeatherHeader';
import toWeekDay from '../utils/WeekDay';
import convertToD from '../utils/ConvertTemp';

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
      <div className="row">
                
        <div className="col-md-12">
          <WeatherHeader
            today={new Date(current.dt)}
            name={this.state.dataWeather.city.name}
            location={this.state.dataWeather.city.country}
          />
        </div>

        <div className="col-md-12">
          { weatherCurrent }
        </div>
        
        <div className="col-md-12">
          <table className="table">
            <tbody>
              { weatherList }
            </tbody>
          </table>
        </div>
        
        <div className="fullscreen-bg">
          <video loop autoPlay muted poster="./assets/images/adaptive-paths-guide-to-experience-mapping-1320px.jpg" className="fullscreen-bg__video">
            <source src="./assets/videos/clouds.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
      
    );
  }
  _handleSubmit(e) {
    e.preventDefault();

    const city = this._city;
    this.props.requestCity(city.value);

  }

  //TODO Fix video... / is not at the end of the <source > tag

  _getWeatherList() {
    return this.state.dataWeather.list.map((weather) => {
      const timestampInMilliseconds = weather.dt * 1000;
      const dayMonthNumb = new Date(timestampInMilliseconds);
      const weekDayEng = toWeekDay(dayMonthNumb);
      
      const nowTemp = weather.temp.day;
      const convertToC = convertToD(nowTemp);
      
      return (
        <WeatherListTable
          day={weekDayEng}
          temp={convertToC}
          description={weather.weather[0].description}
          key={weather.dt}
        />
      )
    });
  }

  _getCurrentWeather() {
    const current = this.state.dataWeather.list[0];
    
    const nowTemp = current.temp.day;
    const convertToC = convertToD(nowTemp);
    
    return (
      <CurrentDay
        date={new Date(current.dt * 1000)}
        temp={convertToC}
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
//api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&APPID=672aa588c2a9ed1c903cd291e545dcac

