/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import styles from './CompareLevel.module.scss';
import FeildMapping from '../FeildMapping/FeildMapping';
export default function compareLevel1(){
    const [isSelected, setSelected]=useState(false)
    return(
        <div className={styles.level}>
            <h1 className="heading">Level 1 of Comparsion</h1>
            <div className={styles.level__intial}>
                <p className={styles.level__caption}>Comparing column lengths of DB Data and uploaded data</p>
                <button className="button">Intial Compare</button>
            </div>
                    <FeildMapping/>
        </div>
    )
}