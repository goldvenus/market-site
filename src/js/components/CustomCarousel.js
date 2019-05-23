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
    console.log("next", this.state.activeIndex);
  }

  previous() {
    const { items } = this.props;
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    console.log("receive", newIndex, "===");
    this.setState({ activeIndex: newIndex });
  }
  
  componentWillReceiveProps(props) {
    let {gotoIndex} = props;
    if (gotoIndex && gotoIndex !== this.state.activeIndex) {
      console.log("will receive prop: ", props.gotoIndex);
      this.goToIndex(props.gotoIndex);
    }
  }

  render() {
    const {activeIndex} = this.state;
    let {items} = this.props;

    console.log(">>",activeIndex, items);
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div className="carousel-image-container">
            <img src={item.src} alt={item.altText} />
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
          <i className="fa fa-angle-left"/>
          <span className="sr-only">Previous</span>
        </div>
        <div className="carousel-control-next" role="button" tabIndex="1" onClick={this.next}>
          <i className="fa fa-angle-right"/>
          <span className="sr-only">Next</span>
        </div>
      </Carousel>
      <CarouselIndicators className='' items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
    </div>
  }
}

export default CustomCarousel;
