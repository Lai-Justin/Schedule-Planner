
export default function LetterToInt(grade) {
    if(grade.toLowerCase() === "a"){
        return 4.0
    }
    else if(grade.toLowerCase() === "a+"){
        return 4.0
    }
    else if(grade.toLowerCase() === "a-"){
        return 3.7
    }
    else if(grade.toLowerCase() === "b+"){
        return 3.3
    }
    else if(grade.toLowerCase() === "b"){
        return 3.0
    }
    else if(grade.toLowerCase() === "b-"){
        return 2.7
    }
    else if(grade.toLowerCase() === "c+"){
        return 2.3
    }
    else if(grade.toLowerCase() === "c"){
        return 2.0
    }
    else if(grade.toLowerCase() === "c-"){
        return 1.7
    }
    else if(grade.toLowerCase() === "d+"){
        return 1.3
    }
    else if(grade.toLowerCase() === "d"){
        return 1.0
    }
    else if(grade.toLowerCase() === "d-"){
        return 0.7
    }
    else if(grade.toLowerCase() === "f"){
        return 0.0
    }
    else{
        return "NA"
    }
}