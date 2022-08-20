import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory, useLocation } from "react-router-dom";
import "./CourseTeacherDetail.css"
import { postRegisterTeachSemester } from "../../common/service/UserTeachSemester/PostRegisterTeachSemester";
import { addNotification } from "../../store/actions/notifications.action";

const CourseTeacherDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { state } = useLocation<any>();
    console.log(state)

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    const history = useHistory();

    function handleRegister() {
        if (state === undefined || state === null) {
            return ""
        }
        else {
            dispatch(postRegisterTeachSemester({
                teacher_id: localStorage.getItem('id'),
                semester_class_id: state.semester_class_id
            }))
            console.log({
                teacher_id: localStorage.getItem('id'),
                semester_class_id: state.semester_class_id
            })
            dispatch(addNotification("Lớp theo kì ", `${state.course_name} đăng kí bởi bạn`));
            let path = '/courses'; 
            history.push({
                pathname: path
            });
        }
    }

    return (
        <Fragment>
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    {
                        function () {
                            if (state === undefined || state === null) {
                                return ""
                            }
                            else {
                                console.log(state)
                                return <div className="card-body" dangerouslySetInnerHTML={{ __html: state.description }}>
                                </div>
                            }
                        }()
                    }
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
