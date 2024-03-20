import {useState} from 'react';
import {useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import styles from './Form.module.scss';
import fileImage from '../../assets/upload.svg'
import {request} from '../../services/Axios/calls.js';
export const Form=()=>{
    const form=useForm({mode:"onBlur"});
    const fileform=useForm({mode:'onBlur'})
    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: formStateForm1 ,reset:resetForm} = form;
    const { errors: errorsForm1 } = formStateForm1;
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: formStateForm2 ,reset:resetDbFile} = fileform;
    const { errors: errorsForm2 } = formStateForm2;
    const [isSubmit,setSubmit]=useState(false)
    const [file,setFile]=useState();
    const [fileStatus,setfileStatus]=useState(false);
    const setDatabaseData=async(formdata)=>{
      try{
      let data = {
        DBname: formdata.DatabaseName,
        user_id: formdata.UserName,
        passwd: formdata.Password,
        DBtype: formdata.DatabaseType,
        TabelName: formdata.TableName,
        port:formdata.port,
      };
      resetForm();
      fetch("http://192.168.220.119:8082/createConnection", {
      method: "POST",
      body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },

  })
    .then((response) => response.json())
    .then((json) => console.log(json,"kks"));
    setSubmit(true)

  //     fetch("http://localhost:8082/createConnection", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json,"kks"));
  
    // const data=await request("GET",'http://localhost:8082/get');
    // console.log(data,"success")
    const data1=await request("POST","http://localhost:8082/createConnection",data)
    console.log(data1,"post")
  }
    catch{
      console.log("error")
    }
}
const upload = async(file) => {
  const formData = new FormData();
  formData.append("file", file);
 
  const data1=await request("POST","http://localhost:8082/file",formData)
  console.log(data1,"post")
  if(data1){
    setfileStatus((prev)=>!prev)
  }

};
const setFormData=async(data)=>{
  let filename = data.Filename[0].name;
  console.log(filename,"as file name")
  
  upload(data.Filename[0]);
  resetDbFile();
  upload(data.Filename[0])
}
const showfile=(file,setFile)=>{
  let a=document.getElementById('fileInput');
  setFile(a.files[0].name)
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
            <button type='submit' className="button">Submit</button>
           {isSubmit? <p className="successMessage">Form Submitted Successfully</p>:<></>}
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
        <input type="file" id="fileInput" className={styles.fileInput} {...registerForm2("Filename",{required:"*File is Mandatory Field"})} onInput={()=>showfile(file,setFile)}/>
        <p>{file}</p>
      <p className={styles.errorMessage}>{errorsForm2.Filename?.message}</p> 
        <button type="submit" className="button">Upload File</button>
        {fileStatus? <p className="successMessage">file Submitted Successfully</p>:<></>}
      </form>
    </div>
  )
}
