import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { IExerciseSubmissionState, IStateType } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};


function ExerciseSectionList1(props: lessonListProps): JSX.Element {
    const exercise_submission: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);

    const history = useHistory();
    const onChangeRoute = (exercise: IExerciseSubmission) =>{ 
        localStorage.removeItem('image_url_exercise')
        localStorage.setItem('image_url_exercise', exercise.image_url)
        localStorage.removeItem('score')
        localStorage.setItem('score', exercise.score.toString())
        localStorage.removeItem('description')
        localStorage.setItem('description', exercise.exercise_description)
        localStorage.removeItem('time_submit')
        localStorage.setItem('time_submit', exercise.time)
        localStorage.removeItem('feedback')
        localStorage.setItem('feedback', exercise.feedback)
        let path = '/exercise/score'; 
        history.push({
            pathname: path,
        });
    }
    
    const lessonElements: (JSX.Element | null)[] = exercise_submission.exercise_gradeds.map((exercise, index) => {
        //console.log(strDate.replaceAll("T", " ").substring(0,16))
        if (!exercise) { return null; }
        return (<tr className={`table-row`}
            key={`lesson_${index}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.exercise_name}</td>
            <td className="data-table">{exercise.time}</td>
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

export default ExerciseSectionList1;
