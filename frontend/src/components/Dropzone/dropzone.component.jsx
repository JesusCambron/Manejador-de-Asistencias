import React from 'react';
import {useDropzone} from 'react-dropzone';


import './dropzone.styles.scss'

function Accept(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: '.csv'
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container-dropzone">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <i class="fas fa-file-upload"></i>
        <p>Arrastra y suelta tus archivos aquí</p>
        <em>(Solo archivos .csv)</em>
      </div>
      <aside>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </section>
  );
}

<Accept />

export default Accept