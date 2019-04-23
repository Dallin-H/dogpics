import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }


  render() {
    console.log(this.props)
    return (
      <div className='Dashboard'>
        Dashboard
      </div>
    )
  }
}
