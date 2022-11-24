import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IStudentLeaveState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IStudentLeave } from "../../store/models/student_leave.interface";
import { toast } from "react-toastify";
import { putStudentLeaveStatus } from "../../common/service/StudentLeave/PutStudentLeave";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

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

    const handleStudentLeave = (student_leave: IStudentLeave, status: string) => {
        const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(putStudentLeaveStatus(student_leave.id, {
            status: status
        }, id))
    }
    
    const lessonElements: (JSX.Element | null)[] = student_leaves.leaves.map((exercise, index) => {
        //console.log(strDate.replaceAll("T", " ").substring(0,16))
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
            <td>
                <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={() => {
                        handleStudentLeave(exercise, "Approved")
                    }}
                >
                    Chấp nhận
                </button>
            </td>

            <td>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => {
                        handleStudentLeave(exercise, "Not approved")
                    }}
                >
                    Xóa
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
                            <th scope="col"></th>
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
