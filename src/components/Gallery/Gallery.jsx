import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.updatePhotoDisplay = this.updatePhotoDisplay.bind(this);
    this.state= {
      photos: [],
      currentItem: 0
    };
  } 
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.setState({currentItem: this.props.currentItem});
    this.updatePhotoDisplay(this.props.currentItem);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);    
  }
  handleKeyDown(e) {
    switch (e.key) {
      case 'j':
        this.slideLeft();
        break;
      case 'k':
        this.slideRight();
        break;
      default:
        break;
    }
  }
  updatePhotoDisplay(offSet) {
    const {
      width
    } = this.props;
    this.photoBox.style.marginLeft = `-${width * offSet}px`;    
  }
  slideLeft() {
    const {
      currentItem,
    } = this.state;
    const { photos, width } = this.props;
    const nextItem = currentItem < photos.length -1 ? currentItem + 1 : 0;
    this.photoBox.style.marginLeft = `-${width * nextItem}px`;
    this.setState({currentItem: nextItem});
    this.props.updateIndex(nextItem);
  }
  slideRight() {
    const {
      currentItem,
    } = this.state;
    const { photos, width } = this.props;    
    const nextItem = currentItem > 0 ? currentItem - 1 : photos.length -1;
    this.photoBox.style.marginLeft = `-${width * nextItem}px`;
    this.setState({currentItem: nextItem});
    this.props.updateIndex(nextItem);    
  }
  render() {
    const {
      photos,
      width
    } = this.props;
    const { currentItem } = this.state;
    return (
      <div>
        <p>{`${currentItem} ${photos.length}`}</p>
        <div className="photos" style={{width, overflow: 'hidden', margin: '0 auto'}}>
          <div 
            className="photos__items" 
            style={{display: 'flex'}}
            ref={(div) => this.photoBox = div}
          >
            {photos.map((photo,i) => (
              <div key={photo.id} style={{position: 'relative'}}>
                <img src={photo.url} alt="" style={{display: 'block'}}/>
                <p style={
                  {
                    position: 'absolute', 
                    left: 0, 
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    color: 'white',
                    padding: '1em',
                    textAlign: 'center',
                    margin: 0                  
                  }
                }>{photo.title}</p>
              </div>
            ))}
          </div>       
        </div>
        <button onClick={this.slideRight}>pre</button>
        <button onClick={this.slideLeft}>next</button>
      </div>
    );
  }
}

Gallery.defaultProps = {
  photos: [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "http://placehold.it/600/92c952",
      thumbnailUrl: "http://placehold.it/150/92c952"
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "http://placehold.it/600/771796",
      thumbnailUrl: "http://placehold.it/150/771796"
    }
  ],
  updateIndex: (index) => console.log(index),
  currentItem: 0,
  width: 600
};

export default Gallery;