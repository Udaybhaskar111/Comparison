/* eslint-disable react/jsx-key */
import { useState } from 'react';
import Style from './FeildMapping.module.scss'
export default function FeildMapping(){
    const dataFeilds=["userId", "userName","userAge"];
    const dbFeilds=["Name","age","Id"]; 


    const [val,setVal]=useState(dbFeilds) 
    const [ind,setInd]=useState({})
    var feild1=0;
    var feild2=0;
    const dropOptions=(index)=>{
        feild2=index;
        setInd({...ind,[feild2]:feild1})
        console.log(val)
        const updatedDbFeilds = [...val]; // Create a copy of dbFeilds
        updatedDbFeilds[index] = dataFeilds[feild1]; // Update the value at the specified index
        setVal(updatedDbFeilds);
    }   
    return(
        <div className={Style.feildMapping}>
            <div className={Style.feilds}>   
                {
                    dataFeilds.map((each,index)=>(
                        <div className={Style.options} draggable onDrag={()=>feild1=index}><p>{each}</p></div>                        
                    ))
                }
            </div>
            <div className={Style.feilds}>   
                {
                    val.map((each,index)=>(
                        <div className={Style.options} 
                            onDragOver={(e)=>e.preventDefault()}
                            onDrop={()=>dropOptions(index)}>
                            <p>{each}</p>
                        </div>                        
                    ))
                }
            </div>
        </div>
    )
}