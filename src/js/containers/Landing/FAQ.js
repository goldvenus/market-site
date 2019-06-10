import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { Container, Row, Col } from 'reactstrap';
import 'react-accessible-accordion/dist/fancy-example.css';
import TextField from "@material-ui/core/TextField/TextField";
import Textarea from "muicss/lib/react/textarea";
import {handleError, sendEmail} from "../../core/actions/common.action";
import CustomSpinner from "../../components/common/CustomSpinner";

class FAQ extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      phone: "",
      email: "",
      question: "",
      curFAQ: 0
    };
  }
  
  handleAccordionSelect = (val) => {
    this.setState({curFAQ: val});
  };
  
  handleInputChange = (e, val) => {
    this.setState({[val]: e.target.value});
  };
  
  handleSendEmail = () => {
    let {name, phone, email, question} = this.state;
    if (!name || !email || !question) {
      handleError('Please input required information');
      return;
    }
    sendEmail({fromEmail: email, name, phone, content: question});
  };
  
  render() {
    let {curFAQ} = this.state;
    let {isSendingEmail} = this.props;
    
    return (
      <div className="FAQ">
        {isSendingEmail && <CustomSpinner/>}
        <div className="FAQ-head">
          <Container>
            <Row>
              <Col>
                {/*<Breadcrumb className="theme-text-small">*/}
                  {/*<BreadcrumbItem>Home </BreadcrumbItem>*/}
                  {/*<BreadcrumbItem active>FAQs</BreadcrumbItem>*/}
                {/*</Breadcrumb>*/}
                <h1>FAQs</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="FAQ-body">
          <Container>
            <Row>
              <Col>
                <Accordion>
                  <AccordionItem onClick={() => this.handleAccordionSelect(1)}>
                    <AccordionItemTitle>
                      <h3 style={curFAQ === 1 ? {'color': '#F82462'} : {'color': '#555555'}}>HOW TO PAY?</h3>
                      {/*<DownArrow/>*/}
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt
                        quos
                        ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores
                        non
                        iure quam minima?</p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem onClick={() => this.handleAccordionSelect(2)}>
                    <AccordionItemTitle>
                      <h3 style={curFAQ === 2 ? {'color': '#F82462'} : {'color': '#555555'}}>WHAT BRANDS OF THE EQUIPMENT ARE AVAIABLE?</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt
                        quos
                        ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores
                        non
                        iure quam minima?</p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem onClick={() => this.handleAccordionSelect(3)}>
                    <AccordionItemTitle>
                      <h3 style={curFAQ === 3 ? {'color': '#F82462'} : {'color': '#555555'}}>HOW TO EXTEND RENTED GEAR ?</h3>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, sequi at. Ipsum deserunt
                        quos
                        ipsa neque? Magni earum repellat molestiae sapiente voluptatem, laboriosam eligendi vero maiores
                        non
                        iure quam minima?</p>
                    </AccordionItemBody>
                  </AccordionItem>
                </Accordion>
                <Row className="faq-form-wrapper">
                  <Row>
                    <h2>Didn't find the answer to your question?</h2>
                  </Row>
                  <Row>
                    <h6>FILL OUT THE FORM AND ASK US!</h6>
                  </Row>
                  <Row>
                    <Col lg='9' md='24'>
                      <TextField
                        id="text-field-2"
                        className='custom-beautiful-textfield'
                        label="Name"
                        type="text"
                        onChange={e => this.handleInputChange(e, 'name')}
                      />
                      <TextField
                        id="text-field-2"
                        className='custom-beautiful-textfield'
                        label="Phone"
                        type="text"
                        onChange={e => this.handleInputChange(e, 'phone')}
                      />
                      <TextField
                        id="text-field-1"
                        className='custom-beautiful-textfield'
                        label='Email'
                        type="text"
                        onChange={e => this.handleInputChange(e, 'email')}
                      />
                    </Col>
                    <Col lg='15' md='24'>
                      <Textarea
                        className="category_description_ta"
                        label='Message'
                        type="text"
                        floatingLabel={true}
                        onChange={(e) => {
                          this.setState({ question: e.target.value })
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <button className='theme-btn theme-btn-primary' onClick={this.handleSendEmail}>Send</button>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isSendingEmail: state.common.isSendingEmail
});

export default connect(mapStateToProps, null)(FAQ);
