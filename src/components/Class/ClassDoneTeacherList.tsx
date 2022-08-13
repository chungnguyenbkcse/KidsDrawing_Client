import React from "react";
import { useSelector } from "react-redux";
import TopCardClass from "../../common/components/TopCardClass";
import { IClassTeacher } from "../../store/models/class_teacher.interface";
import { IClassTeacherState, IStateType } from "../../store/models/root.interface";

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassTeacher) => void;
    children?: React.ReactNode;
};

function ClassDoneList(props: classTeacherListProps): JSX.Element {
  const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);

    const classTeacherElements: (JSX.Element | null)[] = class_teachers.class_done.map((ele, index) => {
        if (!ele) { return null; }
        return (<tr className={`table-row`} key={`semester_course_${index}`}>
            <TopCardClass 
              name={ele.name} 
              icon="book" 
              class="primary" 
              total_student={ele.total_student}
              security_code={ele.security_code}
              semester_name={ele.semester_name}
              course_name={ele.course_name}
              schedule={ele.schedule}
              num_of_section={ele.num_of_section}
            />
        </tr>
        );
    });


    return (
        <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
          </tr>
        </thead>
        <tbody>
          {classTeacherElements}
        </tbody>
      </table>
    </div>
    );
}

export default ClassDoneList;
