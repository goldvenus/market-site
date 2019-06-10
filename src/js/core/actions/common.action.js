import React from "react";
import { toast } from 'react-toastify';
import constants from "../types";
import {post} from "../api";
import store from '../../store';

const dispatch = store.dispatch;

const toastBody = ({type, info}) => (
  <div className='toast-body'>
    <div className='toast-icon'>
      <span><i className={`fa ${type === 'INFO' ? 'fa-info' : 'fa fa-times'}`}/></span>
    </div>
    <div className='toast-content-wrapper'>
      <div className='toast-heading'>{type}</div>
      <div className='toast-content'>{info}</div>
    </div>
  </div>
);

const handleInfo = (info) => {
  toast.info(toastBody({type: 'INFO', info}), {containerId: 'A', position: toast.POSITION.BOTTOM_RIGHT, className: 'toast-info', autoClose: 10000});
};

const handleError = (info) => {
  toast.error(toastBody({type: 'ERROR', info}), {containerId: 'B', position: toast.POSITION.BOTTOM_RIGHT, className: 'toast-error', autoClose: 10000});
};

const readFileData = (event) => {
  return new Promise((resolve, reject) => {
    // let input = event.target;
    
    // if (input && input.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      };
      
      fileReader.onerror = (e) => reject('error');
      fileReader.readAsDataURL(event);
    // }
  });
};

const sendEmail = async ({fromEmail, name, phone, content}) => {
  dispatch({
    type: constants.SEND_EMAIL_REQUEST
  });
  
  let res = await post('sendEmail', {fromEmail, name, phone, content});
  if (res && res.data && res.data.status === 'success') {
    dispatch({
      type: constants.SEND_EMAIL_SUCCESS,
    });
    handleInfo('Email was sent successfully');
  } else {
    dispatch({
      type: constants.SEND_EMAIL_FAILED,
    });
    handleError('Failed to send email');
  }
};

export {
  handleError, readFileData, handleInfo, sendEmail
}