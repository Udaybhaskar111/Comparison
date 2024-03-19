/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import styles from './CompareLevel.module.scss';
import FeildMapping from '../FeildMapping/FeildMapping';
export default function compareLevel1(){
    const [isSelected, setSelected]=useState(false)
    return(
        <div className={styles.level}>
            <h1 className={styles.level__heading}>Level 1 of Comparsion</h1>
            <div className={styles.level__intial}>
                <p className={styles.level__caption}>Comparing column lengths of DB Data and uploaded data</p>
                <button className={styles.level__button}>Intial Compare</button>
            </div>
            <div className={styles.level__container}>
                <div className={styles.left}>
                    <form>
                        <input type="checkbox" id="dataMap" onChange={()=>setSelected(!isSelected)}/>
                        <label className={styles.level__content}>Do you want to map the field of the both data sets</label>
                        <br/>
                        <button className={styles.level__button}>submit</button>
                    </form>
                    </div>
                    <FeildMapping/>
            </div>
        </div>
    )
}