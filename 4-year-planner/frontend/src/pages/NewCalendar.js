import React, { useEffect, useState } from "react";
import FlexQuarterComponent from "../components/FlexQuarterComponent/FlexQuarterComponent";
import { Form } from 'react-bootstrap';
import userService from "../services/user.service";



const userData = [
  [
    {
      "id": 1,
      title: "Fall",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]

    },
    {
      "id": 2,
      title: "Winter",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    },
    {
      "id": 3,
      title: "Spring",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 }
      ]
    },
  ]
  , [
    {
      "id": 1,
      title: "Fall",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]

    },
    {
      "id": 2,
      title: "Winter",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    },
    {
      "id": 3,
      title: "Spring",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    }
  ],
  [
    {
      "id": 1,
      title: "Fall",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]

    },
    {
      "id": 2,
      title: "Winter",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    },
    {
      "id": 3,
      title: "Spring",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    },
    {
      "id": 3,
      title: "Summer",
      classes: [
        { name: "TEST", units: 4 }
      ]
    }
  ],
  [
    {
      "id": 1,
      title: "Fall",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]

    },
    {
      "id": 2,
      title: "Winter",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 }
      ]
    },
    {
      "id": 3,
      title: "Spring",
      classes: [
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
        { name: "TEST", units: 4 },
      ]
    }
  ]
]



function NewCalendar() {

    return (
    <>
      <FlexQuarterComponent />
      
    </>
  );
    }
export default NewCalendar; 