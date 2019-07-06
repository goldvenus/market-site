import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

function CustomDropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      props.onHandleLoad(reader.result);
    };
    
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }, []);
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png, video/mp4, video/webm, audio/webm',
    onDrop
  });
  
  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  return (
    <section className="upload-photo-inner-container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <h3>{props.heading}</h3>
        <p>{props.description}</p>
      </div>
      <aside>
        <ul>
          {acceptedFilesItems}
        </ul>
      </aside>
    </section>
  );
}

export default CustomDropzone;