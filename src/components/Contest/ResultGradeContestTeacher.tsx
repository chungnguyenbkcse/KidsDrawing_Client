import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestSubmissionTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import "./ResultContest.css"
import ScoreContestList1 from "./ScoreContestList1";
import { getContestSubmissionByContestAndTeacher } from "../../common/service/ContestSubmission/GetContestSubmissonForTeacherAndContest";
import { ChartLine } from "../../common/components/CharLine";

const ResultGradeContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionTeacherState = useSelector((state: IStateType) => state.contest_submission_teacher);
    
    const max = contest_submissions.contest_submission_grade.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = contest_submissions.contest_submission_grade.reduce((a, b) => Math.min(a, b.score), 100);

    var role = localStorage.getItem('role')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }

    let student: string[] = []
    let scores: number[] = []
    if (contest_submissions.contest_submission_grade.length > 0){
        contest_submissions.contest_submission_grade.map(ele => {
            if (ele != null && ele != undefined) {
                if (ele.score != undefined && ele.score != null && ele.student_name != undefined && ele.student_name != null) {
                    student.push(ele.student_name)
                    scores.push(ele.score)
                    return ele
                }
            }
        })
    }

    const labels = student;
    let data = {
        labels,
        datasets: [
            {
                label: 'Điêm',
                data: scores,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
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

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    var contest_name = localStorage.getItem('contest_name');
    var contest_name_: string = "";
    if (contest_name !== null) {
        contest_name_ = contest_name;
    }
    
    useEffect(() => {
        dispatch(updateCurrentPath(contest_name_, "Kết quả"));
    }, [path.area, dispatch, contest_name_])
    localStorage.setItem('path','/contests/detail')


    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    const [checked, setChecked] = useState(true);

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>

                <div className="row">
                    <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                    <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
                </div>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Bảng điểm</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked === true) {
                                setChecked(false)
                            }
                        }}
                            style={{
                                color: checked ? "#2F4F4F" : "#F24E1E"
                            }}>Biểu đồ</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#ffffff" : "#F24E1E"
                        }}></div>
                    </div>
                </div>

                {
                    function () {
                        if (checked === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                                <div className="card-body">
                                                    <ScoreContestList1 />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-6 mb-12">
                                        <div className="row justify-content-center">
                                            <ChartLine data={data} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

            </Fragment>
    );
};

export default ResultGradeContestTeacher;
