import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IExerciseSubmissionState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import ResultGradeExamTeacher1 from "./ResultGradeExamTeacher1";
import ScoreExamList from "./ScoreExamList";



const AnalytisResultGradeExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const exercise_submissions: IExerciseSubmissionState  = useSelector((state: IStateType) => state.exercise_submissions);
    const max = exercise_submissions.exercise_gradeds.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = exercise_submissions.exercise_gradeds.reduce((a, b) => Math.min(a, b.score), 0);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    let student: string[] = []
    let scores: number[] = []
    if (exercise_submissions.exercise_gradeds.length > 0){
        exercise_submissions.exercise_gradeds.map(ele => {
            student.push(ele.student_name)
            scores.push(ele.score)
            return ele
        })
    }

    var id_x = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('exercise_id');
    let exercise_id = 0;

    if (id_y !== null) {
        exercise_id = parseInt(id_y);
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

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    
                }
            }
            else {   
                 
            }
        }
        
    }, [dispatch, exercise_id, class_id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Thống kê"));
    }, [path.area, dispatch])


    const [checked, setChecked] = useState(true);

    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

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
                    }}>Bảng xếp hạng</h6>
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
                                                <ResultGradeExamTeacher1 />
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

                                <div className="col-xl-12 col-md-12 mb-4">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                                            <div className="card-body">
                                                <ChartLine data={data} />
                                            </div>
                                        </div>
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

export default AnalytisResultGradeExamTeacher;

