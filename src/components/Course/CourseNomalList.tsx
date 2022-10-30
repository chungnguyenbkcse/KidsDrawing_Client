import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ICourseState } from "../../store/models/root.interface";
import { CourseModificationStatus, ICourse } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/course.action";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}


function CourseNomalList(props: courseListProps): JSX.Element {
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();



  const routeChange = (course: ICourse) => {
    localStorage.removeItem('course_id')
    localStorage.setItem('course_id', course.id.toString())
    localStorage.removeItem('number_of_sum')
    localStorage.setItem('number_of_sum', course.num_of_section.toString())
    localStorage.removeItem('course_name')
    localStorage.setItem('course_name', course.name)
    let path = '/courses/section-template';
    history.push({
      pathname: path
    });
  }

  const routeEdit = (course: ICourse) => {
    dispatch(setModificationState(CourseModificationStatus.None));
    let path = `/courses/edit-course`;
    history.push(path);
  }

  const courseElements: (JSX.Element | null)[] = courses.courses.map((course, index) => {
    if (!course) { return null; }
    return (<tr className={`table-row ${(courses.selectedCourse && courses.selectedCourse.id === course.id) ? "selected" : ""}`}
      key={`course_${index}`}>
      <th scope="row">{index + 1}</th>
      <td onClick={() => {
        if(props.onSelect) props.onSelect(course);
        routeChange(course)
      }}>{course.name}</td>
      <td>{course.art_type_name}</td>
      <td>{course.art_age_name}</td>
      <td>{course.art_level_name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if(props.onSelect) props.onSelect(course);
          routeEdit(course)}}
        >Chỉnh thông tin</button>
      </td>
      <td>
        <button type="button" className="btn btn-warning" onClick={() => {
          if (props.onSelect) props.onSelect(course);
          routeChange(course)
        }}
        >Chỉnh giáo án</button>
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
            <th scope="col">Thể loại</th>
            <th scope="col">Độ tuổi</th>
            <th scope="col">Trình độ</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
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

export default CourseNomalList;
