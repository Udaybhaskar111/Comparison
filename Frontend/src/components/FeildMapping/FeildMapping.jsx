/* eslint-disable react/jsx-key */
import { useState } from 'react';
import styles from './FeildMapping.module.scss'
import MisMatches from '../MisMatches/misMatches';
export default function FeildMapping(){
    const dataFeilds=["userId", "userName","userAge"];
    const dbFeilds=["Name","age","Id"]; 
    const emptyFeilds=["Drop Here","Drop Here","Drop Here"] 

    const [val,setVal]=useState(emptyFeilds) 
    const [ind,setInd]=useState({})
    const [isSelected, setSelected]=useState(false)

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
    // const compare=async(eve)=>{
    //     eve.preventDefault();
    //     let values=Object.values(ind);
    //     const res=await request('POST','http://localhost:8082/compare',values);
    //     console.log(res)
    //  }
    return(
        <>
        <h1 className='heading'>Level 2 of Comparsion</h1>
        <div className={styles.level2}>
            
        <div className={styles.left}>
                    <form>
                        <input type="checkbox" id="dataMap" onChange={()=>setSelected(!isSelected)}/>
                        <label className={styles.level2__content}>Do you want to map the field of the both data sets</label>
                        <br/>
                        <button className="button" >Compare the Data</button>
                    </form>
                    </div>
                    {isSelected?<div className={styles.feildMapping}>
                    <div className={styles.feilds}>   
                        {
                            dataFeilds.map((each,index)=>(
                                <div className={styles.options} draggable onDrag={()=>feild1=index}><p>{each}</p></div>                        
                            ))
                        }
                    </div>
                    <div className={styles.dropped}>  
                            <div className={styles.feilds}>
                                {
                                    val.map((each,index)=>(
                                        <div className={styles.options} 
                                            onDragOver={(e)=>e.preventDefault()}
                                            onDrop={()=>dropOptions(index)}>
                                            <p>{each}</p>
                                        </div>                        
                                    ))
                                }
                        </div>
                        <div className={styles.feilds}>
                            {
                                dbFeilds.map((each,index)=>(
                                    <div className={styles.options}>
                                        <p>{each}</p>
                                    </div>                        
                                ))
                            }
                        </div>
                    </div>

                </div>:<></>}
        </div>
        <MisMatches/>
        </>
    )
}

