import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/f/fe/UN_Members_Flags.JPG');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InformationContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 50px;
  border-radius: 15px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input{
    width: 300px;
    height: 30px;
    font-size: 26px;
    margin: 5px;
    background: none;
    border: 1px solid black;
  }
  input:focus{
    outline: none;
    border: 1px solid blue;
    color: blue;
  }
`

class App extends Component {
  constructor(){
    super()
    this.state={
      country: '',
      currencyCode: '',
      currencySymbol: '',
    }
  }
  _handleSubmit = (event) => {
    event.preventDefault()

    const latitude = event.target.latitude.value;
    const longitude = event.target.longitude.value;
    const apikey = event.target.apikey.value;

    axios.post('/api/gps', {latitude, longitude, apikey}).then((res) => {
      console.log(res)
      const country = res.data.country
      const currencyCode = res.data.currency[0].code
      const currencySymbol = res.data.currency[0].symbol

      this.setState({
        country,
        currencyCode,
        currencySymbol
      })
    })
  }
  render() {
    return (
      <Container>
        <InformationContainer>
        <Form onSubmit={this._handleSubmit}>
          <input name="latitude" type="number" step="0.0001" placeholder="latitude" required /> <br />
          <input name="longitude" type="number" step="0.0001" placeholder="longitude" required /> <br />
          <input name="apikey" type="text" placeholder="Google maps api key" required /> <br />
          <button>Submit</button>
        </Form>
        {this.state.country ? <h1>{this.state.country}</h1> : <p>Please fill out the form above</p>}
        {this.state.currencyCode ? <h1>Code: {this.state.currencyCode}</h1> : <p>If you need an apikey please click <a href="https://developers.google.com/maps/">here</a></p>}
        {this.state.currencySymbol ? <h1>Symbol: {this.state.currencySymbol}</h1> : null}
        </InformationContainer>
      </Container>
    );
  }
}

export default App;
