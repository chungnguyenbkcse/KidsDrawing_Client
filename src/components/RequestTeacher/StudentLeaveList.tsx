import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ILessonState, IStudentLeaveState } from "../../store/models/root.interface";
import { ILesson, LessonModificationStatus } from "../../store/models/lesson.interface";
import { setModificationState } from "../../store/actions/lesson.action";
import { useHistory } from "react-router-dom";
import { IStudentLeave } from "../../store/models/student_leave.interface";

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

function StudentLeaveList(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);


    const history = useHistory();
    const onChangeRoute = (student_leave: IStudentLeave) =>{ 
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', student_leave.description)
        let path = '/student-leave/detail'; 
        history.push({
            pathname: path,
        });
    }
    
    const lessonElements: (JSX.Element | null)[] = student_leaves.leaves.map((exercise, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!exercise) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${exercise.id}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.class_name}</td>
            <td className="data-table">{exercise.section_name}</td>
            <td className="data-table">{exercise.student_name}</td>
            <td className="data-table">{exercise.section_number}</td>
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
                            <th scope="col" className="name-row-table">Tên lớp</th>
                            <th scope="col" className="name-row-table">Buổi</th>
                            <th scope="col" className="name-row-table">Học sinh</th>
                            <th scope="col" className="name-row-table">Thời gian nghỉ</th>
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

export default StudentLeaveList;
