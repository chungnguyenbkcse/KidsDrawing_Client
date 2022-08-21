import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";
import { useHistory } from "react-router-dom";

function ScoreExamList(): JSX.Element {

    const students: IUserState = useSelector((state: IStateType) => state.users);
    const history = useHistory();


    const routeChange = () => {
        let path = '/manage-student';
        history.push(path);
    }


    const studentElements: (JSX.Element | null)[] = students.students.map((student, idx) => {
        if (!student) { return null; }
        return (<tr className={`table-row ${(students.selectedUser && students.selectedUser.id === student.id) ? "selected" : ""}`}
            key={`student_${idx}`} onClick={routeChange}>
            <div className="col-xl-12 col-md-12 mb-4" >
            <div className={`card shadow h-100 py-0 content-student-teacher`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-xs-12">
                            <div className="row">
                                <p className="col-xl-2 col-md-2 col-xs-2"><span className="header-card-course-teacher" id="index-infor-student-teacher">{idx + 1}</span></p>
                                <i className={`col-xl-2 col-md-2 col-xs-2 fas fa-user-circle fa-2x`} id="icon-user"></i>
                                <p className="col-xl-6 col-md-6 col-xs-6"id="type-name-teacher"><span className="header-card-course-teacher">{student.username}</span></p>
                                <p className="col-xl-2 col-md-2 col-xs-2"id="type-name-teacher"><span className="header-card-course-teacher">9.0</span></p>
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

export default ScoreExamList;
