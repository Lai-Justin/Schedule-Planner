import React, { useEffect, useState } from "react";
import MajorSelectionBar from "../../components/MajorSelectionBar/MajorSelectionBar";
import majorsReq from '../../data/MajorReq.json'
import { Flex, Text, Box, UnorderedList, ListItem, color, Button } from "@chakra-ui/react"
import Select from 'react-select'


export default function GraduationRequirements({ masterList, selections, setSelections }) {

    let totalUnits = 0;
    let GEList = [
        { label: "Undecided", value: 0 },
    ];

    for (let i = 0; i <= 3; i++) {
        for (let quarter of masterList[i]) {
            for (let course of quarter) {
                if (!isNaN(course.details?.units)) {
                    totalUnits += course.details?.units;
                }
                if (!(course.title.includes("MATH") || course.title.includes("CMPSC") || course.title.includes("G.E.") || course.title.includes("Major Elective") || course.title.includes("PSTAT"))) {
                    GEList.push({ label: course.title, value: GEList.length });
                }
            }
        }
    }


    const hasLabel = (element, label) => element.label === label;

    const GESelectionValueChange = (sel, e) => {
        let temp = selections;
        temp[sel] = e.label;
        setSelections({...temp});
    }

    const [major, setMajor] = useState(0);

    const selectionValueChange = (e) => {
        setMajor(e.value);
    }

    function isCourseInSchedule(_course) {

        if (_course == "MATH 3A-B, 4A-B, 6A") {
            return (isCourseInSchedule("MATH 3A") && isCourseInSchedule("MATH 3B") && isCourseInSchedule("MATH 4A") && isCourseInSchedule("MATH 4B") && isCourseInSchedule("MATH 6A"));
        } else if (_course == "PHYS 1, 2, 3, 3L") {
            return (isCourseInSchedule("PHYS 1") && isCourseInSchedule("PHYS 2") && isCourseInSchedule("PHYS 3") && isCourseInSchedule("PHYS 3L"));
        } else if (_course == "CMPSC 111 or 140") {
            return (isCourseInSchedule("CMPSC 111") || isCourseInSchedule("CMPSC 140"));
        } else if (_course == "CMPSC 130A-B") {
            return (isCourseInSchedule("CMPSC 130A") && isCourseInSchedule("CMPSC 130B"));
        } else if (_course == "CMPSC 148 or 156 or 172") {
            return (isCourseInSchedule("CMPSC 148") || isCourseInSchedule("CMPSC 156") || isCourseInSchedule("CMPSC 172"));
        } else if (_course == "CMPSC 160 or 162") {
            return (isCourseInSchedule("CMPSC 160") || isCourseInSchedule("CMPSC 162"));
        } else if (_course == "CHEM 1A, 1B, 1C or 2A, 2B, 2C") {
            return (isCourseInSchedule("CHEM 1A") && isCourseInSchedule("CHEM 1B") && isCourseInSchedule("CHEM 1C")) || (isCourseInSchedule("CHEM 2A") && isCourseInSchedule("CHEM 2B") && isCourseInSchedule("CHEM 2C"));
        }else if (_course == "CHEM 1AL, 1BL, 1CL or 2AC, 2BC, 2CC") {
            return (isCourseInSchedule("CHEM 1AL") && isCourseInSchedule("CHEM 1BL") && isCourseInSchedule("CHEM 1CL")) || (isCourseInSchedule("CHEM 2AC") && isCourseInSchedule("CHEM 2BC") && isCourseInSchedule("CHEM 2CC"));
        } else if (_course == "CHEM 6AL-BL"){
            return (isCourseInSchedule("CHEM 6AL") && isCourseInSchedule("CHEM 6BL"));
        } else if (_course == "CHEM 109A or AH, 109B or BH"){
            return (isCourseInSchedule("CHEM 109A") || isCourseInSchedule("CHEM 109AH")) && (isCourseInSchedule("CHEM 109B") || isCourseInSchedule("CHEM 109BH"));
        } else if (_course == "MATH 3A-B, 4A or 4AI, 4B or 4BI, 6A or 6AI, 6B"){
            return (isCourseInSchedule("MATH 3A") && isCourseInSchedule("MATH 3B") && isCourseInSchedule("MATH 4A") && isCourseInSchedule("MATH 4B") && isCourseInSchedule("MATH 6A") && isCourseInSchedule("MATH 6B")) || (isCourseInSchedule("MATH 3A") && isCourseInSchedule("MATH 3B") && isCourseInSchedule("MATH 4AI") && isCourseInSchedule("MATH 4BI") && isCourseInSchedule("MATH 6AI") && isCourseInSchedule("MATH 6B"));
        } else if (_course == "CH E 110A-B"){
            return (isCourseInSchedule("CH E 110A") && isCourseInSchedule("CH E 110B"));
        } else if (_course == "CH E 120A-B-C"){
            return (isCourseInSchedule("CH E 120A") && isCourseInSchedule("CH E 120B") && isCourseInSchedule("CH E 120C"));
        } else if (_course == "CH E 132A-B-C"){
            return (isCourseInSchedule("CH E 132A") && isCourseInSchedule("CH E 132B") && isCourseInSchedule("CH E 132C"));
        } else if (_course == "CH E 140A-B"){
            return (isCourseInSchedule("CH E 140A") && isCourseInSchedule("CH E 140B"));
        } else if (_course == "CH E 180A-B"){
            return (isCourseInSchedule("CH E 180A") && isCourseInSchedule("CH E 180B"));
        } else if (_course == "CH E 184A-B"){
            return (isCourseInSchedule("CH E 184A") && isCourseInSchedule("CH E 184B"));
        } else if (_course == "CHEM 113B-C"){
            return (isCourseInSchedule("CHEM 113B") && isCourseInSchedule("CHEM 113C"));
        } else if (_course == "MATRL 101 or MATRL 100C"){
            return (isCourseInSchedule("MATRL 101") || isCourseInSchedule("MATRL 100C"));
        }

        for (let i = 0; i <= 3; i++) {
            for (let quarter of masterList[i]) {
                for (let course of quarter) {
                    if (course.title == _course) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    return (
        <Flex direction="column" align="center" justify="center" padding={"1rem"} margin={"1rem"}>
            <Text fontSize={"2.5rem"} fontWeight={"bold"} align={"center"} padding={"0rem"}> Major Requirements</Text>
            <Text fontSize={"1.2rem"} align={"center"} color={"#9f9fa1"} >Choose a major and confirm you meet all requirements to graduate</Text>
            <MajorSelectionBar handleChange={selectionValueChange} />
            <Flex direction="column" background={"#ebf2fc"} padding={"1rem"} margin={"1rem"} borderRadius="8" width={"100%"}>
                <Text fontWeight={"bold"} fontSize={"1.5rem"} align="center">{majorsReq[major].name}</Text>
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Flex direction={"row"} padding={"1rem"}>
                    <Box flex={1}>
                        <Flex direction={"column"} padding={"1rem"}>
                            <Text fontWeight={"bold"} fontSize={"1.2rem"} >Preparation for the Major</Text>
                            <UnorderedList>
                                {majorsReq[major].prep.map((item) => {
                                    return <ListItem color={(isCourseInSchedule(item)) ? "#02a10f" : "#eb071d"}>{item}</ListItem>
                                })}
                            </UnorderedList>
                        </Flex>
                    </Box>
                    <Box flex={1}>
                        <Flex direction={"column"} padding={"1rem"}>
                            <Text fontWeight={"bold"} fontSize={"1.2rem"} >Upper Division Major</Text>
                            <UnorderedList>
                                {majorsReq[major].upperDiv.map((item) => {
                                    return <ListItem color={(isCourseInSchedule(item)) ? "#02a10f" : "#eb071d"}>{item}</ListItem>
                                })}
                            </UnorderedList>
                        </Flex>
                    </Box>
                </Flex>
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Flex direction={"column"} padding={"1rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">Electives</Text>
                    <Text fontSize={"1.1rem"} align={"center"} color={"#7a7a7a"}>{majorsReq[major].textPreElectives}</Text>
                    <Flex direction={"row"} padding={"1rem"} justify="center">
                        <Box flex={1}>
                            <UnorderedList>
                                {majorsReq[major].electives.map((item, index) => {
                                    if (index < 16)
                                        return <ListItem>{item}</ListItem>
                                })}
                            </UnorderedList>
                        </Box>
                        <Box flex={1}>
                            <UnorderedList>
                                {majorsReq[major].electives.map((item, index) => {
                                    if ((16 <= index) & (index < 32))
                                        return <ListItem>{item}</ListItem>
                                })}
                            </UnorderedList>
                        </Box>
                        <Box flex={1}>
                            <UnorderedList>
                                {majorsReq[major].electives.map((item, index) => {
                                    if (32 <= index)
                                        return <ListItem>{item}</ListItem>
                                })}
                            </UnorderedList>
                        </Box>
                    </Flex>
                </Flex>
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">Other Requirements</Text>
                <Text fontSize={"1.1rem"} align={"center"} color={"#7a7a7a"}>{majorsReq[major].otherReq}</Text>
                {
                    (majorsReq[major].otherReq != "None") &&
                    <div className="scienceElectives">
                        <Select  align="center" options={GEList} onChange={(e) => {GESelectionValueChange("science1", e)}} value={selections.science1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.science1))] : GEList[0] } openMenuOnClick={false} />
                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("science2", e)}} value={selections.science2 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.science2))] : GEList[0] } openMenuOnClick={false} />
                    </div>
                }
                
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">University Requirements</Text>
                <Text fontSize={"1rem"} align={"center"}>UC Entry Level Writing Requirement: English Composition. Must be fulfilled within three quarters of matriculation</Text>
                <br></br>
                <Text fontSize={"1rem"} align={"center"}>American History and Institutions – (one 4-unit course, may be counted as G.E. if selected from approved list)</Text>
                <div className="centerSelect">
                    <Select align="center" options={GEList} onChange={(e) => {GESelectionValueChange("american", e)}} value={selections.american !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.american))] : GEList[0] } openMenuOnClick={false} />
                </div>
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">General Education</Text>
                <Flex direction={"row"} padding={"1rem"} justify="center">
                    <Box flex={1}>
                        <Flex direction={"column"} padding={"1rem"}>
                            <Text fontWeight={"bold"} fontSize={"1.1rem"} >General Subject Areas</Text>
                            <UnorderedList>
                                <ListItem>
                                    Area A: English Reading & Comprehension – (2 courses required)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaA1", e)}} value={selections.areaA1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaA1))] : GEList[0] } openMenuOnClick={false} />
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaA2", e)}} value={selections.areaA2 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaA2))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    Area D: Social Science (2 courses minimum)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaD1", e)}} value={selections.areaD1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaD1))] : GEList[0] } openMenuOnClick={false} />
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaD2", e)}} value={selections.areaD2 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaD2))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    Area E: Culture and Thought (2 courses minimum)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaE1", e)}} value={selections.areaE1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaE1))] : GEList[0] } openMenuOnClick={false} />
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaE2", e)}} value={selections.areaE2 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaE2))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    Area F: The Arts (1 course minimum)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaF1", e)}} value={selections.areaF1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaF1))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    Area G: Literature (1 course minimum)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("areaG1", e)}} value={selections.areaG1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.areaG1))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                            </UnorderedList>
                        </Flex>
                    </Box>
                    <Box flex={1}>
                        <Flex direction={"column"} padding={"1rem"}>
                            <Text fontWeight={"bold"} fontSize={"1.1rem"} >Special Subject Areas</Text>
                            <UnorderedList>
                                <ListItem>
                                    Ethnicity (1 course)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("ethnicity", e)}} value={selections.ethnicity !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.ethnicity))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    European Traditions or World Cultures (1 course)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("european", e)}} value={selections.european !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.european))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                </ListItem>
                                <ListItem>
                                    Writing (4 courses required)
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("writing1", e)}} value={selections.writing1 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.writing1))] : GEList[0] } openMenuOnClick={false} />
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("writing2", e)}} value={selections.writing2 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.writing2))] : GEList[0] } openMenuOnClick={false} />
                                    </div>
                                    <div className="GESelect">
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("writing3", e)}} value={selections.writing3 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.writing3))] : GEList[0] } openMenuOnClick={false} />
                                        <Select options={GEList} onChange={(e) => {GESelectionValueChange("writing4", e)}} value={selections.writing4 !== undefined ? GEList[GEList.findIndex(e => hasLabel(e, selections.writing4))] : GEList[0] } openMenuOnClick={false} />
                                    </div></ListItem>
                            </UnorderedList>
                        </Flex>
                    </Box>
                </Flex>
                <hr style={{ border: "2px solid black", borderRadius: "5px", }}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center" color={(totalUnits >= majorsReq[major].totalUnits) ? "#02a10f" : "#eb071d"}>Total Units Required for Graduation: {totalUnits} / {majorsReq[major].totalUnits}</Text>
            </Flex>
        </Flex>
    );
}