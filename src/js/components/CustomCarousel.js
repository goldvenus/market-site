import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import ItemsCarousel from "react-items-carousel";

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
  
  renderCarousel = (img_arr) => {
    // make img objects for bottom carousel
    const children = img_arr.map((item, i) => (
      <div key={i} className='carousel-image-container' onClick={() => this.setState({activeIndex: i})}>
        <img src={item.src} alt=""/>
      </div>
    ));
    
    return (<ItemsCarousel
      // Placeholder configurations
      enablePlaceholder
      numberOfPlaceholderItems={img_arr.length}
      minimumPlaceholderTime={1000}
      placeholderItem={<div style={{height: 200, background: '#900'}}>Placeholder</div>}
      
      // Carousel configurations
      numberOfCards={4}
      gutter={12}
      showSlither={true}
      firstAndLastGutter={true}
      freeScrolling={false}
      
      // Active item configurations
      requestToChangeActive={(val) => this.setState({activeIndex: val})}
      activeItemIndex={this.state.activeIndex}
      activePosition={'center'}
      
      chevronWidth={24}
      rightChevron={'>'}
      leftChevron={'<'}
      outsideChevron={false}
    >
      {children}
    </ItemsCarousel>);
  };

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
    let {items} = this.props;

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
      <CarouselIndicators className='d-lg-none' items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
  
      <div className="carousel-bottom-container">
        {this.renderCarousel(items)}
      </div>
    </div>
  }
}

export default CustomCarousel;
