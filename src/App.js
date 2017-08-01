import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './components/Gallery/Gallery'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleShowGallery = this.toggleShowGallery.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.width = 1000;
    this.state= {
      photos: [],
      isShowGallery: true,
      index: 0,    
    };
  } 
  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(raw => raw.json())
      .then(photos => {
        const adjustedPhotos = photos.slice(100, 110).map(({albumId, id, title, url, thumbnailUrl}) => {
          return {
            albumId,
            id,
            title,
            url: url.replace(/\/([0-9]{3})\//g, `/${this.width}x600/`),
            thumbnailUrl
          }
        });
        this.setState({ photos: adjustedPhotos });
      })
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);    
  }
  handleKeyDown(e) {
    switch (e.key) {
      case 'Escape':
        this.toggleShowGallery();
        break;      
      default:
        break;
    }
  }
  toggleShowGallery() {
    this.setState({isShowGallery: !this.state.isShowGallery})
  }
  updateIndex(index) {
    this.setState({index})
  }
  render() {
    const {
      photos, 
      isShowGallery,
      index  
    } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {isShowGallery ? <Gallery photos={photos} updateIndex={this.updateIndex} currentItem={index} width={this.width}/> : null}
        
        <button onClick={this.toggleShowGallery}>Toggle Gallery</button>    
      </div>
    );
  }
}

export default App;
