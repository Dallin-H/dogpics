import React, { Component } from "react";
import axios from "axios";
import {Button, Modal} from 'react-bootstrap'
import BreedsList from "./../Components/BreedsList";
import RateImageButton from "./../Components/RateImageButton";

export default class Pictures extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      breeds: [],
      image: "",
      ratings: [10, 11, 12, 13, 14, 15, 16],
      archive: [],
      show: false,
    };
  }

  componentDidMount() {
    this.getBreeds();
    this.getRandomImage();
  }

  getBreeds = () => {
    axios.get("https://dog.ceo/api/breeds/list/all").then(res => {
      const breedsObj = res.data.message;
      const breedsArr = [];
      for (const key in breedsObj) {
        if (breedsObj.hasOwnProperty(key)) {
          breedsArr.push(key);
        }
      }
      this.setState({
        breeds: breedsArr
      });
    });
  };

  getRandomImage = () => {
    axios.get("https://dog.ceo/api/breeds/image/random").then(res => {
      this.setState({
        image: res.data.message
      });
    });
  };

  getImageByBreed = breed => {
    axios.get(`https://dog.ceo/api/breed/${breed}/images/random`).then(res => {
      this.setState({
        image: res.data.message
      });
    });
  };

  assignRating = number => {
    let newObj = {image: this.state.image}
    let newArr = this.state.archive
    newArr.push(newObj)
    this.setState({
      archive: newArr
    })
  }
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const mappedBreeds = this.state.breeds.map((breed, index) => {
      return (
        <BreedsList key={index} breed={breed} getImage={this.getImageByBreed} />
      );
    });

    const mappedRatingsButtons = this.state.ratings.map((number, index) => {
      return <RateImageButton key={index} number={number} assignRating={this.assignRating} />;
    });

    const mappedArchive = this.state.archive.map((obj, index) => {
      return (
        <img className='ImageInModal' key={index} src={obj.image} alt={obj.image} />
      )
    })

    return (
      <div className="Pictures">
        <div className="Pictures_body_container">
          <div className="Pictures_BreedsList_container">
            <span>Select a breed below:</span>
            {mappedBreeds}
          </div>
          <div className="Pictures_image_container">
            <button onClick={this.getRandomImage}>Get Random Dog!</button>
            <img
              className="Pictures_image"
              src={this.state.image}
              alt="random dog"
              onClick={this.getRandomImage}
            />
          </div>
        </div>
        <h2>Rate this dog below!</h2>
        <div className="RateImage">{mappedRatingsButtons}</div>

        <Button variant="primary" onClick={this.handleShow}>
          View my liked images
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>My favorite dogs:</Modal.Title>
          </Modal.Header>
          <Modal.Body>{mappedArchive}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
