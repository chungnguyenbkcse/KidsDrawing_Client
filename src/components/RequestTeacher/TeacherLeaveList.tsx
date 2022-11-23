import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ITeacherLeaveState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { toast } from "react-toastify";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};


function TeacherLeaveList(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);

    const history = useHistory();
    const onChangeRoute = (student_leave: ITeacherLeave) =>{ 
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', student_leave.description)
        let path = '/student-leave/detail'; 
        history.push({
            pathname: path,
        });
    }

    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const updateStatusTeacherLeave = (status: string) => {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        dispatch(putTeacherLeaveStatus(id, {
            status: status
        }, idx))
    }
    
    const lessonElements: (JSX.Element | null)[] = teacher_leaves.leaves.map((exercise, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!exercise) { return null; }
        return (<tr className={`table-row`}
            key={`lesson_${exercise.id}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.class_name}</td>
            <td className="data-table">{exercise.section_name}</td>
            <td className="data-table">{exercise.teacher_name}</td>
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
                        updateStatusTeacherLeave("Approved")
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
                        updateStatusTeacherLeave("Not approved")
                    }}
                >
                    Hủy
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
                            <th scope="col" className="name-row-table">Giáo viên</th>
                            <th scope="col" className="name-row-table">Thời gian dạy</th>
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

export default TeacherLeaveList;
