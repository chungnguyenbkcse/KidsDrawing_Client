import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { ISemester, SemesterModificationStatus } from "../../store/models/semester.interface";
import { setModificationState } from "../../store/actions/semester.actions";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type semesterListProps = {
  onSelect?: (semester: ISemester) => void;
  value?: string;
  children?: React.ReactNode;
};

function SemesterList(props: semesterListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
  console.log(props.value)


  const semesterElements: (JSX.Element | null)[] = semesters.semesters.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
  }).map((semester, index) => {
    var strDate = semester.start_time;
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!semester) { return null; }
    return (<tr className={`table-row ${(semesters.selectedSemester && semesters.selectedSemester.id === semester.id) ? "selected" : ""}`}
      key={`semester_${semester.id}`}>
      <th scope="row">{index + 1}</th>
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
