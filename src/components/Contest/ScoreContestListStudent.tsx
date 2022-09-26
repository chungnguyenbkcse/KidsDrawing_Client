import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { IUserGradeContestSubmission } from "../../store/models/user_grade_contest_submission.interface";

function ScoreContestListStudent(): JSX.Element {

    const user_grade_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    var id_x = localStorage.getItem('id');
    let id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    let childs: IUserGradeContestSubmission[] = [];
    user_grade_contest_submissions.userGradeContestSubmissions.map((element, idx) => {
        if (id === element.student_id) {
            childs.push(element)
        }
        return element
    })
    const history = useHistory();


    const routeChange = (child_id: number) => {
        localStorage.removeItem("child_id");
        localStorage.setItem("child_id", child_id.toString())
        let path = '/contest/detail';
        history.push(path);
    }

    const routeChange1 = () => {
        let path = '/contest/detail';
        history.push(path);
    }

    console.log(user_grade_contest_submissions.userGradeContestSubmissions)


    const studentElements: (JSX.Element | null)[] = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => a.student_id - b.student_id).map((student, idx) => {
        if (!student) { return null; }
        else if (childs.includes(student)) {
            return (
                <tr className="table-row"
                    key={`student_${idx}`} onClick={() => {routeChange(student.student_id)}}>
                    <div className="col-xl-12 col-md-12 mb-4" >
                        <div className={`card shadow h-100 py-0 child-row`} id="topcard-user">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 col-xs-12">
                                        <div className="row">
                                            <p className="col-xl-2 col-md-2 col-xs-2"><span className="header-card-course-teacher" id="index-infor-student-teacher">{idx + 1}</span></p>
                                            <i className={`col-xl-2 col-md-2 col-xs-2 fas fa-user-circle fa-2x`} id="icon-user"></i>
                                            <p className="col-xl-6 col-md-6 col-xs-6" id="type-name-teacher"><span className="header-card-course-teacher">{student.student_name}</span></p>
                                            <p className="col-xl-2 col-md-2 col-xs-2" id="type-name-teacher"><span className="header-card-course-teacher">{student.score}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </tr>
            )
        }
        return (<tr className={`table-row`}
            key={`student_${idx}`} onClick={routeChange1}>
            <div className="col-xl-12 col-md-12 mb-4" >
                <div className={`card shadow h-100 py-0 content-student-teacher`} id="topcard-user">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 col-xs-12">
                                <div className="row">
                                    <p className="col-xl-2 col-md-2 col-xs-2"><span className="header-card-course-teacher" id="index-infor-student-teacher">{idx + 1}</span></p>
                                    <i className={`col-xl-2 col-md-2 col-xs-2 fas fa-user-circle fa-2x`} id="icon-user"></i>
                                    <p className="col-xl-6 col-md-6 col-xs-6" id="type-name-teacher"><span className="header-card-course-teacher">{student.student_name}</span></p>
                                    <p className="col-xl-2 col-md-2 col-xs-2" id="type-name-teacher"><span className="header-card-course-teacher">{student.score}</span></p>
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

export default ScoreContestListStudent;
