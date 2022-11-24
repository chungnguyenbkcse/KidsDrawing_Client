import React, { ChangeEvent, Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putAttendance } from "../../common/service/Attendance/PutAttendance";
import { ILesson } from "../../store/models/lesson.interface";
import { IAttendanceState, IStateType } from "../../store/models/root.interface";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

type Options = {
    id: any;
    student_id: number;
    section_id: number;
    status: boolean;
}

/* let data = [
    {
        id: 1,
        student_name: 'A',
        student_id: 1,
        section_id: 1,
        section_number: 1,
        course_name: '',
        email: ''
    },
    {
        id: 2,
        student_name: 'B',
        student_id: 1,
        section_id: 1,
        section_number: 1,
        course_name: '',
        email: ''
    },
    {
        id: 3,
        student_id: 1,
        section_id: 1,
        student_name: 'C',
        section_number: 1,
        course_name: '',
        email: ''
    }
] */

function AttendanceList(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const attendances: IAttendanceState = useSelector((state: IStateType) => state.attendances);

    let lst: Options[] = [];

    if (attendances.attendances.length > 0) {
        attendances.attendances.map((ele, idx) => {
            return lst.push({
                id: ele.id,
                student_id: ele.student_id,
                section_id: ele.section_id,
                status: false
            })
        })
    }

    function onValueChanged(event: ChangeEvent<HTMLInputElement>, id: any): void {
        lst.map((ele, idx) => {
            if (ele.id === id) {
                ele.status = !ele.status;
            }
            return ele
        })

        console.log(lst)
    }

    console.log(lst)
    
    const lessonElements: (JSX.Element | null)[] = attendances.attendances.map((exercise, index) => {
        //console.log(strDate.replaceAll("T", " ").substring(0,16))
        if (!exercise) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${index}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.student_name}</td>
            <td className="data-table">{exercise.email}</td>
            <td className="data-table">{exercise.course_name}</td>
            <td className="data-table">{exercise.section_number}</td>
            <td>
                <input type="checkbox" defaultChecked={exercise.status} onChange={(e) => {onValueChanged(e, exercise.id)}}/>
            </td>
        </tr>);
    });

    function handlePutAttendance() {
        lst.map((ele, idx) => {
            return dispatch(putAttendance({
                student_id: ele.student_id,
                section_id: ele.section_id,
                status: ele.status
            }, ele.id))
        })

        toast.success("Điểm danh thành công!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }


    return (
        <Fragment>
            <div className="table-responsive portlet">
                <table className="table">
                    <thead id="table-thread-exercise-section">
                        <tr>
                            <th scope="col" className="name-row-table">#</th>
                            <th scope="col" className="name-row-table">Tên học sinh</th>
                            <th scope="col" className="name-row-table">Email</th>
                            <th scope="col" className="name-row-table">Khóa học</th>
                            <th scope="col" className="name-row-table">Buổi</th>
                            <th scope="col" className="name-row-table">Điểm danh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessonElements}
                        <tr className={`table-row `}>
                            <button
                                className="btn btn-success ml-2"
                                id="btn-into-room"
                                onClick={() => {handlePutAttendance()}}
                            >
                                Gửi
                            </button>
                            </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default AttendanceList;
