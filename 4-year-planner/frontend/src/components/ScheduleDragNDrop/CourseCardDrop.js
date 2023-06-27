import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Flex, Text } from '@chakra-ui/react';
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import CourseModal from "./CourseModal/CourseModal";
import courseService from "../../services/course.service";

export const CourseCardDrop = ({
    title,
    index,
    parent,
    grade,
    notes,
    id,
    details,
    cardChange,
    deleteCard,
    color,
    togglePrereqWarning

}) => {


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: {
            title,
            index,
            parent,
            grade,
            notes,
            details,
            color
        },
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const changeInfo = (newGrade, newNotes, newColor) => {
        cardChange(title, details, newGrade, newNotes, index, id, parent, newColor) //Change the card info
    }

    const deleteCardFunc = () => {
        deleteCard(index, parent) //Change the card info
    }

    const [cGrade, setGrade] = useState(grade);
    const [cNotes, setNotes] = useState(notes);
    const borderShadow = (details?.prereqsNotMet && !details?.ignorePrereqsNotMet) ? "0px 0px 5px 2px #fc2c03" : "0px 0px 5px 2px #2121213b"
    return (
        <>
            <Flex
                padding="3"
                backgroundColor={color}
                margin="2"
                borderRadius="8"
                border="2px solid gray.500"
                boxShadow={borderShadow}
                transform={style.transform}
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                flexDirection={"column"}>
                <div className="courseCard">
                    <Text fontWeight={"bold"}>{title}: {courseService.getCourseTitle(title)}</Text>

                    {
                        details && <div>
                            <Text>Units: {details.units}</Text>
                            <Text fontWeight={"bold"} color="#fc2c03">{(details.prereqsNotMet && !details.ignorePrereqsNotMet) && "Prerequisites not met!!"}
                                {(details.prereqsNotMet && !details.ignorePrereqsNotMet) && <Button variant="danger" onMouseDown={() => { console.log("WTF"); togglePrereqWarning(index, parent); }}> Ignore Warning </Button>}
                            </Text>

                        </div>
                    }


                </div>
                <Text>Grade: {grade}</Text>
                <Button onMouseDown={() => {
                    setShow(true);
                    console.log("Show: ", show);
                }}
                >Edit Course Info</Button>

            </Flex>
            <CourseModal show={show} handleClose={handleClose} courseID={title} grade={grade} notes={notes} handleChange={changeInfo} handleDelete={deleteCardFunc} color={color} details={details} togglePrereqWarning={togglePrereqWarning} index={index} parent={parent} />
        </>

    );
}