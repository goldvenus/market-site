import {NotificationManager} from "react-notifications";

const handleInfo = (info) => {
  NotificationManager.info(info, 'INFO', 5000);
};

const handleError = (error) => {
  NotificationManager.error(String(error), 'ERROR', 10000);
};

const readFileData = (event) => {
  return new Promise((resolve, reject) => {
    let input = event.target;
    
    if (input && input.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      };
      
      fileReader.onerror = (e) => reject('error');
      fileReader.readAsDataURL(input.files[0]);
    }
  });
};

export {
  handleError, readFileData, handleInfo
}