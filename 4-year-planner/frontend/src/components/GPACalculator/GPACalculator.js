import { useEffect, useState } from 'react';
import LetterToInt from "./LetterToInteger"
import userService from '../../services/user.service';
import CourseService from "../../services/course.service";

export default function GPACalculator({masterList}) {

  useEffect(() => {
  }, [])
  console.log(masterList)

  let unitsCount = 0;
  let gradePoints = 0;
  let yearlyGPA = 0;
  for (let i = 0; i <= 4; i++){
      for (let quarter of masterList[i]){
          for (let course of quarter){
              if (!isNaN(course.details?.units)){
                  if (LetterToInt(course.grade) !== "NA"){
                      unitsCount += course.details?.units;
                      gradePoints += LetterToInt(course.grade) * course.details?.units;
                  }
              }
          }
      }
  }
  console.log("hi")
  console.log(unitsCount)
  if (unitsCount !== 0){
    yearlyGPA = gradePoints / unitsCount;
  }
  else{
      yearlyGPA = 0;
  }


  return (
    <div>
      <p>Cumulative Grade Point Average: {yearlyGPA.toFixed(2)}</p> 
    </div>
  );


}


