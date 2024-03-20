import './App.css';
import {Form} from './components/Form/Form.jsx'
import CompareLevel1 from './components/Compare/CompareLevel.jsx';
// import { createContext, useState } from 'react';
import Header from './components/Header/header.jsx';
function App() {
  // const fileContext = createContext();
  // const submitContext=createContext();
  // const [fileStatus,setfileStatus]=useState(false);
  // const [isSubmit,setSubmit]=useState(false)
  return (
    <>
    {/* <fileContext.Provider value={{fileStatus,setfileStatus}}>
    <submitContext.Provider value={{isSubmit,setSubmit}}> */}
      <Header/>
      <Form />
      <CompareLevel1/>
      {/* </submitContext.Provider>
      </fileContext.Provider> */}

    </>
  )
}
export default App
