
export default function LetterToInt(grade) {
    if(grade === "A"){
        return 4.0
    }
    else if(grade === "A+"){
        return 4.0
    }
    else if(grade === "A-"){
        return 3.7
    }
    else if(grade === "B+"){
        return 3.3
    }
    else if(grade === "B"){
        return 3.0
    }
    else if(grade === "B-"){
        return 2.7
    }
    else if(grade === "C+"){
        return 2.3
    }
    else if(grade === "C"){
        return 2.0
    }
    else if(grade === "C-"){
        return 1.7
    }
    else if(grade === "D+"){
        return 1.3
    }
    else if(grade === "D"){
        return 1.0
    }
    else if(grade === "D-"){
        return 0.7
    }
    else if(grade === "F"){
        return 0.0
    }
    else{
        return "NA"
    }
}