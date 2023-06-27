import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CourseService from "../../../services/course.service";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react"
import { CirclePicker } from "react-color";

const CourseModal = ({
  show,
  handleClose,
  courseID,
  grade,
  notes,
  handleChange,
  handleDelete,
  color,
  details,
  togglePrereqWarning,
  index,
  parent
}) => {

  const [mGrade, setGrade] = useState(grade);
  const [mNotes, setNotes] = useState(notes);
  const [mColor, setColor] = useState(color);

  useEffect(() => {
    setGrade(grade);
    setNotes(notes);
    setColor(color);
  }, [show])

  const colorList = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", '#edeceb']

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      size="lg"
      className="special_modal"
      contentClassName="special_modal_content"
      style={{
        special_modal_content: {
          background: mColor,
          color: "black"
        }
      }}
    >

      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            {courseID}: {CourseService.getCourseTitle(courseID)}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Description:</b> {CourseService.getCourseDescription(courseID)}</p>
        <b>Units:</b> {CourseService.getCourseUnits(courseID)}
        <br />
        <b>College:</b> {CourseService.getCourseCollege(courseID)}
        <br />
        <b>Prerequisites:</b> {
          CourseService.getCoursePrereqs(courseID).map((prereq) => {
            return prereq + " "
          }
          )}
        {
          (details?.prereqsNotMet && details?.ignorePrereqsNotMet) && <Text fontWeight={"bold"} color="#fc2c03">Prerequisites have not been met! &nbsp;
               <Button variant="danger" onMouseDown={() => { togglePrereqWarning(index, parent); }}>Warn me</Button>
          </Text>
        }
        <br />
        <br />
        <b>Average GPA for Course: </b>{CourseService.getCourseGPA(courseID)}
        <br />
        <br />

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label><b>Grade</b></Form.Label>
            <Flex direction={"row"}>
              <Box flex={2} paddingRight={"1rem"}>
                <Form.Select aria-label='Selector' value={mGrade} onChange={(e) => { setGrade(e.target.value) }}>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="D-">D-</option>
                  <option value="F">F</option>
                  <option value="P">P</option>
                  <option value="NP">NP</option>
                  <option value="NA">NA</option>
                </Form.Select>
              </Box>
              <Box flex={1} align={"center"} >
                <CirclePicker colors={colorList} onChange={(color) => {
                  if (color.hex == "#edeceb")
                    setColor("#ffffff");
                  else
                    setColor(color.hex);
                }}></CirclePicker>
              </Box>
            </Flex>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><b>Class Notes</b></Form.Label>
            <Form.Control as="textarea" rows={3} value={mNotes} onChange={(e)=>{setNotes(e.target.value)}}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onMouseDown={() => {
          console.log("Delete");
          handleClose();
          handleDelete();
        }}>Delete</Button>
        <Button
          variant="primary"
          onMouseDown={() => {
            handleChange(mGrade, mNotes, mColor);
            handleClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
