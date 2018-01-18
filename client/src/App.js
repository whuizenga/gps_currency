import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state={

    }
  }
  _handleSubmit = (event) => {
    event.preventDefault()

    const latitude = event.target.latitude.value;
    const longitude = event.target.longitude.value;
    const apikey = event.target.apikey.value;

    axios.post('/api/gps', {latitude, longitude, apikey}).then((res) => {
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input name="latitude" type="number" step="0.000001" placeholder="latitude" required />
          <input name="longitude" type="number" step="0.000001" placeholder="longitude" required />
          <input name="apikey" type="text" placeholder="Google maps api key" required />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
