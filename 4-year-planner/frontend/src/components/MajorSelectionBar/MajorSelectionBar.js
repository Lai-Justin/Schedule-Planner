import  Select  from 'react-select'
import allClasses from '../../data/all_courses.json'
import React from 'react';
import {  useState } from "react";
import MajorNames from '../../data/MajorNames.json'


const searchList = MajorNames;

export default function MajorSelectionBar({handleChange}){


    
     return (<div>
        <Select
          options={searchList}
          onChange={handleChange}
          defaultValue={searchList[0]}
          openMenuOnClick={false}
        />
       </div>)
    
   }