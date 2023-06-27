import React, { useEffect, useState } from 'react'
import ClassColumn from '../ClassColumn/ClassColumn';
import styles from './FlexQuarterComponent.module.css';
import userService from '../../services/user.service';


export function getData() {
  let arr = [ {idx:1}, {idx:2} ]
    return JSON.stringify(arr);
}

// const userData = [
//   {
//     "id": 1,
//     title: "First Year",
//     "quarters": [
//       {
//         "id": 1,
//         title: "Fall",
//         classes: [
//           { name: "CMPSC 8", units: 4 },
//           { name: "MATH 3A", units: 4 },
//           { name: "WRIT 1", units: 5 },
//           { name: "PHIL 3", units: 4 },
//         ]

//       },
//       {
//         "id": 2,
//         title: "Winter",
//         classes: [
//           { name: "CMPSC 16", units: 4 },
//           { name: "MATH 3B", units: 4 },
//           { name: "WRIT 2", units: 5 },
//           { name: "PHIL 1", units: 4 },
//         ]
//       },
//       {
//         "id": 3,
//         title: "Spring",
//         classes: [
//           { name: "CMPSC 24", units: 4 },
//           { name: "MATH 4A", units: 4 },
//           { name: "PHYS 2", units: 4 },
//           { name: "EARTH 7", units: 4 },
//         ]
//       }
//     ]
//   },
//   {
//     "id": 2,
//     title: "Second Year",
//     "quarters": [
//       {
//         "id": 1,
//         title: "Fall",
//         classes: [
//           { name: "CMPSC 32", units: 4 },
//           { name: "CMPSC 40", units: 5 },
//           { name: "PSTAT 120A", units: 4 },
//           { name: "PHYS 3", units: 3 },
//           { name: "PHYS 3L", units: 1 },
//         ]

//       },
//       {
//         "id": 2,
//         title: "Winter",
//         classes: [
//           { name: "CMPSC 64", units: 4 },
//           { name: "MATH 4B", units: 4 },
//           { name: "WRIT 50", units: 4 },
//           { name: "CMPSC 130A", units: 4 },
//         ]
//       },
//       {
//         "id": 3,
//         title: "Spring",
//         classes: [
//           { name: "CMPSC 138", units: 4 },
//           { name: "MATH 6A", units: 4 },
//           { name: "PSY 108", units: 4 },
//           { name: "PHIL 20C", units: 4 },
//         ]
//       }
//     ]
//   },
//   {
//     "id": 3,
//     title: "Third Year",
//     "quarters": [
//       {
//         "id": 1,
//         title: "Fall",
//         classes: [
//           { name: "CMPSC 148", units: 4 },
//           { name: "CMPSC 148", units: 4 },
//           { name: "CMPSC 148", units: 4 },
//           { name: "CMPSC 148", units: 4 },
//         ]

//       },
//       {
//         "id": 2,
//         title: "Winter",
//         classes: [
//           { name: "CMPSC 156", units: 4 },
//           { name: "CMPSC 156", units: 4 },
//           { name: "CMPSC 156", units: 4 },
//           { name: "CMPSC 156", units: 4 },
//         ]
//       },
//       {
//         "id": 3,
//         title: "Spring",
//         classes: [
//           { name: "CMPSC 160", units: 4 },
//           { name: "CMPSC 160", units: 4 },
//           { name: "CMPSC 160", units: 4 },
//           { name: "CMPSC 160", units: 4 },
//         ]
//       }
//     ]
//   },
//   {
//     "id": 4,
//     title: "Fourth Year",
//     "quarters": [
//       {
//         "id": 1,
//         title: "Fall",
//         classes: [
//           { name: "CMPSC 185", units: 4 },
//           { name: "CMPSC 185", units: 4 },
//           { name: "CMPSC 185", units: 4 },
//           { name: "CMPSC 185", units: 4 },
//         ]

//       },
//       {
//         "id": 2,
//         title: "Winter",
//         classes: [
//           { name: "CMPSC 165A", units: 4 },
//           { name: "CMPSC 165A", units: 4 },
//           { name: "CMPSC 165A", units: 4 },
//           { name: "CMPSC 165A", units: 4 },
//         ]
//       },
//       {
//         "id": 3,
//         title: "Spring",
//         classes: [
//           { name: "CMPSC 165B", units: 4 },
//           { name: "CMPSC 165B", units: 4 },
//           { name: "CMPSC 165B", units: 4 },
//           { name: "CMPSC 165B", units: 4 },
//         ]
//       }
//     ]
//   },
// ];



const FlexQuarterComponent = ({ yearsLeft, userData }) => {
  const [masterPlanner, setMasterPlanner] = useState([
    [[],[],[],[]]
    ,[[],[],[],[]]
    ,[[],[],[],[]]
    ,[[],[],[],[]]
    ,[[],[],[],[]]]);
    const years = masterPlanner;
    const loadPlanner = async () => {
      const res = await userService.getPlanner()
      console.log("this data gets shown but why", res.data);
      if (res.status == 200) {
          console.log("User Planner:", res.data)
          setMasterPlanner([...res.data.years]);
          
      }
      else {
      }
  };
  
  useEffect(() => {
    loadPlanner();
    console.log("masterPlanner", masterPlanner)
    console.log("years", years)
  }, []);
  
  const yearTitles = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year"];
  const quarterTitles = ["Fall", "Winter", "Spring", "Summer"];
  return (
    <>
      {[...years].map((year,index) =>
        <div className={styles.year}>
          <div><b>{yearTitles[index]}</b></div>
          <div className={styles.quarter}>
            {(year).map((quarter, indexq) => <ClassColumn title={quarterTitles[indexq]} classes={quarter} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default FlexQuarterComponent;