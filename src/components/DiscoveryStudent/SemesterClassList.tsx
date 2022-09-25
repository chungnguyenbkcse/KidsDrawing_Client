import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardCourse from "../../common/components/TopCardCourse";
import { ICourseTeacherState, IStateType } from "../../store/models/root.interface";


function SemesterClassList(): JSX.Element {
  const course_teachers: ICourseTeacherState = useSelector((state: IStateType) => state.course_teachers);


    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = course_teachers.register_successfull_courses.map((ele, index) => {
        return (
            <TopCardCourse 
              name={ele.name} 
              semester_class_id = {ele.semester_class_id}
              course_name={ele.course_name} 
              icon="book" 
              class="primary" 
              url_image={ele.image_url}
              art_age_name={ele.art_age_name}
              art_level_name={ele.art_level_name}
              art_type_name={ele.art_type_name}
              max_participant={ele.max_participant}
              num_of_section={ele.num_of_section}
              semester_name={ele.semester_name}
              description={ele.description}
              course_id={ele.course_id}
              schedule={ele.schedule}
              price={ele.price}
              registration_deadline={ele.registration_deadline}
            />
        );
    });


    return (
        <Fragment>
          {teacherRegisterQuantificationElements}
        </Fragment>
    );
}

export default SemesterClassList;
