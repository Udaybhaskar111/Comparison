/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import styles from './CompareLevel.module.scss';
import FeildMapping from '../FeildMapping/FeildMapping';
import { request } from '../../services/Axios/calls';
const checkColumn=async(msg,setmsg)=>{
   const response=await request('GET','http://localhost:8082/initialcompare');
   setmsg(response.message);
    console.log(response.message,"as res")
}
export default function compareLevel1(){
    const [msg,setmsg]=useState('');
    return(
        <div className={styles.level}>
            <h1 className={styles.level__heading}>Level 1 of Comparsion</h1>
            <div >
                <div className={styles.level__intial}>
                    <p className={styles.level__caption}>Compare column lengths of DB data nad Uploaded file</p>
                    <button onClick={()=>checkColumn(msg,setmsg)} className="button">Intial Compare</button>
                </div>
                <p className='successMessage'>{msg}</p>
            </div>
                    <FeildMapping/>
            </div>
    )
}