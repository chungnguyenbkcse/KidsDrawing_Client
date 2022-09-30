import React from "react";
import { useSelector } from "react-redux";
import { IContestSubmissionState, IStateType, IUserGradeContestState } from "../../store/models/root.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface";
import { useHistory } from "react-router-dom";

export type user_grade_contestListProps = {
    onSelect?: (user_grade_contest: IUserRegisterJoinSemester) => void;
    children?: React.ReactNode;
};

function TopTeacher(props: user_grade_contestListProps): JSX.Element {
    const user_grade_contests: IUserGradeContestState = useSelector((state: IStateType) => state.user_grade_contests);
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    
    const history = useHistory();

    const routeChange = () => {
        let path = '/courses/detail';
        history.push(path);
    }


    let total = Math.round((contest_submissions.contest_gradeds.length+ contest_submissions.contest_not_gradeds.length) / user_grade_contests.userGradeContests.length);
    const user_grade_contestElements: (JSX.Element | null)[] = user_grade_contests.userGradeContests.map((user_grade_contest, index) => {
        if (!user_grade_contest) { return null; }
        if (index === user_grade_contests.userGradeContests.length - 1){
            return (<tr className={`table-row `}
                key={`user_grade_contest_${index}`}>
                <th scope="row">{index + 1}</th>
                <td onClick={routeChange}>{user_grade_contest.teacher_name}</td>
                <th scope="row">{(contest_submissions.contest_gradeds.length+ contest_submissions.contest_not_gradeds.length) - total*index}</th>
                <th scope="row"></th>
            </tr>);
        }
        return (<tr className={`table-row }`}
            key={`user_grade_contest_${index}`}>
            <th scope="row">{index + 1}</th>
            <td onClick={routeChange}>{user_grade_contest.teacher_name}</td>
            <th scope="row">{total}</th>
            <th scope="row"></th>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số bài được giao</th>
                        <th scope="col">Đã chấm</th>
                    </tr>
                </thead>
                <tbody>
                    {user_grade_contestElements}
                </tbody>
            </table>
        </div>

    );
}

export default TopTeacher;
