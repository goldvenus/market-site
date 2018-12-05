import React, { Component } from 'react';
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Dropdown, Form, DropdownToggle, DropdownMenu,
  DropdownItem, Input, Label, Carousel, CarouselItem, CarouselControl,
  CarouselIndicators, CarouselCaption, InputGroup, InputGroupAddon } from 'reactstrap';
import CustomInput from './CustomInput';

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class AddGear extends Component {
  constructor() {
    super();

    this.progressSteps = ["Info", "Photo", "Address", "Price"];
    this.state = {
      progressStep: 3,
      dropdownOpen: false,
      activeIndex: 0
    }

    this.toggle = this.toggle.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderProgress() {
    const { progressStep } = this.state;
    let isDone = true;
    return this.progressSteps.map((i, index) => (
      <div key={i} className={ isDone ? 'add-gear-progress-item active': 'add-gear-progress-item' }>
        {
          function() {
            if(index === progressStep) {
              isDone = false;
              return <i className='fa fa-dot-circle-o'aria-hidden="true"></i>
            } else if(isDone) {
              return <i className='fa fa-check-circle'aria-hidden="true"></i>
            } else {
              return <i className='fa fa-circle-o'aria-hidden="true"></i>
            }
          }()
        }

        <div className="theme-text-small">{i}</div>
      </div>
    ));
  }

  renderInfo() {
    return (
      <Form className="theme-form add-gear-info">
        <div className="flex-row">
          <div>
            <Dropdown className="theme-form-field" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Camera</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="theme-form-field">
              <CustomInput placeholder='Brand' type="text"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Model' type="text"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Description' type="text"/>
            </div>
          </div>
          <div className="info-right-container">
            <div className="type-tabs">
              <input id="new" type="radio" value="new"/>
              <label htmlFor="new">New</label>
              <input id="like-new" type="radio" value="like_new"/>
              <label htmlFor="like-new">Like New</label>
              <input id="slightly-worn" type="radio" value="slightly_worn"/>
              <label htmlFor="slightly-worn">Slightly Worn</label>
              <input id="worn" type="radio" value="worn"/>
              <label htmlFor="worn">Worn</label>
            </div>
            <div className="theme-form-field">
              <Input type="checkbox" id="is-kit"/>
              <Label for="is-kit">Is this a Kit?</Label>
            </div>
            <div>
              <div className="theme-text-small">Accessories</div>
              <button className="theme-btn theme-btn-secondery"><span className="fa fa-plus" /> Add</button>
            </div>
          </div>
        </div>
      </Form>);
  }

  renderPhotos() {
    return (<div className="add-gear-photos">
      <Label><b>Drag and Drop</b></Label>
      <Label className="theme-text-small">Upload only png, jpg or jpeg</Label>
      <div>
        <button className="theme-btn theme-btn-primary">Upload</button>
      </div>
    </div>)
  }

  renderAddress() {
    return (
      <Form className="theme-form add-gear-address">
        <div className="theme-form-field">
          <CustomInput placeholder='City' type="text"/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Region' type="text"/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Address' type="text"/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Postal Code' type="text"/>
        </div>
      </Form>
    )
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  renderPrice() {
    const {activeIndex} = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return <div className="add-gear-price">
      <div>
        <div className="theme-text-small text-gray">Cameras</div>
        <h4>Panasonic Lumix GH4</h4>

        <div className="price-type-tabs">
          <input id="new" type="radio" value="new"/>
          <label htmlFor="new">New</label>
          <input id="like-new" type="radio" value="like_new"/>
          <label htmlFor="like-new">Like New</label>
          <input id="slightly-worn" type="radio" value="slightly_worn"/>
          <label htmlFor="slightly-worn">Slightly Worn</label>
          <input id="worn" type="radio" value="worn"/>
          <label htmlFor="worn">Worn</label>
        </div>

        <div className="gear-carousel">
          <Carousel
             activeIndex={activeIndex}
             next={this.next}
             previous={this.previous}
           >
           <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
           {slides}
           <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
           <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      </div>
      <div className="gear-middle-container">
        <div className="flex-row gear-accessories-address">
          <div>
            <div className="theme-text-small text-gray">Accessories</div>
            <div className="">Tripod</div>
            <div className="">Anti-glare lenses</div>
          </div>
          <div>
            <div className="theme-text-small text-gray">Address</div>
            <div className="">Area</div>
            <div className="">City</div>
          </div>
        </div>
        <div>
          <div className="theme-text-small text-gray">Description</div>
          <p>
            Lumix is Panasonic brand of digital cameras, ranging from pocket point-and-shoot models to digital SLRs.
          </p>
        </div>
      </div>
      <div className="gear-right-container">
        <div>Replacement Value</div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input placeholder="Amount" type="text" />
        </InputGroup>
        <div>Price per day</div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input placeholder="Amount" type="text" />
        </InputGroup>

        <div className="buttons-container">
          <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span className="fa fa-angle-left" /></button>
          <button className="theme-btn theme-btn-primary" >Submit <span className="fa fa-angle-right" /></button>
        </div>
      </div>
    </div>
  }

  renderContent() {
    const {progressStep} = this.state;
    switch (progressStep) {
      case 0:
        return this.renderInfo();
        break;
      case 1:
        return this.renderPhotos();
        break;
      case 2:
        return this.renderAddress();
        break;
      case 3:
        return this.renderPrice();
        break;
      default:

    }
  }
  previousStep() {
    this.setState({
      progressStep: --this.state.progressStep
    });
  }

  nextStep() {
    this.setState({
      progressStep: ++this.state.progressStep
    });
  }

  render() {
    return (
      <div className="add-gear">
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem active>Add Gear</BreadcrumbItem>
        </Breadcrumb>
        <h3>Add Gear</h3>
        <div  className="add-gear-progress">
          {
            this.renderProgress()
          }
        </div>
        {
          this.renderContent()
        }

        {
          this.state.progressStep < 3 ? (
          <div>
            <div className="flex-row buttons-container">
              {
                this.state.progressStep !== 0 ?
                <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span className="fa fa-angle-left" /> Back</button> :
                null
              }

              <button className="theme-btn theme-btn-primary" onClick={this.nextStep.bind(this)}>Continue <span className="fa fa-angle-right" /></button>
            </div>
          </div>) : null
        }
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(AddGear);
