import  Select  from 'react-select'
import allClasses from '../../data/all_courses.json'
import React from 'react';
import {  useState } from "react";
import CourseNames from '../../data/CourseNames.json'


const searchList = CourseNames;

export default function SearchBarCourses({handleChange}){

    const[selectedOption, setSelectedOption] = useState([]);

    // const handleChange = () => {
    //  setSelectedOption({ selectedOption })
    //  // code to make something happen after selecting an option
    // }
    
     return (<div>
        <Select
          options={searchList}
          onChange={(e)=>{
            handleChange(e)
        // this is to clear the search bar after selecting an option
          }}
          placeholder= "Search for a course to add to your schedule"
          openMenuOnClick={false}
        />
       </div>)
    
   }
