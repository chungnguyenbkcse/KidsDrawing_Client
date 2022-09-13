import React from "react";
import { useSelector } from "react-redux";
import TopCardAccount from "../../common/components/TopCardAccount";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { IUser } from "../../store/models/user.interface";

export type accountChildListProps = {
    onSelect?: (accountChild: IUser) => void;
    children?: React.ReactNode;
};

function AccountChildList(props: accountChildListProps): JSX.Element {
    const users: IUserState = useSelector((state: IStateType) => state.users);

    const accountChildElements: (JSX.Element | null)[] = users.students.map((ele, index) => {
        if (!ele) { return null; }
        return (
            <TopCardAccount 
                student_id={ele.id}
                fullname={ele.firstName + ele.lastName} 
                icon="user" class="primary" 
                birthday={ele.dateOfBirth}
                username={ele.username}
            />
        );
    });


    return (
        <>
            {accountChildElements}
        </>
    );
}

export default AccountChildList;
