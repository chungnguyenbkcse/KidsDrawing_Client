import React, { ChangeEvent, Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putAttendance } from "../../common/service/Attendance/PutAttendance";
import { putAttendance1 } from "../../common/service/Attendance/PutAttendance1";
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

    var id_k = localStorage.getItem('is_active');
    var is_active = "";
    if (id_k !== null) {
        is_active = (id_k);
    }

    var id_kx = localStorage.getItem('form_teaching');
    var form_teaching = "";
    if (id_kx !== null) {
        form_teaching = (id_kx);
    }

    let lst: Options[] = [];

    if (attendances.attendances.length > 0) {
        attendances.attendances.map((ele, idx) => {
            return lst.push({
                id: ele.id,
                student_id: ele.student_id,
                section_id: ele.section_id,
                status: ele.status
            })
        })
    }

    function onValueChanged(event: ChangeEvent<HTMLInputElement>, student_id: number, section_id: number): void {
        lst.map((ele, idx) => {
            if (ele.student_id === student_id && ele.section_id === section_id) {
                ele.status = event.target.checked;
            }
            return ele
        })

        console.log(lst)
    }

    console.log(lst)
    
    const lessonElements: (JSX.Element | null)[] = attendances.attendances.map((attendance, index) => {
        //console.log(strDate.replaceAll("T", " ").substring(0,16))
        if (!attendance) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${index}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{attendance.student_name}</td>
            <td className="data-table">{attendance.email}</td>
            <td className="data-table">{attendance.course_name}</td>
            <td className="data-table">{attendance.section_number}</td>
            <td>
                <input type="checkbox" defaultChecked={attendance.status} onChange={(e) => {onValueChanged(e, attendance.student_id, attendance.section_id)}}/>
            </td>
        </tr>);
    });

    const lessonElement1s: (JSX.Element | null)[] = attendances.attendances.map((attendance, index) => {
        //console.log(strDate.replaceAll("T", " ").substring(0,16))
        if (!attendance) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${index}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{attendance.student_name}</td>
            <td className="data-table">{attendance.email}</td>
            <td className="data-table">{attendance.course_name}</td>
            <td className="data-table">{attendance.section_number}</td>
            <td>
                <input type="checkbox" defaultChecked={attendance.status} disabled/>
            </td>
        </tr>);
    });

    function handlePutAttendance() {
        const idxx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        lst.map((ele, idx) => {
            if (idx === lst.length - 1) {
                return putAttendance1(dispatch, {
                    student_id: ele.student_id,
                    section_id: ele.section_id,
                    status: ele.status
                }, idxx)
            }
            else {
                return dispatch(putAttendance({
                    student_id: ele.student_id,
                    section_id: ele.section_id,
                    status: ele.status
                }))
            }
        })
    }


    return (
        <Fragment>
            <div className="table-responsive portlet">
                <table className="table">
                    <thead id="table-thread-attendance-section">
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
                        {
                            is_active == "not_active" || form_teaching == "false" ? lessonElement1s : lessonElements
                        }
                        
                        {
                            is_active == "not_active" || form_teaching == "false" ? "" : <tr className={`table-row `}>
                            <button
                                className="btn btn-success ml-2"
                                id="btn-into-room"
                                onClick={() => {handlePutAttendance()}}
                            >
                                Gửi
                            </button>
                            </tr>
                        }
                        
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default AttendanceList;
