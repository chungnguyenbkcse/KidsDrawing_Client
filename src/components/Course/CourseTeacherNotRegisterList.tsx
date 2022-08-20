import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardCourse from "../../common/components/TopCardCourse";
import { ICourseTeacherState, IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function CourseTeacherNotRegisterList(props: teacherRegisterQuantificationListProps): JSX.Element {
  const course_teachers: ICourseTeacherState = useSelector((state: IStateType) => state.course_teachers);
  const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  let quantifications: number[] = [];
  teacherRegisterQuantifications.approveds.map((ele, index) => {
    return quantifications.push(ele.course_id);
  })

    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = course_teachers.not_register_courses.map((ele, index) => {
        if (!ele || !quantifications.includes(ele.course_id)) { return null; }
        return (
            <TopCardCourse 
              name={ele.name} 
              semester_class_id = {ele.semester_course_id}
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

export default CourseTeacherNotRegisterList;
