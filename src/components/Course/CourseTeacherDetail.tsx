import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useLocation } from "react-router-dom";
import "./CourseTeacherDetail.css"

const CourseTeacherDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { state } = useLocation<any>();

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

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
                    <button className="btn btn-success btn-green" id="btn-create-register-course">
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
