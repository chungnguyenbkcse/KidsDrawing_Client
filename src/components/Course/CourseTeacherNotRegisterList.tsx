import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardCourseTeacherNew from "../../common/components/TopCardCourseTeacher";
import { ICourseTeacherNewState, IStateType } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export type teacherRegisterQuantificationListProps = {
    onSelect?: (teacherRegisterQuantification: ITeacherRegisterQuantification) => void;
    children?: React.ReactNode;
};

function CourseTeacherNotRegisterList(props: teacherRegisterQuantificationListProps): JSX.Element {
  const course_teachers: ICourseTeacherNewState = useSelector((state: IStateType) => state.course_teacher_new);



    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = course_teachers.courses.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <TopCardCourseTeacherNew 
              name={ele.name} 
              id={ele.id}
              image_url={ele.image_url}
              art_age_name={ele.art_age_name}
              art_level_name={ele.art_level_name}
              art_type_name={ele.art_type_name}
              max_participant={ele.max_participant}
              num_of_section={ele.num_of_section}
              description={ele.description}
              price={ele.price}
              is_enabled={ele.is_enabled}
              art_age_id={ele.art_age_id}
              art_level_id={ele.art_level_id}
              art_type_id={ele.art_type_id}
              total={ele.total}
              total_register={ele.total_registed}
              create_time={ele.create_time}
              update_time={ele.update_time}
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
