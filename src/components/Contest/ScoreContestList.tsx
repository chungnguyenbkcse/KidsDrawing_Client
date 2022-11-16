import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserGradeContestSubmissionState, IUserState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { IUserGradeContestSubmission } from "../../store/models/user_grade_contest_submission.interface";

function ScoreContestList(): JSX.Element {

    const user_grade_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    let childs: IUserGradeContestSubmission[] = [];
    users.students.map((ele, idx) => {
        return user_grade_contest_submissions.userGradeContestSubmissions.map((element, idx) => {
            if (ele.id === element.student_id) {
                childs.push(element)
            }
            return element
        })
    })
    const history = useHistory();

    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }

    var id_x = localStorage.getItem('id');
    let id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x)
    }


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


    const parentElements: (JSX.Element | null)[] = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => b.score - a.score).map((student, idx) => {
        if (!student) { return null; }
        else if (childs.includes(student)) {
            return (
                <tr className="table-row"
                    key={`student_${idx}`} onClick={() => {routeChange(student.student_id)}}>
                    <div className="col-xl-12 col-md-12 mb-4" >
                        <div className={`card shadow h-100 py-0 child-row`}>
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
            key={`student_${idx}`}>
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


    const studentElements: (JSX.Element | null)[] = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => b.score - a.score).map((student, idx) => {
        if (!student) { return null; }
        else if (student.student_id === id) {
            return (
                <tr className="table-row"
                    key={`student_${idx}`} onClick={() => {routeChange(student.student_id)}}>
                    <div className="col-xl-12 col-md-12 mb-4" >
                        <div className={`card shadow h-100 py-0 child-row`}>
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
            key={`student_${idx}`}>
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

    const teacherElements: (JSX.Element | null)[] = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => b.score - a.score).map((student, idx) => {
        if (!student) { return null; }
            return (
                <tr className="table-row"
                    key={`student_${idx}`} onClick={() => {routeChange(student.student_id)}}>
                    <div className="col-xl-12 col-md-12 mb-4" >
                        <div className={`card shadow h-100 py-0 element-row`}>
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
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    {
                        function () {
                            if (roleUser === "STUDENT_USER") {
                                return studentElements
                            }
                            else if (roleUser === "PARENT_USER") {
                                return parentElements
                            }
                            else {
                                return teacherElements
                            }
                        }()
                    }
                </tbody>
            </table>
        </div>

    );
}

export default ScoreContestList;
