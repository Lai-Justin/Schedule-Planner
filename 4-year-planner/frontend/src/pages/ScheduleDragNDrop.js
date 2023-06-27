import { DndContext, closestCorners } from "@dnd-kit/core";
import QuarterCardDrop from "../components/ScheduleDragNDrop/QuarterCardDrop";
import { Flex, Text, Button, Input, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import userService from "../services/user.service";
import SearchBar from "../components/ScheduleDragNDrop/SearchBarCourses";
import allCourses from "../data/all_courses.json";
import YearLane from "../components/ScheduleDragNDrop/YearLane";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import GPACalculator from "../components/GPACalculator/GPACalculator";
import GraduationRequirements from "../components/ScheduleDragNDrop/GraduationRequirements";

export default function ScheduleDragNDrop() {

    const [userPlanner, setUserPlanner] = useState([])
    const [userSelections, setUserSelections] = useState({})

    const [masterSchedule, setMasterSchedule] = useState([
        [[], [], [], []]
        , [[], [], [], []]
        , [[], [], [], []]
        , [[], [], [], []]
        , [[], [], [], []]]); //each Schedule has 5 years, each year has 4 quarters each quarter is a list of courses, the master list is passed to the year lanes along with the year number equivalent to the index of the year in the master list

    const [savedShow, setSavedShow] = useState(false);

    useEffect(() => {
        loadPlanner();
    }, []);

    const generateCourseId = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' making virtually impossible to have duplicate ids
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }

    const addNewCard = (title, details, grade = "NA", notes = "", color = "#ffffff") => {
        let id = generateCourseId();
        console.log("Adding new card:", title, details);
        console.log(color)
        setMasterSchedule((prev) => {
            let copy = JSON.parse(JSON.stringify(prev))
            copy[0][3] = [...prev[0][3], { title, details, grade, notes, id, color }]
            console.log("Master Schedule:", copy)
            return copy
        })


    };


    const savePlanner = async () => {
        let userData = {
            years: [...masterSchedule],
            selections: userSelections
        };

        console.log("Data: ", userData);
        userService.setPlanner(userData);
        setSavedShow(true);
    }

    const loadPlanner = async () => {
        const res = await userService.getPlanner()
        if (res.status == 200) {
            setUserPlanner(res.data);
            console.log("User Planner:", res.data)
            setMasterSchedule([...res.data.years]);
            if (res.data.selections !== undefined){
                setUserSelections(res.data.selections);
            }
        }
    };

    useEffect(() => {
        console.log("Masterschedule");
        console.log(masterSchedule);

    }, [masterSchedule])

    const handleDrop = (e) => {
        const title = e.active.data.current?.title ?? "";
        const details = e.active.data.current?.details ?? {};
        const grade = e.active.data.current?.grade ?? "";
        const notes = e.active.data.current?.notes ?? "";
        const index = e.active.data.current?.index ?? 0;
        const id = e.active.data.current?.id ?? generateCourseId();
        const parent = e.active.data.current?.parent ?? "Q14";
        const container = e.over?.id ?? parent;
        const color = e.active.data.current?.color ?? "#ffffff";
        // console.log(container)
        // console.log(title)
        // console.log(index)
        // console.log(parent)
        // console.log(grade)
        // console.log(notes)
        // console.log(id)

        if (container === parent) {
            return
        }

        let CY = parseInt(container.slice(1, 2))

        let CQ = parseInt(container.slice(2, 3))

        let PY = parseInt(parent.slice(1, 2))

        let PQ = parseInt(parent.slice(2, 3))


        let MSCopy = JSON.parse(JSON.stringify(masterSchedule))
        MSCopy[CY][CQ] = [...MSCopy[CY][CQ], { title, details, grade, notes, id, color }]  // Add to new location
        console.log("Master Schedule:", MSCopy)
        MSCopy[PY][PQ] = [...MSCopy[PY][PQ].slice(0, index), ...MSCopy[PY][PQ].slice(index + 1)] //Remove from old location


        //Check whether there are courses added that don't have their prerequisits met
        let coursesTaken = [];
        for (let year of MSCopy) {
            for (let quarter of year) {
                for (let course of quarter) {
                    if (!course.details) {
                        course.details = {}
                    }
                    if (course.title == "CMPSC 24") {
                        console.log("This", course.details)
                    }
                    course.details.prereqsNotMet = false;
                    if (course.details.prereqs) {
                        for (let prereq of course.details.prereqs) {
                            if (!coursesTaken.includes(prereq)) {
                                course.details.prereqsNotMet = true;
                            }
                        }
                    }

                    coursesTaken.push(course.title);
                }
            }
        }

        setMasterSchedule(MSCopy);
    };

    const deleteCard = (index, parent) => {
        let PY = parseInt(parent.slice(1, 2))

        let PQ = parseInt(parent.slice(2, 3))

        let MSCopy = JSON.parse(JSON.stringify(masterSchedule))
        MSCopy[PY][PQ] = [...MSCopy[PY][PQ].slice(0, index), ...MSCopy[PY][PQ].slice(index + 1)] //Remove from old location
        setMasterSchedule(MSCopy);
    }

    const togglePrereqWarning = (index, parent) => {
        let PY = parseInt(parent.slice(1, 2));
        let PQ = parseInt(parent.slice(2, 3));

        let MSCopy = JSON.parse(JSON.stringify(masterSchedule));
        MSCopy[PY][PQ][index].details.ignorePrereqsNotMet = !MSCopy[PY][PQ][index].details.ignorePrereqsNotMet;

        if (MSCopy[PY][PQ][index].details.ignorePrereqsNotMet === null) {
            MSCopy[PY][PQ][index].details.ignorePrereqsNotMet = true;
        }

        console.log("Details of course: ", masterSchedule[PY][PQ][index].details);

        setMasterSchedule(MSCopy);
    }

    const cardUpdate = (title, details, grade, notes, index, id, parent, color) => {

        const container = parent;


        let CY = parseInt(container.slice(1, 2))

        let CQ = parseInt(container.slice(2, 3))

        let PY = parseInt(parent.slice(1, 2))

        let PQ = parseInt(parent.slice(2, 3))


        let MSCopy = JSON.parse(JSON.stringify(masterSchedule))
        MSCopy[PY][PQ] = [...MSCopy[PY][PQ].slice(0, index), ...MSCopy[PY][PQ].slice(index + 1)] //Remove from old location
        MSCopy[CY][CQ] = [...MSCopy[CY][CQ], { title, details, grade, notes, id, color }]  // Add to new location



        //Check whether there are courses added that don't have their prerequisits met
        let coursesTaken = [];
        for (let year of MSCopy) {
            for (let quarter of year) {
                for (let course of quarter) {
                    if (!course.details) {
                        course.details = {}
                    }
                    if (course.title == "CMPSC 24") {
                        console.log("This", course.details)
                    }
                    course.details.prereqsNotMet = false;
                    if (course.details.prereqs) {
                        for (let prereq of course.details.prereqs) {
                            if (!coursesTaken.includes(prereq)) {
                                course.details.prereqsNotMet = true;
                            }
                        }
                    }

                    coursesTaken.push(course.title);
                }
            }
        }

        setMasterSchedule(MSCopy);
    };

    const selectionValueChange = (e) => {
        console.log(e["value"])
        console.log(parseInt(e["value"]))
        console.log(allCourses[parseInt(e["value"])]["courseId"])
        addNewCard(allCourses[parseInt(e["value"])]["courseId"], {
            units: allCourses[parseInt(e["value"])]["unitsFixed"],
            prereqs: allCourses[parseInt(e["value"])]["preReqs"]
        })

    }

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDrop}>
            <Flex flexDirection={"column"} padding={"1rem"}>
                <Alert show={savedShow} variant="success" onClose={() => setSavedShow(false)} dismissible>Planner Saved!</Alert>
                <Text fontSize={"2.5rem"} fontWeight={"bold"} align={"center"} padding={"0rem"}>Schedule Planner</Text>
                <Text fontSize={"1.2rem"} align={"center"} color={"#9f9fa1"} >Drag and drop courses to move them between quarters</Text>
                <Flex flexDirection={"row"} padding={"1rem"}>
                    <Box flex='2'>
                        <SearchBar handleChange={selectionValueChange}></SearchBar>
                    </Box>
                    <Box flex='1' fontWeight={"bold"} align={"center"}>
                        <GPACalculator masterList={masterSchedule}></GPACalculator>
                    </Box>
                    <Box flex='1' >
                        <ButtonGroup spacing={4} margin={4} >
                            <Button
                                flex="1"
                                marginX="3"
                                bgColor="#3470fa"
                                color="white"
                                padding={5}
                                borderRadius={7}
                                width={"20rem"}
                                onClick={() => {
                                    loadPlanner()
                                }}
                            >Load Schedule</Button>
                            <Button
                                flex="1"
                                marginX="3"
                                bgColor="#3470fa"
                                color="white"
                                padding={5}
                                borderRadius={7}
                                onClick={() => {
                                    savePlanner()
                                }}
                            >Save Schedule</Button>
                            {/* <button onClick={() => {userService.logoutAndRouteToStart();}}>Test</button> */}
                        </ButtonGroup>
                    </Box>
                </Flex>
                <YearLane color={"#ebf2fc"} masterList={masterSchedule} yearIndex={0} yearName={"First Year"} cardChange={cardUpdate} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} />
                <YearLane color={"#d0d9e0"} masterList={masterSchedule} yearIndex={1} yearName={"Second Year"} cardChange={cardUpdate} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} />
                <YearLane color={"#9bb3ca"} masterList={masterSchedule} yearIndex={2} yearName={"Third Year"} cardChange={cardUpdate} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} />
                <YearLane color={"#7394b9"} masterList={masterSchedule} yearIndex={3} yearName={"Fourth Year"} cardChange={cardUpdate} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} />
                <YearLane color={"#638aeb"} masterList={masterSchedule} yearIndex={4} yearName={"Fifth Year"} cardChange={cardUpdate} deleteCard={deleteCard} togglePrereqWarning={togglePrereqWarning} />
                <GraduationRequirements masterList={masterSchedule} selections={userSelections} setSelections={setUserSelections} />
            </Flex>


        </DndContext>
    );
};