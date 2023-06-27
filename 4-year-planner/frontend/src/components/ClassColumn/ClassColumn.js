import React, { useEffect } from 'react'

import styles from '../FlexQuarterComponent/FlexQuarterComponent.module.css';

export default function ClassColumn( {title, classes}) {
  
  let quarterUnits = 0;
  classes.map((course) => quarterUnits += course.details.units * 1)
  useEffect(() => { console.log("title:", title)
   console.log("classes:", classes)
},[])
  return (
    <div className={styles.quarterContainer}>
      <div className={styles.quarterContainer}>
        <div className={styles.row}>
          <div><b>{title}</b></div>
          <div className={styles.quarter}>
            <div className={`${styles.column} ${styles.units}`}>
              <div>Units</div>
              {classes.map((course) => <div>{course.details.units}</div>)}
            </div>
            <div className={styles.column}>
              <div><b>Courses</b></div>
              {classes.map((course) => <div>{course.title}</div>)}
            </div>
          </div>
          <div className={styles.filler}></div>
        </div>
      </div>
      <div className={styles.totalUnits}>
        <div><b>Total Units: {quarterUnits}</b></div>
      </div>
    </div>
  )
}