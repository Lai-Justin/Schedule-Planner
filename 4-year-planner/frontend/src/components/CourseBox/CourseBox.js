import React from 'react'
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './CourseBox.module.css';


//don't forget to uncomment the stuff below and include props in title
export default function CourseBox({units,courseName,courseNum,departmentCode,preReqs}) {
    units = 5
    courseName = "Problem Solving with Computers II"
    departmentCode = "CMPSC"
    courseNum = "24"
    preReqs = ["CMPSC 16","MATH 3B/4B"]
    
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Header className={styles.headerBox} >
        <div>
          {`${departmentCode} ${courseNum}`}
        </div>
        <div className = {styles.unitsCourseBox}>
          {`Units: ${units}`}
        </div>
        </Card.Header>
      <Card.Body>
        <Card.Title>{courseName} </Card.Title>
        <Card.Text>
          Pre Requisties: {preReqs}
        </Card.Text>
      </Card.Body>
    </Card>

  )
}
