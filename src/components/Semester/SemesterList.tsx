import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { ISemester, SemesterModificationStatus } from "../../store/models/semester.interface";
import { useHistory } from "react-router-dom";
import { clearSelectedSemester, removeSemester, setModificationState } from "../../store/actions/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import Popup from "reactjs-popup";

export type semesterListProps = {
  onSelect?: (semester: ISemester) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'name': 'Học kì 1 năm học 2022',
    'year': 2022,
    'number': 1,
    'start_time': '1/3/2022',
    'end_time': '1/6/2022'
  },
  {
    'id': 2,
    'name': 'Học kì 1 năm học 2022',
    'year': 2022,
    'number': 2,
    'start_time': '1/7/2022',
    'end_time': '1/12/2022'
  }
]

function SemesterList(props: semesterListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
  const history = useHistory();


  const semesterElements: (JSX.Element | null)[] = semesters.semesters.map(semester => {
    var strDate = semester.start_time;
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!semester) { return null; }
    return (<tr className={`table-row ${(semesters.selectedSemester && semesters.selectedSemester.id === semester.id) ? "selected" : ""}`}
      key={`semester_${semester.id}`}>
      <th scope="row">{semester.id}</th>
      <td>{semester.name}</td>
      <td>{semester.year}</td>
      <td>{semester.number}</td>
      <td>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(semester);
          dispatch(setModificationState(SemesterModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(semester);
          dispatch(setModificationState(SemesterModificationStatus.Remove))
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
            <th scope="col">Tên</th>
            <th scope="col">Năm học</th>
            <th scope="col">Học kì</th>
            <th scope="col">Thời gian bắt đầu</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {semesterElements}
        </tbody>
      </table>
    </div>
    </Fragment> 
  );
}

export default SemesterList;
