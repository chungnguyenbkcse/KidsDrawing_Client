import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestStudentState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IContestStudent } from "../../store/models/contest_student.interface";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

function ContestStudentEndList(props: lessonListProps): JSX.Element {
    const contest_students: IContestStudentState = useSelector((state: IStateType) => state.contest_students);
    
    const history = useHistory();

    const routeChange = (contest: IContestStudent) => {
        let path = '/contest/result-grade';
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', contest.id.toString())
        history.push({
            pathname: path
        });
    }

    const lessonElements: (JSX.Element | null)[] = contest_students.contest_end.map((contest, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!contest) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${contest.id}`} onClick={() => {routeChange(contest)}}>
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{contest.name}</td>
            <td className="data-table">{contest.art_age_name}</td>
            <td className="data-table">{contest.art_type_name}</td>
            <td className="data-table">{contest.student_name}</td>
            <td className="data-table">{contest.total_register_contest}</td>
            <td className="data-table">{contest.total_contest_submission - contest.total_contest_submission_graded > 0 ? "Chưa xong": "Da xong"}</td>
            <td className="data-table">{contest.registration_time}</td>
            <td className="data-table">{contest.end_time}</td>
        </tr>);
    });


    return (
        <Fragment>
            <div className="table-responsive portlet">
                <table className="table">
                    <thead id="table-thread-contest-section">
                        <tr>
                            <th scope="col" className="name-row-table">#</th>
                            <th scope="col" className="name-row-table">Tên cuộc thi</th>
                            <th scope="col" className="name-row-table">Thể loại</th>
                            <th scope="col" className="name-row-table">Độ tuổi</th>
                            <th scope="col" className="name-row-table">Bé tham gia</th>
                            <th scope="col" className="name-row-table">Số bé tham gia</th>
                            <th scope="col" className="name-row-table">Trạng thái</th>
                            <th scope="col" className="name-row-table">Thời gian bắt đầu</th>
                            <th scope="col" className="name-row-table">Thời gian kết thúc</th>
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

export default ContestStudentEndList;
