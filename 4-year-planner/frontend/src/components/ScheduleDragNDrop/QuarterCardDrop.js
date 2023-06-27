import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { CourseCardDrop } from "./CourseCardDrop";
import styles from "./ScheduleComp.module.css"
import { useEffect } from "react";

export default function QuarterCardDrop({ title, items, quarterID, cardChange, deleteCard, togglePrereqWarning }) {
  const { setNodeRef } = useDroppable({
    id: quarterID,
  });

  let units = 0;
  for (let course of items) {
    units += course.details?.units;
  }
  
  if(units > 1 && units < 12 && title !== "Summer"){
    alert = <Text fontWeight={"bold"} color="#fc2c03">{"Not Full-Time"}</Text>
  }
  else{
    alert = <Text></Text>
  }
  
  

  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="12rem">
      <div className="quarterCardDrop">
        <Text fontWeight="bold">{title}</Text>
        {alert}
        <Text className= {styles.unitQuarterCardDrop}>
          Units: {units}
          </Text>       

      </div>
      <Flex
        ref={setNodeRef}
        className = {styles.QuarterCardDropper} //The courses dropping in a flex-direction column into the quarter
      >
        {items.map(({ title: cardTitle, notes: cardNotes, grade: cardGrade, id:cardID, details: details, color:color}, key) => (
          <CourseCardDrop title={cardTitle} key={key} index={key} parent={quarterID} details={details} notes={cardNotes} grade={cardGrade} id={cardID} cardChange={cardChange} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} color={color}/>
        ))}
      </Flex>
    </Flex>
  );
}