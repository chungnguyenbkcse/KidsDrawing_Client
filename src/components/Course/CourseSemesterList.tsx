import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISemesterClassState, ICourseState, IScheduleState, ISemesterState } from "../../store/models/root.interface";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { useHistory } from "react-router-dom";
import { setModificationStateSemesterClass } from "../../store/actions/semester_class.action";
import { ICourse } from "../../store/models/course.interface";
import { ISchedule } from "../../store/models/schedule.interface";
import { ISemester } from "../../store/models/semester.interface";

export type semesterCourseListProps = {
  onSelect?: (semester_course: ISemesterClass) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}


function CourseSemesterList(props: semesterCourseListProps): JSX.Element  {
  const semester_courses: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  console.log(semester_courses.semesterClasses)

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourses: ICourse[] = courses.courses
  let courseList: string[] = []

  semester_courses.semesterClasses.map((course_item) => {
    return listCourses.forEach(element => {
      if (element.id === course_item.course_id) {
        return courseList.push(element.name)
      }
    });
  })

  const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
  const listSemesters: ISemester[] = semesters.semesters
  let semeserList: string[] = []

  semester_courses.semesterClasses.map((course_item) => {
    return listSemesters.forEach(element => {
      if (element.id === course_item.creation_id) {
        return semeserList.push(element.name)
      }
    });
  })

  const courseElements: (JSX.Element | null)[] = semester_courses.semesterClasses.map((semester_course, index) => {
    if (!semester_course) { return null; }
    return (<tr className={`table-row ${(semester_courses.selectedSemesterClass && semester_courses.selectedSemesterClass.id === semester_course.id) ? "selected" : ""}`}
      key={`semester_course_${semester_course.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{courseList[index]}</td>
      <td>{semeserList[index]}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(semester_course);
          dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(semester_course);
          dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thuộc khóa học</th>
            <th scope="col">Học kì</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {courseElements}
        </tbody>
      </table>
    </div>

  );
}

export default CourseSemesterList;
