import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus, IUser } from "../../store/models/user.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type userListProps = {
  onSelect?: (user: IUser) => void;
  value?: string;
  children?: React.ReactNode;
};

function StudentList(props: userListProps): JSX.Element {

  const dispatch: Dispatch<any> = useDispatch();

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const history = useHistory();


  function routeChange() {
    let path = '/students/detail';
    history.push(path);
  }


  const userElements: (JSX.Element | null)[] = users.students.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.username).toLowerCase().includes(props.value.toLowerCase()) || val.username.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
  }).map((student, index) => {
    if (!student) { return null; }
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === student.id) ? "selected" : ""}`}

      key={`user_${index}`}>
      <th scope="row">{index + 1}</th>
      <td onClick={() => {
        if(props.onSelect) props.onSelect(student);
        routeChange()
      }}
      >
        {student.firstName} {student.lastName}
      </td>
      <td>{student.username}</td>
      {
        function () {
          if (student.status === true){
            return (
              <td style={{color: "#18AB56"}}>Đang hoạt động</td>
            )
          }
          else { 
            return (
              <td style={{color:"#2F4F4F"}}>Không hoạt động</td>
            )
          }
        }()
      }
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(student);
          dispatch(setModificationState(UserModificationStatus.Remove))
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
              <th scope="col">Tài khoản</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userElements}
          </tbody>
        </table>
      </div>
    </Fragment>

  );
}

export default StudentList;
