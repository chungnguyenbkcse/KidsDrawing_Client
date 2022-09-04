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
        localStorage.removeItem("contest_id")
        localStorage.setItem('contest_id', contest_teacher.id.toString())
        localStorage.removeItem("contest_name")
        localStorage.setItem('contest_name', contest_teacher.name)
        localStorage.removeItem("contest_description")
        localStorage.setItem('contest_description', contest_teacher.description)
        localStorage.removeItem("max_participant")
        localStorage.setItem('max_participant', contest_teacher.max_participant.toString())
        localStorage.removeItem("art_type_contest")
        localStorage.setItem('art_type_contest', contest_teacher.art_type_name)
        localStorage.removeItem("art_age_contest")
        localStorage.setItem('art_age_contest', contest_teacher.art_age_name)
        localStorage.removeItem("registration_time")
        localStorage.setItem('registration_time', contest_teacher.registration_time)
        localStorage.removeItem("start_time")
        localStorage.setItem('start_time', contest_teacher.start_time)
        localStorage.removeItem("end_time")
        localStorage.setItem('end_time', contest_teacher.end_time)
        let path = '/contests/detail'; 
        history.push({
            pathname: path,
        });
    }

    
    const lessonElements: (JSX.Element | null)[] = contest_teachers.contest_end.map((contest, index) => {
        //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
        if (!contest) { return null; }
        return (<tr className={`table-row `}
            key={`lesson_${contest.id}`} >
            <th scope="row" className="data-table">{index + 1}</th>
            <td className="data-table">{contest.name}</td>
            <td className="data-table">{contest.art_age_name}</td>
            <td className="data-table">{contest.art_type_name}</td>
            <td className="data-table">{contest.total_contest_submission - contest.total_const_submission_graded}</td>
            <td className="data-table">{contest.total_contest_submission - contest.total_const_submission_graded > 0 ? "Chưa xong": "Da xong"}</td>
            <td className="data-table">{contest.registration_time}</td>
            <td className="data-table">{contest.end_time}</td>
            {
                function () {
                    if (contest.total_contest_submission - contest.total_const_submission_graded > 0){
                        return (
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        onChangeRoute(contest)
                                    }}
                                >
                                    Chấm bài
                                </button>
                            </td>
                        )
                    }
                }()
            }
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
