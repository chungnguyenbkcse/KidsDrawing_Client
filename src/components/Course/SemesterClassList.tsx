import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardSemesterClassTeacher from "../../common/components/TopCardSemesterClassTeacher";
import { ISemesterClassTeacherState, IStateType } from "../../store/models/root.interface";


function SemesterClassList(): JSX.Element {
  const semester_class_teacher: ISemesterClassTeacherState = useSelector((state: IStateType) => state.semester_class_teachers);


  const teacherRegisterQuantificationElements: (JSX.Element | null)[] = semester_class_teacher.semester_class_teachers.filter((ele, idx) => ele.status === "Registed").map((ele, index) => {
    return (
      <TopCardSemesterClassTeacher
        id = {ele.id}
        name={ele.name}
        course_name={ele.course_name}
        icon="book"
        class="primary"
        status={ele.status}
        semester_id={ele.semester_id}
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


  const teacherRegisterQuantificationElements1: (JSX.Element | null)[] = semester_class_teacher.semester_class_teachers.filter((ele, idx) => ele.status === "Not register").map((ele, index) => {
    return (
      <TopCardSemesterClassTeacher
        id = {ele.id}
        name={ele.name}
        course_name={ele.course_name}
        icon="book"
        class="primary"
        status={ele.status}
        semester_id={ele.semester_id}
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
      {teacherRegisterQuantificationElements1}
    </Fragment>
  );
}

export default SemesterClassList;
