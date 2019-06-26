import React, {Component} from 'react';
import {Container} from "reactstrap";
import marked from 'marked';

class RentalTermsComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      markdown: ''
    }
  }
  componentDidMount() {
    const readmePath = require("./PaymentPolicy.md");
    
    fetch(readmePath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          markdown: marked(text)
        })
      })
  }
  
  render() {
    return (
      <Container>
        <article style={{paddingTop: '80px'}} dangerouslySetInnerHTML={{__html: this.state.markdown}}/>
      </Container>
    )
  }
}

export default RentalTermsComponent;