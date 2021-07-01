import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
// import MapContaine from './MapContaine';
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
      let weatherUrl = `http://localhost:8000/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`
      let weatherShow = await axios.get(weatherUrl).then(response => {
        this.setState({
          weather: response.data,
          display: true
        })
      })
      let moviesUrl = `http://localhost:8000/movies?&originaltitle=${this.state.cityName}`
      let moviesGet = await axios.get(moviesUrl).then(response => {
        this.setState({
          movies: response.data,

          display: true
        })
      })

    })
    .catch(error => {
      this.setState({
        display:false
      })
      alert("plz enter city name! 500 ERORR");
    });
    



  }
  render() {
    console.log(this.state.cityName);
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
          /* <MapContaine  lat={this.state.latitude} lon={this.state.longitude} /> */
        }

        {
          this.state.display &&
          this.state.weather.map((element, i) => {
            return (
              <>
                < ListGroup>

                  <ListGroup.Item variant="primary" className="text-center"  style={{ height: '4em'}}>Description: {element.description}</ListGroup.Item>
                  <ListGroup.Item variant="danger" className="text-center" style={{ height: '4em' }}> date : {element.date}</ListGroup.Item>
                </ListGroup>

              </>
            )

          })
        }

        {
          this.state.display &&
          this.state.movies.map((element, i) => {
            console.log(element);
            return (

              <>
              
                <h4>Title :{element.title}</h4>
                <h5>Have Votes :{element.votes}</h5>
                <img src={element.img}  />
              </>
            )
            
          })
        }
      </>


    )
  }
}

export default App


