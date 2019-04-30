import React from 'react'
import './pretty-checkbox.min.css';
export class BeCheckBox extends React.Component{
    constructor(props){
        super(props);
    }
    render () {
        const {value_text} = this.props;
        return (
            <div className="pretty p-icon p-rotate">
                <input type="checkbox"/>
                <div className="state p-success">
                    <i className="icon mdi mdi-check"></i>
                    <label>{value_text}</label>
                </div>
            </div>
        );

    }
}
