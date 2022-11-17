import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/PutUserRegisterTutorial";
import { IStateType, IUserRegisterTutorialState } from "../../store/models/root.interface";
import { IUserRegisterTutorial } from "../../store/models/user_register_tutorial.interface";

export type studentListProps = {
  onSelect?: (student: IUserRegisterTutorial) => void;
  children?: React.ReactNode;
};

function UserRegisterTutorialEditRequestList(props: studentListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();

  const user_register_tutorials: IUserRegisterTutorialState = useSelector((state: IStateType) => state.user_register_tutorials);

  function approvedTutorial(ele: IUserRegisterTutorial) {
    const id = toast.info("Chấp nhận giáo án giáo viên cho giáo án chung!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(putUserRegisterTutorial(ele.id, {
      status: "Approved to tutorial template",
      section_id: ele.section_id,
      name: ele.name,
      creator_id: ele.creator_id
    }, id))
  }

  const studentElements: (JSX.Element | null)[] = user_register_tutorials.user_register_tutorial_approveds.map((student, index) => {
    if (!student) { return null; }
    return (<tr className={`table-row ${(user_register_tutorials.selectedUserRegisterTutorial && user_register_tutorials.selectedUserRegisterTutorial.id === student.id) ? "selected" : ""}`}
      key={`student_${student.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{student.name}</td>
      <td>{student.section_number}</td>
      <td>{student.creator_name}</td>
      <td>{student.create_time}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          approvedTutorial(student)
        }}>Chấp nhận</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên giáo án</th>
            <th scope="col">Buổi</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Làm giáo trình chung</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {studentElements}
        </tbody>
      </table>
    </div>

  );
}

export default UserRegisterTutorialEditRequestList;
