import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DetailExerciseStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    var id_y = localStorage.getItem('image_url_exercise');
    var image_url_exercise: string = "";
    if (id_y !== null) {
        image_url_exercise = id_y;
    }

    var id_z = localStorage.getItem('score');
    var score: number = 0;
    if (id_z !== null) {
        score = parseInt(id_z);
    }

    var id_t = localStorage.getItem('description');
    var description: string = "";
    if (id_t !== null) {
        description = id_t;
    }

    var id_h = localStorage.getItem('time_submit');
    var time_submit: string = "";
    if (id_h !== null) {
        time_submit = id_h;
    }

    var id_k = localStorage.getItem('feedback');
    var feedback: string = "";
    if (id_k !== null) {
        feedback = id_k;
    }

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    let percentage = score;
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    
                }
            }
            else {
                
            }
        }
    }, [dispatch, access_token, refresh_token]);


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Đề tài</h6>
                        </div>
                        <div className="card-body">
                            <p>
                                {description}
                            </p>

                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Thời gian nộp: <span> {time_submit}</span></h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <img className="card-img-top" src={image_url_exercise} alt="" />
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Điểm của bé</h6>
                        </div>
                        <div className="card-body">
                            <CircularProgressbar value={percentage} text={`${percentage}`} />;
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            {feedback}
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default DetailExerciseStudent;
