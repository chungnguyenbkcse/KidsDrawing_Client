import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ILessonState, IUserGradeExerciseSubmissionState } from "../../store/models/root.interface";
import { ILesson, LessonModificationStatus } from "../../store/models/lesson.interface";
import { setModificationState } from "../../store/actions/lesson.action";
import { useHistory } from "react-router-dom";
import { IUserGradeExerciseSubmission } from "../../store/models/user_grade_exercise_submission.interface";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

const data = [
        {
            "id": 1,
            "name": "Vẽ con mèo",
            "submission_time": "2022-10-10 19:00:00",
            "deadline": "2022-10-10 22:00:00",
            "scrore": 9
        },
        {
            "id": 2,
            "name": "Vẽ con lợn",
            "submission_time": "2022-10-10 19:00:00",
            "deadline": "2022-10-10 22:00:00",
            "scrore": 9
        },
        {
            "id": 3,
            "name": "Vẽ con lợn",
            "submission_time": "2022-10-10 19:00:00",
            "deadline": "2022-10-10 22:00:00",
            "scrore": 9
        }
]

function ExerciseSectionList(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    console.log(props.value)

    const history = useHistory();
    const onChangeRoute = (exercise: IUserGradeExerciseSubmission) =>{ 
        localStorage.removeItem('image_url_exercise')
        localStorage.setItem('image_url_exercise', exercise.image_url)
        localStorage.removeItem('score')
        localStorage.setItem('score', exercise.score.toString())
        localStorage.removeItem('description')
        localStorage.setItem('description', exercise.description)
        localStorage.removeItem('time_submit')
        localStorage.setItem('time_submit', exercise.time_submit)
        localStorage.removeItem('feedback')
        localStorage.setItem('feedback', exercise.feedback)
        let path = '/exercise/detail'; 
        history.push({
            pathname: path,
        });
    }
    
    const lessonElements: (JSX.Element | null)[] = user_grade_exercise_submission.user_grade_exercise_submissions.map((exercise, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!exercise) { return null; }
        return (<tr className={`table-row`}
            key={`lesson_${index}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.exercise_name}</td>
            <td className="data-table">{exercise.deadline}</td>
            <td className="data-table">{exercise.time_submit}</td>
            <td className="data-table">{exercise.score}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => {
                        onChangeRoute(exercise)
                    }}
                >
                    Chi tiết
                </button>
            </td>
        </tr>);
    });


    return (
        <Fragment>
            <div className="table-responsive portlet">
                <table className="table">
                    <thead id="table-thread-exercise-section">
                        <tr>
                            <th scope="col" className="name-row-table">#</th>
                            <th scope="col" className="name-row-table">Tên</th>
                            <th scope="col" className="name-row-table">Thời hạn nộp</th>
                            <th scope="col" className="name-row-table">Thời gian nộp</th>
                            <th scope="col" className="name-row-table">Điểm</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessonElements}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ExerciseSectionList;
