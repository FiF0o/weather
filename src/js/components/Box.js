/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react';
import WeatherData from '../WeatherData';

export default class Box extends React.Component {

    constructor() {
        super();

        this.state = {
        };
    }
    render() {
        return (
          <div>
            Comment box here and weatherdata below:

            <WeatherData/>
          </div>

        );
    }
}
