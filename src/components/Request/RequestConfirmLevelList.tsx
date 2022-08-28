import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ITeacherRegisterQuantificationState, ICourseState, IUserState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";
import { useHistory } from "react-router-dom";
import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";
import { putTeacherRegisterLevelAdmin } from "../../common/service/TeacherRegisterQuantification/PutTeacherRegisterLevelAdmin";
import { addNotification } from "../../store/actions/notifications.action";
import { toast } from "react-toastify";
export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};


function RequestConfirmLevelList(props: productListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const teachers: IUserState = useSelector((state: IStateType) => state.users);
  const history = useHistory();
  const routeChange = (degree_photo: string) => {
    let path = '/teachers/request-level/degree-photo';
    history.push({
      pathname: path,
      state: { degree_photo: degree_photo }
    });
  }

  function approvedTeacherLevel(ele: ITeacherRegisterQuantification) {
    const id = toast.info("Chấp nhận trình độ cho giáo viên", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(putTeacherRegisterLevelAdmin(ele.id, ele.teacher_id, {
      status: "Approved"
    }, id))
  }

  function notApprovedTeacherLevel(ele: ITeacherRegisterQuantification) {
    const id = toast.info("Không chấp nhận trình độ cho giáo viên", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    dispatch(putTeacherRegisterLevelAdmin(ele.id, ele.teacher_id, {
      status: "Not approved"
    }, id))
    dispatch(addNotification("Trình độ ", `${ele.course_name} - Đã được chấp nhận bởi bạn`));
  }

  const productElements: (JSX.Element | null)[] = teacher_register_quantifications.not_approved_now.map((product, index) => {
    
    if (!product) { return null; }
    let course_name = "";
    courses.courses.map(ele => {
      if (ele.id === product.course_id) {
        course_name = ele.name
      }
      return ele
    })

    let teacher_name = "";
    teachers.teachers.map(ele => {
      if (ele.id === product.teacher_id) {
        teacher_name = ele.username
      }
      return ele
    })
    return (<tr className={`table-row ${(teacher_register_quantifications.selectedTeacherRegisterQuantification && teacher_register_quantifications.selectedTeacherRegisterQuantification.id === product.id) ? "selected" : ""}`}
      key={`product_${index}`}>
      <th scope="row" onClick={() => { routeChange(product.degree_photo_url) }}>{index + 1}</th>
      <td onClick={() => { routeChange(product.degree_photo_url) }}>{teacher_name}</td>
      <td onClick={() => { routeChange(product.degree_photo_url) }}>{course_name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          approvedTeacherLevel(product)
        }}>Chấp nhận</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() => {
          notApprovedTeacherLevel(product)
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
            <th scope="col">Giáo viên</th>
            <th scope="col">Trình độ</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default RequestConfirmLevelList;
