import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import { IUserRegisterJoinSemester } from "../../store/models/user_register_join_semester.interface";
import { useHistory } from "react-router-dom";

export type user_register_semesterListProps = {
    onSelect?: (user_register_semester: IUserRegisterJoinSemester) => void;
    children?: React.ReactNode;
};


function TopStudent(props: user_register_semesterListProps): JSX.Element {
    const user_gradee_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const history = useHistory();

    const routeChange = () => {
        let path = '/semester-class/detail';
        history.push(path);
    }


    const user_register_semesterElements: (JSX.Element | null)[] = user_gradee_contest_submissions.userGradeContestSubmissions.map((user_register_semester, index) => {
        if (!user_register_semester) { return null; }
        return (<tr className={`table-row`}
            key={`user_register_semester_${index}`}>
            <th scope="row">{index + 1}</th>
            <td onClick={routeChange}>{user_register_semester.student_name}</td>
            <td onClick={routeChange}>{user_register_semester.score}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {user_register_semesterElements}
                </tbody>
            </table>
        </div>

    );
}

export default TopStudent;
