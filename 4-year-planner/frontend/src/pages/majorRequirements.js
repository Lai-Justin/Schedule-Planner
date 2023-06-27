import React, { useEffect, useState} from "react";
import MajorSelectionBar from "../components/MajorSelectionBar/MajorSelectionBar";
import majorsReq from '../data/MajorReq.json'
import { Flex, Text, Box, UnorderedList, ListItem } from "@chakra-ui/react"


const MajorRequirements = () => {
    
    const [major, setMajor] = useState(0);
    

    const selectionValueChange =(e) => {
        setMajor(e.value);
    }
    
    
    return (
        <Flex direction="column" align="center" justify="center" padding={"1rem"} margin={"1rem"}>
        <Text fontSize={"2.5rem"} fontWeight={"bold"} align={"center"} padding={"0rem"}> Major Requirements</Text>
        <Text fontSize={"1.2rem"}  align={"center"} color={"#9f9fa1"} >Choose a major to see its Requirements</Text>
        <MajorSelectionBar handleChange={selectionValueChange}/>
            <Flex direction="column"  background={"#ebf2fc"} padding={"1rem"} margin={"1rem"} borderRadius="8" width={"100%"}>
                <Text fontWeight={"bold"} fontSize={"1.5rem"} align="center">{majorsReq[major].name}</Text>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Flex direction={"row"} padding={"1rem"}>
                    <Box flex={1}>
                    <Flex direction={"column"} padding={"1rem"}>
                        <Text fontWeight={"bold"} fontSize={"1.2rem"} >Preparation for the Major</Text>
                        <UnorderedList>
                            {majorsReq[major].prep.map((item) => {
                                return <ListItem>{item}</ListItem>
                            })}
                        </UnorderedList>
                    </Flex>
                    </Box>
                    <Box flex={1}>
                    <Flex direction={"column"} padding={"1rem"}>
                        <Text fontWeight={"bold"} fontSize={"1.2rem"} >Upper Division Major</Text>
                        <UnorderedList>
                            {majorsReq[major].upperDiv.map((item) => {
                                return <ListItem>{item}</ListItem>
                            })}
                        </UnorderedList>
                    </Flex>
                    </Box>
                </Flex>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Flex direction={"column"} padding={"1rem"}>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">Electives</Text>
                <Text fontSize={"1.1rem"}  align={"center"} color={"#7a7a7a"}>{majorsReq[major].textPreElectives}</Text>
                <Flex direction={"row"} padding={"1rem"} justify="center">
                <Box flex={1}>
                <UnorderedList>
                {majorsReq[major].electives.map((item,index) => {
                    if(index < 16)
                        return <ListItem>{item}</ListItem>
                })}
                </UnorderedList>
                </Box>
                <Box flex={1}>
                <UnorderedList>
                {majorsReq[major].electives.map((item,index) => {
                    if((16 <= index) & (index < 32))
                        return <ListItem>{item}</ListItem>
                })}
                </UnorderedList>
                </Box>
                <Box flex={1}>
                <UnorderedList>
                {majorsReq[major].electives.map((item,index) => {
                    if(32<=index)
                        return <ListItem>{item}</ListItem>
                })}
                </UnorderedList>
                </Box>
                </Flex>
                </Flex>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">Other Requirements</Text>
                <Text fontSize={"1.1rem"}  align={"center"} color={"#7a7a7a"}>{majorsReq[major].otherReq}</Text>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">University Requirements</Text>
                <Text fontSize={"1rem"}  align={"center"}>UC Entry Level Writing Requirement: English Composition. Must be fulfilled within three quarters of matriculation</Text>
                <br></br>
                <Text fontSize={"1rem"}  align={"center"}>American History and Institutions – (one 4-unit course, may be counted as G.E. if selected from approved list)</Text>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">General Education</Text>
                <Flex direction={"row"} padding={"1rem"} justify="center">
                <Box flex={1}>
                <Flex direction={"column"} padding={"1rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.1rem"} >General Subject Areas</Text>
                    <UnorderedList>
                        <ListItem>Area A: English Reading & Comprehension – (2 courses required)</ListItem>
                        <ListItem>Area D: Social Science (2 courses minimum)</ListItem>
                        <ListItem>Area E: Culture and Thought (2 courses minimum)</ListItem>
                        <ListItem>Area F: The Arts (1 course minimum)</ListItem>
                        <ListItem>Area G: Literature (1 course minimum)</ListItem>
                    </UnorderedList>
                </Flex>
                </Box>
                <Box flex={1}>
                <Flex direction={"column"} padding={"1rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.1rem"} >Special Subject Areas</Text>
                    <UnorderedList>
                        <ListItem>Ethnicity (1 course)</ListItem>
                        <ListItem>European Traditions or World Cultures (1 course)</ListItem>
                        <ListItem>Writing (4 courses required)</ListItem>
                    </UnorderedList>
                </Flex>
                </Box>
                </Flex>
                <hr style={{border: "2px solid black", borderRadius: "5px",}}></hr>
                <Text fontWeight={"bold"} fontSize={"1.3rem"} align="center">Total Units Required for Graduation: {majorsReq[major].totalUnits}</Text>
            </Flex>
        </Flex>
    );
};


export default MajorRequirements;
