import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IExerciseSubmissionState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";

function ScoreExamList(): JSX.Element {

    const exercise_submissions: IExerciseSubmissionState  = useSelector((state: IStateType) => state.exercise_submissions);
    const history = useHistory();


    const routeChange = (user_grade_exercise_submission: IExerciseSubmission) => {
        let path = '/exercise/student';
        localStorage.setItem('feedback', user_grade_exercise_submission.feedback)
        localStorage.setItem('score_exercise', user_grade_exercise_submission.score.toString())
        localStorage.setItem('student_name', user_grade_exercise_submission.student_name)
        localStorage.setItem('image_url_exercise_submission', user_grade_exercise_submission.image_url)
        localStorage.setItem('exercise_name', user_grade_exercise_submission.exercise_name)
        localStorage.setItem('exercise_id', user_grade_exercise_submission.exercise_id.toString())
        localStorage.setItem('student_id', user_grade_exercise_submission.student_id.toString())
        localStorage.setItem('time_submit', user_grade_exercise_submission.update_time)
        history.push(path);
    }



    const studentElements: (JSX.Element | null)[] = exercise_submissions.exercise_gradeds.map((student, idx) => {
        if (!student) { return null; }
        return (<tr className={`table-row`}
            key={`student_${idx}`} onClick={() => routeChange(student)}>
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

export default ScoreExamList;
