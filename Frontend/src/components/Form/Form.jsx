import React from 'react';
import {useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import styles from './Form.module.scss';
import { Button } from '@mui/material';
import fileImage from '../../assets/upload.svg'
export const Form=()=>{
    const form=useForm({mode:"onBlur"});
    const fileform=useForm({mode:'onBlur'})
    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: formStateForm1 } = form;
    const { errors: errorsForm1 } = formStateForm1;
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: formStateForm2 } = fileform;
    const { errors: errorsForm2 } = formStateForm2;
    const setDatabaseData=(formdata)=>{
      let data = {
        DBname: formdata.DatabaseName,
        user_id: formdata.UserName,
        passwd: formdata.Password,
        DBtype: formdata.DatabaseType,
        TabelName: formdata.TableName,
        port:formdata.port,
      };
      fetch("http://localhost:8082/createConnection", {
      method: "POST",
      body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json,"kks"));
}
const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:8082/file", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
};
const setFormData=(data)=>{
  let filename = data.Filename[0].name;
  console.log(filename,"as file name")
  // upload(file.files[0]);
  upload(data.Filename[0])
}
    
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmitForm1(setDatabaseData)}>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="DatabaseType" variant="standard" className={styles.inputField} {...registerForm1("DatabaseType",{required:"*databasetype is Mandatory Field"})}/>
            <p className={styles.errorMessage}>{errorsForm1.DatabaseType?.message}</p>
            </div>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="DatabaseName" variant="standard" className={styles.inputField}  {...registerForm1("DatabaseName",{required:"*databasename is Mandatory Field"})}/>
            <p className={styles.errorMessage}>{errorsForm1.DatabaseName?.message}</p>
            </div>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="port" variant="standard" className={styles.inputField}  {...registerForm1("port",{required:"*portnumber is Mandatory Field"})}/>
            <p className={styles.errorMessage}>{errorsForm1.port?.message}</p>
            </div>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="UserName" variant="standard" className={styles.inputField} {...registerForm1("UserName",{required:"*username is Mandatory Field"})}/>            <p className={styles.errorMessage}>{errorsForm1.UserName?.message}</p>
            </div>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="Password" variant="standard" className={styles.inputField} {...registerForm1("Password",{required:"*password is Mandatory Field"})}/>
            <p className={styles.errorMessage}>{errorsForm1.Password?.message}</p>
            </div>
            <div className={styles.inputFieldConatiner}>
            <TextField id="standard-basic" label="TableName" variant="standard" className={styles.inputField} {...registerForm1("TableName",{required:"*tablename is Mandatory Field"})}/>
            <p className={styles.errorMessage}>{errorsForm1.TableName?.message}</p>
            </div>
            <Button type='submit' variant="contained">Submit</Button>
        </form>
        <form onSubmit={handleSubmitForm2(setFormData)}>
        <label htmlFor="fileInput" className={styles.fileStyles}>
          <div>
            <img src={fileImage} alt="upload" />
          </div>
          <p>
            <span>Select</span> a file Formats: CSV & XLSX.
          </p>
        </label>
        <input type="file" id="fileInput" className={styles.fileInput} {...registerForm2("Filename",{required:"*File is Mandatory Field"})}/>
        <p>file</p>
      <p className={styles.errorMessage}>{errorsForm2.Filename?.message}</p> 

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
