import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestTeacherState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IContestTeacher } from "../../store/models/contest_teacher.interface";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

function ContestTeacherEndList(props: lessonListProps): JSX.Element {
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);


    const history = useHistory();
    const onChangeRoute = (contest_teacher: IContestTeacher) =>{ 
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', contest_teacher.description)
        let path = '/student-leave/detail'; 
        history.push({
            pathname: path,
        });
    }

    
    const lessonElements: (JSX.Element | null)[] = contest_teachers.contest_end.map((exercise, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!exercise) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${exercise.id}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{exercise.name}</td>
            <td className="data-table">{exercise.art_age_name}</td>
            <td className="data-table">{exercise.art_type_name}</td>
            <td className="data-table">10</td>
            <td className="data-table">Chưa xong</td>
            <td className="data-table">{exercise.registration_time}</td>
            <td className="data-table">{exercise.end_time}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => {
                        onChangeRoute(exercise)
                    }}
                >
                    Chấm bài
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
                            <th scope="col" className="name-row-table">Tên cuộc thi</th>
                            <th scope="col" className="name-row-table">Thể loại</th>
                            <th scope="col" className="name-row-table">Độ tuổi</th>
                            <th scope="col" className="name-row-table">Số bài nộp cần chấm</th>
                            <th scope="col" className="name-row-table">Trạng thái chấm</th>
                            <th scope="col" className="name-row-table">Thời gian bắt đầu</th>
                            <th scope="col" className="name-row-table">Thời gian kết thúc</th>
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

export default ContestTeacherEndList;
