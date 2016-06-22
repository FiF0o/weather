/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react';
import WeatherHeader from './WeatherHeader';

export default class WeatherBox extends React.Component {

    constructor() {
        super();

        this.state = {
        };
    }
    render() {
        return (
          <div>
            Comment box here and weatherdata below:
            <WeatherHeader/>
          </div>
        );
    }
}
