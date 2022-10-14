import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardSemesterClassStudent from "../../common/components/TopCardSemesterClassStudent";
import { ISemesterClassStudentState, IStateType } from "../../store/models/root.interface";


function SemesterClassList(): JSX.Element {
  const semester_class_student: ISemesterClassStudentState = useSelector((state: IStateType) => state.semester_class_student);


  const teacherRegisterQuantificationElements: (JSX.Element | null)[] = semester_class_student.payed.map((ele, index) => {
    return (
      <TopCardSemesterClassStudent
        name={ele.name}
        id={ele.id}
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


  const teacherRegisterQuantificationElements1: (JSX.Element | null)[] = semester_class_student.not_payed.map((ele, index) => {
    return (
      <TopCardSemesterClassStudent
        name={ele.name}
        id={ele.id}
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


  const teacherRegisterQuantificationElements2: (JSX.Element | null)[] = semester_class_student.not_payed_now.map((ele, index) => {
    return (
      <TopCardSemesterClassStudent
        name={ele.name}
        id={ele.id}
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
      {teacherRegisterQuantificationElements2}
    </Fragment>
  );
}

export default SemesterClassList;
