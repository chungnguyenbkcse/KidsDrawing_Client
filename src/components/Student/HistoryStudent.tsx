import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";
import { useHistory } from "react-router-dom";

export type userListProps = {
    onSelect?: (user: IUser) => void;
    children?: React.ReactNode;
};

const data = [
    {
        'id': "",
        'class_name': 'CM-1',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
    {
        'id': "",
        'class_name': 'CM-2',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
    {
        'id': "",
        'class_name': 'CM-3',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
]

function HistoryStudent(props: userListProps): JSX.Element {
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const history = useHistory();

    const routeChange = () => {
        let path = '/students/detail';
        history.push(path);
    }

    const userElements: (JSX.Element | null)[] = data.map(user => {
        if (!user) { return null; }
        return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === user.id) ? "selected" : ""}`}
            onClick={routeChange}
            key={`user_${user.id}`}>
            <th scope="row">{user.id}</th>
            <td>{user.class_name}</td>
            <td>{user.course_name}</td>
            <td>{user.semester}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mã lớp</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Học kì</th>
                    </tr>
                </thead>
                <tbody>
                    {userElements}
                </tbody>
            </table>
        </div>

    );
}

export default HistoryStudent;
