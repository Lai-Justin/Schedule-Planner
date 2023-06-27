import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import {Text} from "@chakra-ui/react"
import MajorNames from '../../data/MajorNames.json'
import PlannerTemplate from '../../data/PlannerTemplates.json'
import  Select  from 'react-select'

function SelectionBar({handleChange}){

    const searchList = [...MajorNames, { "label":"Blank", "value":"5"}];
    
    return (<div>
       <Select
         options={searchList}
         onChange={handleChange}
         placeholder="Select a Major"
         openMenuOnClick={false}
       />
      </div>)
   
  }

const CourseModal = ({
    show,
    handleChange,
    userName
}) => {

    const [planner, setPlanner] = useState([5]);

    const SelectionChange = (e) => {
        setPlanner(e.value);
    }
  
  return (
    <Modal
      show={show}
      backdrop="static"
      centered
      size="lg"
    >

      <Modal.Header>
        <Modal.Title>
        <Text fontSize={"2rem"}>4 Year Schedule Planner</Text>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Text fontSize={"1rem"}>{userName} welcome to the 4 Year Schedule Planner!<br />
        To start please select your major below to load the correct template:</Text>
        <br />
        <SelectionBar handleChange={SelectionChange}/>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onMouseDown={() => {
            handleChange(PlannerTemplate[planner]);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
