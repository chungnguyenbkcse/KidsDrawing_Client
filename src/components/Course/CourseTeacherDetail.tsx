import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory } from "react-router-dom";
import "./CourseTeacherDetail.css"
import { postRegisterTeachSemester } from "../../common/service/UserTeachSemester/PostRegisterTeachSemester";
import { toast, ToastContainer } from "react-toastify";

const CourseTeacherDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    const history = useHistory();

    var id_x = localStorage.getItem("description_course");
    let description_course = "";
    if (id_x !== null) {
        description_course = id_x
    }

    var id_y = localStorage.getItem("semester_class_id");
    let semester_class_id = "";
    if (id_y !== null) {
        semester_class_id = id_y
    }

    function handleRegister() {
            dispatch(postRegisterTeachSemester({
                teacher_id: localStorage.getItem('id'),
                semester_classes_id: semester_class_id
            }))
            console.log({
                teacher_id: localStorage.getItem('id'),
                semester_classes_id: semester_class_id
            })
            toast.success("Đăng kí lớp thành công!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            let path = '/courses'; 
            setTimeout(function () {
                history.push({
                    pathname: path
                });
            }, 2000); 
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-body" dangerouslySetInnerHTML={{ __html: description_course }}>
                    </div>
                    <div className="row text-center justify-content-center" id="btn-register-course">
                    <button className="btn btn-success btn-green" id="btn-create-register-course" onClick={() => handleRegister()}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí ngay
                    </button>
                </div>
                </div>
            </div>

        </Fragment >
    );
};

export default CourseTeacherDetail;
