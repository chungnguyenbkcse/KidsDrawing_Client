import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IMyClassState } from "../../store/models/root.interface";
import { IMyClass, MyClassModificationStatus } from "../../store/models/my_class.interface";
import ClassForm from "./ClassForm";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/my_class.action";
import Popup from "reactjs-popup";

export type myclassListProps = {
  onSelect?: (myclass: IMyClass) => void;
  value?: string;
  children?: React.ReactNode;
};

function ClassList(props: myclassListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();

  const myclasss: IMyClassState = useSelector((state: IStateType) => state.myclasses);

  const history = useHistory();

  const [popup, setPopup] = useState(false);
  
  const routeChange = (class_id: number) =>{ 
    let path = '/class/detail'; 
    history.push({
      pathname: path,
      state: { class_id: class_id }
    });
  }

  function onMyClassRemove() {
    setPopup(true);
}

const routeViewSchedule = (class_id: number, class_name: string) =>{ 
  localStorage.removeItem('class_id')
  localStorage.setItem('class_id', class_id.toString())
  localStorage.removeItem('class_name')
  localStorage.setItem('class_name', class_name)
  let path = '/class/schedule'; 
  history.push({
    pathname: path,
    state: { class_id: class_id }
  });
}

  const myclassElements: (JSX.Element | null)[] = myclasss.myClasses.map((myclass, idx) => {
    if (!myclass) { return null; }
    return (<tr className={`table-row ${(myclasss.selectedMyClass && myclasss.selectedMyClass.id === myclass.id) ? "selected" : ""}`}
      key={`myclass_${idx}`}>
      <th scope="row">{idx + 1}</th>
      <td onClick={() => {routeChange(myclass.id)}}>{myclass.name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if(props.onSelect) props.onSelect(myclass);
          routeViewSchedule(myclass.id, myclass.name)}}
        ><i className="fa fa-info-circle" aria-hidden="true"></i></button>
      </td>
      <td>
      <button type="button" className="btn btn-primary" onClick={() => {
          dispatch(setModificationState(MyClassModificationStatus.Create))
          onMyClassRemove()
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
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
            <th scope="col">Tên lớp</th>
            <th scope="col">Lịch học</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {myclassElements}
        </tbody>
      </table>
    </div>
    </Fragment>

  );
}

export default ClassList;
