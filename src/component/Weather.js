import React, { Component } from 'react'
import { ListGroup, Image } from 'react-bootstrap';

export class Weather extends Component {
    render() {
        return (
            <div>
                 {
          this.props.display &&
          this.props.weather.map((element, i) => {
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
            </div>
        )
    }
}

export default Weather
