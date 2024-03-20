/* eslint-disable react/jsx-key */
import { useState } from 'react';
import styles from './FeildMapping.module.scss'
import { request } from '../../services/Axios/calls';

export default function FeildMapping(){
    const dataFeilds=["userId", "userName","userAge"];
    const dbFeilds=["Name","age","Id"]; 
    const [val,setVal]=useState(dbFeilds) 
    const [ind,setInd]=useState({})
    const [isSelected, setSelected]=useState(false)

    var feild1=0;
    var feild2=0;
    const dropOptions=(index)=>{
        feild2=index;
        setInd({...ind,[feild1]:feild2})
        console.log(val)
        const updatedDbFeilds = [...val]; // Create a copy of dbFeilds
        updatedDbFeilds[index] = dataFeilds[feild1]; // Update the value at the specified index
        setVal(updatedDbFeilds);
    }   
    const compare=async(eve)=>{
        eve.preventDefault();
        let values=Object.values(ind);
        console.log(ind)
        const res=await request('POST','http://localhost:8082/compare',values);
        console.log(res)
     }
    return(
        <div className={styles.level2}>
        <div className={styles.left}>
                    <form>
                        <input type="checkbox" id="dataMap" onChange={()=>setSelected(!isSelected)}/>
                        <label className={styles.level2__content}>Do you want to map the field of the both data sets</label>
                        <br/>
                        <button  onClick={(e)=>compare(e)} className="button">submit</button>
                    </form>
                    </div>
                    {isSelected?<div className={styles.feildMapping}>
                    <div className={styles.feilds}>   
                        {
                            dataFeilds.map((each,index)=>(
                                <div className={styles.options} draggable onDrag={()=>feild1=index}><p>{each}{index}</p></div>                        
                            ))
                        }
                    </div>
                    <div className={styles.feilds}>   
                        {
                            val.map((each,index)=>(
                                <div className={styles.options} 
                                    onDragOver={(e)=>e.preventDefault()}
                                    onDrop={()=>dropOptions(index)}>
                                    <p>{each}{index}</p>
                                </div>                        
                            ))
                        }
                    </div>
                </div>:<></>}
        </div>
    )
}