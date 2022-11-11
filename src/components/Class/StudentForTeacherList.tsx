import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";

function StudentList(): JSX.Element {

    const students: IUserState = useSelector((state: IStateType) => state.users);
    const history = useHistory();

    var id_x = localStorage.getItem('class_end');
    let class_end = false;
    if (id_x !== null) {
        if (id_x === 'true') {
            class_end = true;
        }
        else {
            class_end = false;
        }
    }


    const routeChange = (student_id: number, parent_id: number) => {
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', student_id.toString());
        localStorage.removeItem('parent_id');
        localStorage.setItem('parent_id', parent_id.toString());
        if (class_end === true) {
            let path = '/manage-student-end';
            history.push(path);
        }else {
            let path = '/manage-student';
            history.push(path);
        }
    }


    const studentElements: (JSX.Element | null)[] = students.students.map((student, idx) => {
        if (!student) { return null; }
        return (<tr className={`table-row ${(students.selectedUser && students.selectedUser.id === student.id) ? "selected" : ""}`}
            key={`student_${idx}`} onClick={() => {routeChange(student.id, student.parents)}}>
            <div className="col-xl-12 col-md-12 mb-4" >
            <div className={`card shadow h-100 py-0 content-student-teacher`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-xs-12">
                            <div className="row">
                                <p className="col-4"><span className="header-card-course-teacher" id="index-infor-student-teacher">{idx + 1}</span></p>
                                <i className={`col-4 fas fa-user-circle fa-2x`} id="icon-user"></i>
                                <p className="col-4"id="type-name-teacher"><span className="header-card-course-teacher">{student.username}</span></p>
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

export default StudentList;
