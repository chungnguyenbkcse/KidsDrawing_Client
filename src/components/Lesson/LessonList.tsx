import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ILessonState } from "../../store/models/root.interface";
import { ILesson, LessonModificationStatus } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/lesson.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type lessonListProps = {
  onSelect?: (lesson: ILesson) => void;
  value?: string;
  children?: React.ReactNode;
};

function LessonList(props: lessonListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
  const history = useHistory();
  console.log(props.value)


  const lessonElements: (JSX.Element | null)[] = lessons.lessons.map((lesson, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!lesson) { return null; }
    return (<tr className={`table-row ${(lessons.selectedLesson && lessons.selectedLesson.id === lesson.id) ? "selected" : ""}`}
      key={`lesson_${lesson.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{lesson.start_time}</td>
      <td>{lesson.end_time}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(lesson);
          dispatch(setModificationState(LessonModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(lesson);
          dispatch(setModificationState(LessonModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thời gian bắt đầu</th>
            <th scope="col">Thời gian kết thúc</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {lessonElements}
        </tbody>
      </table>
    </div>
    </Fragment> 
  );
}

export default LessonList;
