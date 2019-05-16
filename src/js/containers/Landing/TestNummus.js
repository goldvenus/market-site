import React, { Component } from 'react';
import axios from "axios";
import {Col, Row} from "reactstrap";


class nummus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curCustomer: {
                Username: "",
                Email: "",
                FirstName: "",
                LastName: ""
            }
        };

        this.config = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': ''
            }
        };

        this.credentials = {
            email: "sindri@ketchupcreative.com",
            password: "x8dAhTbBP49KerQ#$",
            hmacChargeKey: "75750b2a-1136-41ef-a323-6a7a022e37a2",
            apiPassword: "eb009d42-9c87-4946-8cb7-891a71fb74e1",
            publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApQnGp86xQehNCuykMUbqmRHNxzEzG710itUWSiR/1p6c1WAhnNj7b1Eo+e1uuSvYzetTwHXD3nKk0B/BaSp/LnJET3Fj3EocapEmm8qBbGbA4C++u+Ixxg5hSINOnyuViE4bo6II+G+o1XguJuJlS9ccW56ahOXq5nfTc3biYQVL6oI8EL9sRR6x/t/wYBNg46MC8FQjqeARnve2YRF3rRJtiDTLuOtasCot0flpbvZ+qjffNdZPCJBCifcuqTfSYcoeYGvkuh2oFndWb/f+6DN86hpSkwMnUzt8GfvNHmD/qK1++H9MHmfntTMgCX8QFAjZ0zc+DUcOF7pDziiVzQIDAQAB",
        };

        this.getNummusToken();
    }

    componentDidMount() {
        //postscribe('#nummus-container', '<script language="javascript" src="https://api.nummuspay.com/Content/js/v1/nummuspay.js"></script>');
    }

    getNummusToken = async () => {
        let data = {
            username: this.credentials.email,
            password: this.credentials.password
        };
        let ret = await axios.post("http://api.nummuspay.com/v2/Token", data, this.config).then((res) => {
            return res;
        }).catch(err => {
            console.log(err);
            return false;
        });

        this.config.headers.Authorization = ret.data ? "Bearer " + ret.data : "";
    };

    getCustomerByID = async (customerId) => {
        let res = await axios.get("http://api.nummuspay.com/v2/Customers/"+customerId, this.config).then((res) => {
            return res;
        }).catch((err) => {
            return false;
        });
        this.setState({curCustomer: res});
    };

    createCustomer = async () => {
        let data = {
            "Email": this.state.curCustomer.Email,
            "ProjectSubdomain": "https://creativemarket.nummuspay.com",
            "FirstName": this.state.curCustomer.FirstName,
            "LastName": this.state.curCustomer.LastName,
            "Phone": "1234567890",
            "ShippingAddress1": "1700-1712 Cadiz St",
            "ShippingCountry": "US",
            "ShippingState": "TX",
            "ShippingCity": "Dallas",
            "ShippingZip": "167 77",
            "UseSameAsBilling": true,
            "BillingAddress1": "1700-1712 Cadiz St",
            "BillingCountry": "US",
            "BillingState": "TX",
            "BillingCity": "Dallas",
            "BillingZip": "75201",
        };

        let res = await axios.post("http://api.nummuspay.com/v2/Customers", data, this.config).then((res) => {
            return res;
        }).catch(err => {
            return err;
        });
        console.log(res);
        this.setState({curCustomer: res.data});
    };

    updateCustomer = async () => {
        // let data = {
        //     "Token": this.state.curCustomer.token,
        //     "FirstName": this.state.curCustomer.FirstName,
        //     "BillingAddress1": "DDDDD",
        //     "BillingCountry": "KKKKK"
        // };
        // let res = await axios.post("http://api.nummuspay.com/v2/Customers", data, this.config).then((res) => {
        //     return res;
        // }).catch(err => {
        //     return err;
        // });
        // this.setState({curCustomer: res});
    };

    render() {
        const { curCustomer } = this.state;
        console.log(curCustomer);
        return (
            <Row className="container">
                <Col sm="12">
                    <div className="form-group">
                        <span>Email</span>
                        <input type="text" value={curCustomer.Email} onChange={(e) => this.setState({curCustomer:{...curCustomer, Email: e.target.value}})}/>
                    </div>
                    <div className="form-group">
                        <span>Username</span>
                        <input type="text" value={curCustomer.Username}  onChange={(e) => this.setState({curCustomer:{...curCustomer, Username: e.target.value}})}/>
                    </div>
                    <span>FirstName</span>
                    <input type="text" value={curCustomer.FirstName} onChange={(e) => this.setState({curCustomer:{...curCustomer, FirstName: e.target.value}})}/>
                    <span>LastName</span>
                    <input type="text" value={curCustomer.LastName} onChange={(e) => this.setState({curCustomer:{...curCustomer, LastName: e.target.value}})}/>
                    <button className="theme-btn-primary theme-btn" onClick={this.createCustomer}>Add Customer</button>
                    <button className="theme-btn-secondary theme-btn" onClick={this.updateCustomer}>Update Customer</button>
                </Col>
                <Col sm="12">
                    <h1>1 {curCustomer.Email}</h1>
                    <h2>2 {curCustomer.Username}</h2>
                    <h3>3 {curCustomer.FirstName}</h3>
                    <h4>4 {curCustomer.LastName}</h4>
                </Col>
            </Row>
        )
    }
}

export default nummus;