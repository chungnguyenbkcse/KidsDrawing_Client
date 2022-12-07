import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestSubmissionTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./GradeContestTeacher.css"
import 'react-circular-progressbar/dist/styles.css';
import TextInput from "../../common/components/TextInput";
import { useHistory } from "react-router-dom";
import { OnChangeModel } from "../../common/types/Form.types";
import NumberInput from "../../common/components/NumberInput";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { postUserGradeContestSubmission } from "../../common/service/UserGradeContestSubmission/PostUserGradeContestSubmission";
import { getContestSubmissionByContestAndTeacher } from "../../common/service/ContestSubmission/GetContestSubmissonForTeacherAndContest";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { putUserGradeContestSubmission } from "../../common/service/UserGradeContestSubmission/PutUserGradeContestSubmission";

const EditScoreContestStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionTeacherState = useSelector((state: IStateType) => state.contest_submission_teacher);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const { promiseInProgress } = usePromiseTracker();
    let user_grade_contest_submission = {
        feedback: "",
        score: 0
    }


    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    var id_x = localStorage.getItem('id');
    let id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_x = localStorage.getItem("feedback");
    let feedback: string = "";
    if (id_x !== null) {
        feedback = id_x;
    }

    var id_y = localStorage.getItem('contest_submission_id');
    var contest_submission_id: number = 0;
    if (id_y !== null) {
        contest_submission_id = parseInt(id_y);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("score");
    let score = 0;
    if (id_j !== null) {
        score = parseInt(id_j);
    }

    var id_a = localStorage.getItem("url_conest_submission");
    let url_conest_submission = "";
    if (id_a !== null) {
        url_conest_submission = (id_a);
    }

    var id_b = localStorage.getItem("art_type_name");
    let art_type_name = "";
    if (id_b !== null) {
        art_type_name = (id_b);
    }

    var id_c = localStorage.getItem("art_age_name");
    let art_age_name = "";
    if (id_c !== null) {
        art_age_name = (id_c);
    }

    var id_d = localStorage.getItem("start_time");
    let start_time = "";
    if (id_d !== null) {
        start_time = (id_d);
    }

    var id_e = localStorage.getItem("end_time");
    let end_time = "";
    if (id_e !== null) {
        end_time = (id_e);
    }

    var id_f = localStorage.getItem("contest_name");
    let contest_name = "";
    if (id_f !== null) {
        contest_name = (id_f);
    }

    var id_fg = localStorage.getItem("student_name");
    let student_name = "";
    if (id_fg !== null) {
        student_name = (id_fg);
    }

    const [formState, setFormState] = useState({
        feedback: { error: "", value: feedback },
        score: { error: "", value: score },
    });


    function saveForm(){
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        
        if (contest_submission_id !== 0){
            dispatch(putUserGradeContestSubmission(id, contest_submission_id, {
                teacher_id: id,
                contest_submission_id: contest_submission_id,
                score: formState.score.value,
                feedback: formState.feedback.value
            }, idx))
        }
    }
    
    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }
    
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);

    const history = useHistory();

    const routeChange1 = () => {
        let path = '/contest/result-grade';
        history.push({
            pathname: path,
        });
    }


    
    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <div className="card-body mx-auto">
                        <PhotoProvider>
                            <PhotoView src={url_conest_submission}>
                                <img src={url_conest_submission} alt="" className="center-x" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="row">
                        <div className={`card shadow h-100 py-2 ml-4 mr-4`} id="topcard-user">
                                            <div className="card-body">
                                                <div className="row no-gutters justify-content-left">
                                                    <h4 id="full-name">Thông tin bài nộp</h4>
                                                </div>
                                                <div className="row no-gutters justify-content-left">
                                                    <p id="username-teacher">Tên học sinh: {student_name}</p>
                                                </div>
                                                <div className="row no-gutters justify-content-left">
                                                    <p id="username-teacher">Thời gian nộp: {time_submit.replaceAll("T", " ").substring(0,16)}</p>
                                                </div>
                                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 ml-4">
                        <NumberInput
                            id="input_score"
                            value={formState.score.value}
                            field="score"
                            onChange={hasFormValueChanged}
                            max={10}
                            min={0}
                            label="Nhập điểm"
                        />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <TextInput id="input_feedback"
                                    field="feedback"
                                    value={formState.feedback.value}
                                    onChange={hasFormValueChanged}
                                    required={false}
                                    maxLength={100}
                                    label=""
                                    placeholder=""
                                />
                            </div>
                            <button className="btn btn-warning" onClick={() => { saveForm() }}>Lưu</button>
                                <button className={`btn btn-success left-margin`} onClick={() => { routeChange1() }}>Hoàn thành</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default EditScoreContestStudent;
