import React, {Component} from "react";
import Spinner from 'react-spinner-material';

class CustomSpinner extends Component {
  render() {
    return (
      <div className="beaut_spinner">
        <Spinner size={70} spinnerColor={"rgb(248, 44, 98)"} spinnerWidth={4} visible={true}/>
      </div>
    );
  }
}

export default CustomSpinner;
