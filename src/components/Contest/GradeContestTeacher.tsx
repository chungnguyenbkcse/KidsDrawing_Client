import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestSubmissionState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./GradeContestTeacher.css"
import 'react-circular-progressbar/dist/styles.css';
import TextInput from "../../common/components/TextInput";
import { useHistory } from "react-router-dom";
import { OnChangeModel } from "../../common/types/Form.types";
import NumberInput from "../../common/components/NumberInput";
import { toast, ToastContainer } from "react-toastify";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { postUserGradeContestSubmission } from "../../common/service/UserGradeContestSubmission/PostUserGradeContestSubmission";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";


const GradeContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const { promiseInProgress } = usePromiseTracker();
    let user_grade_contest_submission = {
        feedback: "",
        score: 0
    }

    const [formState, setFormState] = useState({
        feedback: { error: "", value: user_grade_contest_submission.feedback },
        score: { error: "", value: user_grade_contest_submission.score },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    var id_x = localStorage.getItem('id');
    let id: string = "";
    if (id_x !== null) {
        id = id_x
    }

    function saveForm(){
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        
        if (contest_submission_id === ""){
            let y = contest_submissions.contest_not_gradeds[0].id;
            console.log({
                teacher_id: id,
                contest_submission_id: y,
                score: formState.score.value,
                feedback: formState.feedback.value
            })

            dispatch(postUserGradeContestSubmission({
                teacher_id: id,
                contest_submission_id: y,
                score: formState.score.value,
                feedback: formState.feedback.value
            }, idx))
        }
        else {
            dispatch(postUserGradeContestSubmission({
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);

    const history = useHistory();
    const routeChange = () => {
        let x = count + 1;
        setCount(x);
        if (x < contest_submissions.contest_not_gradeds.length){
            let image_url_ = contest_submissions.contest_not_gradeds[x].image_url;
            let student_name_ = contest_submissions.contest_not_gradeds[x].student_name;
            let time_submit_ = contest_submissions.contest_not_gradeds[x].update_time;
            let contest_submission_id_ = contest_submissions.contest_not_gradeds[x].id;
            setImageUrl(image_url_);
            setStudentName(student_name_);
            setTimeSubmit(time_submit_);
            setContestSubmissionId(contest_submission_id_);
        }
    }

    const routeChange1 = () => {
        let path = '/contest/result-grade';
        history.push({
            pathname: path,
        });
    }

    const [count, setCount] = useState(0);
    const [image_url, setImageUrl] = useState("");
    const [student_name, setStudentName] = useState("");
    const [contest_submission_id, setContestSubmissionId] = useState("");
    const [time_submit, setTimeSubmit] = useState("");
    return (
        promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> : <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Bài làm của bé</h6>
                    </div>
                    {
                        function () {
                            if (count > 0)
                                return (
                                    <img className="card-img-top" src={image_url} alt="" />
                                )
                            else {
                                if (contest_submissions.contest_not_gradeds.length > 0) {
                                    return (
                                        <img className="card-img-top" src={contest_submissions.contest_not_gradeds[0].image_url} alt="" />
                                    )
                                }
                            }
                        }()
                    }
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="row">
                        <div className={`card shadow h-100 py-2 ml-4 mr-4`} id="topcard-user">
                            {
                                function () {
                                    if (count > 0)
                                        return (
                                            <div className="card-body">
                                                <div className="row no-gutters justify-content-left">
                                                    <h4 id="full-name">Thông tin bài nộp</h4>
                                                </div>
                                                <div className="row no-gutters justify-content-left">
                                                    <p id="username-teacher">Tên học sinh: {student_name}</p>
                                                </div>
                                                <div className="row no-gutters justify-content-left">
                                                    <p id="username-teacher">Thời gian nộp: {time_submit}</p>
                                                </div>
                                            </div>
                                        )
                                    else {
                                        if (contest_submissions.contest_not_gradeds.length > 0) {
                                            return (
                                                <div className="card-body">
                                                    <div className="row no-gutters justify-content-left">
                                                        <h4 id="full-name">Thông tin bài nộp</h4>
                                                    </div>
                                                    <div className="row no-gutters justify-content-left">
                                                        <p id="username-teacher">Tên học sinh: {contest_submissions.contest_not_gradeds[0].student_name}</p>
                                                    </div>
                                                    <div className="row no-gutters justify-content-left">
                                                        <p id="username-teacher">Thời gian nộp: {contest_submissions.contest_not_gradeds[0].update_time}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }()
                            }
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
                            <button className="btn btn-warning" onClick={() => {saveForm()}}>Lưu</button>
                            {
                                function () {
                                    if (count === contest_submissions.contest_not_gradeds.length - 1) {
                                        return (
                                            <button className={`btn btn-success left-margin`} onClick={() => { routeChange1() }}>Hoàn thành</button>
                                        )
                                    }
                                    else {
                                        return (
                                            <button className={`btn btn-success left-margin`} onClick={() => { routeChange() }}>Bài tiếp</button>
                                        )
                                    }
                                }()
                            }

                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default GradeContestTeacher;
