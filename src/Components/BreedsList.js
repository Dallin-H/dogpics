import React, { Component } from "react";

export default class BreedsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendBreed = () => {
    this.props.getImage(this.props.breed);
  };

  render(props) {
    return (
      <div className="BreedsList">
        <h4 onClick={this.sendBreed}>{this.props.breed}</h4>
      </div>
    );
  }
}
