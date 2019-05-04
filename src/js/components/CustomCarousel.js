import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';

class CustomCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    const { items } = this.props;
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const { items } = this.props;
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const {activeIndex} = this.state;
    const { items } = this.props;

    const slides = items.map((item, index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={index}
        >
          <div className="carousel-image-container">
            <img src={item} alt="carousel" />
          </div>
        </CarouselItem>
      );
    });

    return <div className="gear-carousel">
      <Carousel
         activeIndex={activeIndex}
         next={this.next}
         previous={this.previous}
       >
       {slides}
        <div className="carousel-control-prev" role="button" tabIndex="0" onClick={this.previous}>
          <i className="fa fa-angle-left"></i>
          <span className="sr-only">Previous</span>
        </div>
        <div href="#" className="carousel-control-next" role="button" tabIndex="0" onClick={this.next}>
          <i className="fa fa-angle-right"></i>
          <span className="sr-only">Next</span>
        </div>
      </Carousel>
      <CarouselIndicators className='d-lg-none' items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
    </div>
  }
}

export default CustomCarousel;
