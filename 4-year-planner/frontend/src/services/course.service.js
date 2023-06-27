import { all } from "axios";
import allCourses from "../data/all_courses.json"


class CourseService{

    getCourse(courseCode){
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid];
          }
        }
    }
    getCourseUnits(courseCode)
    {
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid].unitsFixed;
          }
        }
    }

    getCourseTitle(courseCode){
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid].title;
          }
        }
    }

    getCourseDescription(courseCode){
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid].description;
          }
        }
    }

    getCourseCollege(courseCode){
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid].college;
          }
        }
    }

    getCourseLevel(courseCode){
        // Set up the binary search parameters
        let low = 0;
        let high = allCourses.length - 1;
      
        // Perform the binary search
        while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          if (allCourses[mid].courseId < courseCode) {
            low = mid + 1;
          } else if (allCourses[mid].courseId > courseCode) {
            high = mid - 1;
          } else {
            // Found the course, return the unitsFixed value
            return allCourses[mid].objLevelCode;
          }
        }
    }

    getCoursePrereqs(courseCode){
      // Set up the binary search parameters
      let low = 0;
      let high = allCourses.length - 1;
    
      // Perform the binary search
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (allCourses[mid].courseId < courseCode) {
          low = mid + 1;
        } else if (allCourses[mid].courseId > courseCode) {
          high = mid - 1;
        } else {
          // Found the course, return the unitsFixed value
          if(allCourses[mid].preReqs == null){
            return ["None"]
          }
          return allCourses[mid].preReqs;
        }
      }
  }

  getCourseGPA(courseCode){
    let low = 0;
      let high = allCourses.length - 1;
    
      // Perform the binary search
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (allCourses[mid].courseId < courseCode) {
          low = mid + 1;
        } else if (allCourses[mid].courseId > courseCode) {
          high = mid - 1;
        } else {
          // Found the course, return the unitsFixed value
          if(allCourses[mid].avgGrade == null){
            return ["Not Available"]
          }
          return allCourses[mid].avgGrade;
        }
      }
  }


}   



export default new CourseService();

