import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { getDateStr } from "../../../components/common/Functions"
import { Inline } from '@zendeskgarden/react-loaders'

class PeriodDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busy: false
        };
    }

    handleDelete = async () => {
        this.setState({busy: true});
        await this.props.onDelete();
        this.setState({busy: false});
    };

    handleClose = (e) => {
        if (this.state.busy)
            e.preventDefault();
        else
            this.props.onClose();
    };

    render() {
        let dlg_heading = 'Delete Period';
        let { gear_info, onClose, onDelete } = this.props;
        return (
            <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal"}}>
                <div className='period-cart-header'>
                    {dlg_heading}
                </div>
                <div className='period-cart-body-1'>
                    <div className='about-period-container row'>
                        <span className='period-carted-product-name'>{gear_info.brand} {gear_info.categoryName}</span>
                        <span className='period-carted-product-name'>{getDateStr(new Date(gear_info.startDate))} - {getDateStr(new Date(gear_info.endDate))}</span>
                    </div>
                    <div className='delete-period-button-container row'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={(e) => this.handleClose(e)} disabled={this.state.busy ? 'disabled' : ''}
                        >CANCEL</button>
                        <div className='cart-button-space'></div>
                        <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handleDelete}
                            disabled={this.state.busy ? 'disabled' : ''}
                        >
                            {
                                this.state.busy ? <Inline size={64} color={"#fff"} /> : 'DELETE'
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
};

export default PeriodDeleteModal;