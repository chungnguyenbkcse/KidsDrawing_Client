import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardContest from "../../common/components/TopCardContest";
import { IContestStudentState, IStateType } from "../../store/models/root.interface";


function ContestList(): JSX.Element {
    const contest_student: IContestStudentState = useSelector((state: IStateType) => state.contest_students);


    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = contest_student.contest_new.map((ele, index) => {
        return (
            <TopCardContest 
              name={ele.name} 
              id={ele.id}
              icon="book" 
              student_id={ele.student_id}
              student_name={ele.student_name}
              class="primary" 
              url_image={ele.image_url}
              art_age_name={ele.art_age_name}
              total_register_contest={ele.total_register_contest}
              art_type_name={ele.art_type_name}
              max_participant={ele.max_participant}
              registration_time={ele.registration_time}
              start_time={ele.start_time}
              description={ele.description}
              end_time={ele.end_time}
            />
        );
    });


    return (
        <Fragment>
          {teacherRegisterQuantificationElements}
        </Fragment>
    );
}

export default ContestList;
