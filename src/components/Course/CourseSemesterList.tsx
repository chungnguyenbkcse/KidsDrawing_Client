import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ISemesterCourseState } from "../../store/models/root.interface";
import { ISemesterCourse } from "../../store/models/semester_course.interface";
import { useHistory } from "react-router-dom";

export type semesterCourseListProps = {
  onSelect?: (semester_course: ISemesterCourse) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'name': 'Khóa học mầm chì màu học kì 1 năm học 2022',
    'schedule': ['Thứ 2 (7:00 AM - 8:00 AM)', 'Thứ 4 (8:00 AM - 9:00 AM)'],
    'semester': 'Học kì 1 năm học 2022'
  },
  {
    'id': 2,
    'name': 'Khóa học chồi chì màu học kì 2 năm học 2022',
    'schedule': ['Thứ 3 (7:00 AM - 8:00 AM)', 'Thứ 5 (8:00 AM - 9:00 AM)'],
    'semester': 'Học kì 2 năm học 2022'
  },
]

function CourseSemesterList(props: semesterCourseListProps): JSX.Element  {
  const semester_courses: ISemesterCourseState = useSelector((state: IStateType) => state.semester_courses);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/teachers/detail'; 
    history.push(path);
  }

  const courseElements: (JSX.Element | null)[] = data.map(semester_course => {
    if (!semester_course) { return null; }
    return (<tr className={`table-row ${(semester_courses.selectedSemesterCourse && semester_courses.selectedSemesterCourse.id === semester_course.id) ? "selected" : ""}`}
      onClick={routeChange}
      key={`semester_course_${semester_course.id}`}>
      <th scope="row">{semester_course.id}</th>
      <td>{semester_course.name}</td>
      <td>
        {semester_course.schedule.map((val, index) => {
            return (
                <p>{val}</p>
            )
        })}
      </td>
      <td>{semester_course.semester}</td>
      <td>
        <button type="button" className="btn btn-primary">Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Lịch học</th>
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
