import QuarterCardDrop from "./QuarterCardDrop";
import { cookieStorageManager, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import LetterToInt from "../GPACalculator/LetterToInteger";

export default function YearLane({ masterList, yearIndex, color, yearName, cardChange, deleteCard, togglePrereqWarning }) {
    const q0ID = "Q" + (yearIndex) + "0";
    const q1ID = "Q" + (yearIndex) + "1";
    const q2ID = "Q" + (yearIndex) + "2";
    const q3ID = "Q" + (yearIndex) + "3";

    useEffect(() => {
    }, [])

    let totalUnits = 0;
    for (let i = 0; i <= yearIndex; i++){
        for (let quarter of masterList[i]){
            for (let course of quarter){
                if (!isNaN(course.details?.units)){
                    totalUnits += course.details?.units;
                }
            }
        }
    }

    let unitsCount = 0;
    let gradePoints = 0;
    let yearlyGPA = 0;
    for (let quarter of masterList[yearIndex]){
        for (let course of quarter){
            if (!isNaN(course.details?.units)){
                if (LetterToInt(course.grade) !== "NA"){
                    unitsCount += course.details?.units;
                    gradePoints += LetterToInt(course.grade) * course.details?.units;
                }
            }
        }
    }
    if (unitsCount !== 0){
        yearlyGPA = gradePoints / unitsCount;
    }
    else{
        yearlyGPA = 0;
    }


    return (
        <Flex flexDirection={"column"}
            padding="3"
            backgroundColor={color}
            margin="2"
            borderRadius="8"
            border="2px solid gray.500"
        >
            <div className="yearLaneTitleDiv">
                <Text fontWeight="bold" className="yearLaneTitle" padding={".15rem"}>{yearName}</Text>
                <Text fontWeight="bold" className="yearLaneUnits" padding={"1rem"} >Cumulative Units: {totalUnits}</Text>
                <Text fontWeight="bold" className="yearLaneGPA" padding={"1rem"} paddingRight={"2rem"}>GPA: {yearlyGPA.toFixed(2)}</Text>

            </div>
            <Flex flex="3" padding={0}>
                <QuarterCardDrop title={"Fall"} items={masterList[yearIndex][0]} quarterID={q0ID} cardChange={cardChange} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning}/>
                <QuarterCardDrop title={"Winter"} items={masterList[yearIndex][1]} quarterID={q1ID} cardChange={cardChange} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning}/>
                <QuarterCardDrop title={"Spring"} items={masterList[yearIndex][2]} quarterID={q2ID} cardChange={cardChange} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning}/>
                <QuarterCardDrop title={"Summer"} items={masterList[yearIndex][3]} quarterID={q3ID} cardChange={cardChange} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning}/>
            </Flex>
        </Flex>)
}