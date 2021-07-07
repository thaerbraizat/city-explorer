import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
import Movies from './component/Movies';
import Weather from './component/Weather';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      longitude: '',
      latitude: '',
      display: false,
      weather: [],
      movies: [],
      cityName: ''
    }
  }

  nameChangeHandler = (e) => {
    this.setState({
      cityName: e.target.value,
      displayName: e.target.value
    })
  }
  submitData = async (e) => {
    e.preventDefault()
    axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API}&city=${this.state.displayName}&format=json`).then(axiosResponse => {

      this.setState({
        displayName: axiosResponse.data[0].display_name,
        longitude: axiosResponse.data[0].lon,
        latitude: axiosResponse.data[0].lat,
        display: true
      })
    }).then(async () => {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`
      let weatherShow = await axios.get(weatherUrl).then(response => {
        this.setState({
          weather: response.data,
          display: true
        })
      })
      console.log(this.state.weather);
      let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?originaltitle=${this.state.cityName}`
      let moviesGet = await axios.get(moviesUrl).then(response => {
        this.setState({
          movies: response.data,
          display: true
        })
      })

    })

    // .catch(error => {
    //   this.setState({
    //     display:false
    //   })
    //   alert("plz enter city name! 500 ERORR");
    // });
    



  }
  render() {
 
    return (
      <>
      
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onChange={(e) => { this.nameChangeHandler(e) }} />
          <button>Explore!</button>
        </form>
        < ListGroup>
          <ListGroup.Item variant="dark" style={{ height: '4em' }}>{this.state.displayName}</ListGroup.Item>
          <ListGroup.Item variant="dark" style={{ height: '4em' }}>{this.state.longitude}</ListGroup.Item>
          <ListGroup.Item variant="dark" style={{ height: '4em' }}>{this.state.latitude}</ListGroup.Item>
        </ListGroup>
        {this.state.display &&
          <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.aa7e1497cc88fec3b69a5efd60a76506&center=${this.state.latitude},${this.state.longitude}&zoom=10`} style={{ width: "400px", height: "400" }} rounded />
         
        }

       <Weather display={this.state.display} weather={this.state.weather} />

      <Movies display={this.state.display}   movies  ={this.state.movies}/>
      </>


    )
  }
}

export default App


