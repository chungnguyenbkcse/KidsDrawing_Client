import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { trackPromise } from "react-promise-tracker";

function ScoreContestList(): JSX.Element {

    const dispatch: Dispatch<any> = useDispatch();
    
    const user_grade_contest_submissions: IUserGradeContestSubmissionState  = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const history = useHistory();


    const routeChange = () => {
        let path = '/manage-student';
        history.push(path);
    }

    var class_id = localStorage.getItem('class_id');
    var class_id_: number = 2;
    if (class_id !== null) {
        class_id_ = parseInt(class_id);
    }

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    console.log(user_grade_contest_submissions.userGradeContestSubmissions)

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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {    
                    trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                }
            }
            else {     
                trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id_, contest_id]);


    const studentElements: (JSX.Element | null)[] = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => a.student_id- b.student_id).map((student, idx) => {
        if (!student) { return null; }
        return (<tr className={`table-row`}
            key={`student_${idx}`} onClick={routeChange}>
            <div className="col-xl-12 col-md-12 mb-4" >
            <div className={`card shadow h-100 py-0 content-student-teacher`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-xs-12">
                            <div className="row">
                                <p className="col-xl-2 col-md-2 col-xs-2"><span className="header-card-course-teacher" id="index-infor-student-teacher">{idx + 1}</span></p>
                                <i className={`col-xl-2 col-md-2 col-xs-2 fas fa-user-circle fa-2x`} id="icon-user"></i>
                                <p className="col-xl-6 col-md-6 col-xs-6"id="type-name-teacher"><span className="header-card-course-teacher">{student.student_name}</span></p>
                                <p className="col-xl-2 col-md-2 col-xs-2"id="type-name-teacher"><span className="header-card-course-teacher">{student.score}</span></p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    {studentElements}
                </tbody>
            </table>
        </div>

    );
}

export default ScoreContestList;
