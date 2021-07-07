import React, { Component } from 'react'

export class Movies extends Component {
    render() {
        return (
            <div>
                  {
          this.props.display &&
          this.props.movies.map((element, i) => {
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
            </div>
        )
    }
}

export default Movies
