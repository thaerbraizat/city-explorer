import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import MapContaine from './MapContaine';
export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      longitude: '',
      latitude: ''
    }
  }

  nameChangeHandler = (e) => {
    this.setState({
      displayName: e.target.value
    })
  }
  submitData = async (e) => {
    e.preventDefault()
    axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.aa7e1497cc88fec3b69a5efd60a76506&city=${this.state.displayName}&format=json`).then(axiosResponse =>{

      this.setState({
        displayName: axiosResponse.data[0].display_name,
        longitude: axiosResponse.data[0].lon,
        latitude: axiosResponse.data[0].lat
      })
    }).catch(e=>{
      alert("plz enter city name!")
    })
  
    
  
  }
  render() {
    return (
      <>
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onChange={(e) => { this.nameChangeHandler(e) }} />
          <button>Explore!</button>
        </form>
        < ListGroup>
          <ListGroup.Item variant="dark" style={{height: '4em'}}>{this.state.displayName}</ListGroup.Item>
          <ListGroup.Item variant="dark" style={{height: '4em'}}>{this.state.longitude}</ListGroup.Item>
          <ListGroup.Item variant="dark" style={{height: '4em'}}>{this.state.latitude}</ListGroup.Item>
        </ListGroup>
      
        
        <MapContaine  lat={this.state.latitude} lon={this.state.longitude} />
      </>
     
     
    )
  }
}

export default App


