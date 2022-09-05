import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editTeacher, clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { OnChangeModel, IUser1FormState } from "../../common/types/Form.types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById } from "../../common/service/User/GetUserById";
import { putPassword } from "../../common/service/User/UpdatePassword";

export type teacherListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

function ChangePassword(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    
    const id = localStorage.getItem('id')
    let user_id: number = 0;
    if (id !== null) {
        user_id = parseInt(id)
    }
    useEffect(() => {
        getUserById(user_id)
    }, [dispatch, user_id])
    let user: IUser = users.teachers[0];
    const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

    if (!user || isCreate) {
        user = { id: 0, username: "", email: "", password: "", status: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 };
    }

    const [formState, setFormState] = useState({
        username: { error: "", value: user.username },
        email: { error: "", value: user.email },
        password: { error: "", value: "" },
        firstName: { error: "", value: user.firstName },
        lastName: { error: "", value: user.lastName },
        dateOfBirth: { error: "", value: user.dateOfBirth },
        profile_image_url: { error: "", value: user.profile_image_url },
        sex: { error: "", value: user.sex },
        phone: { error: "", value: user.phone },
        address: { error: "", value: user.address }
    });


    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        let saveUserFn: Function = (isCreate) ? addTeacher : editTeacher;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IUser1FormState, saveFn: Function): void {
        if (user) {
            const idx = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });

            dispatch(putPassword(user.id, {
                    pre_password: formState.username.value,
                    new_password: formState.phone.value
            }, idx));
            
            dispatch(clearSelectedUser());
            dispatch(setModificationState(UserModificationStatus.None));

        }
    }


    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.username.error || formState.phone.error
            || !formState.username.value || !formState.phone.value ) as boolean;
    }




    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Thay đổi mật khẩu</h6>
                        </div>
                        <ToastContainer />
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextInput id="input_username"
                                        field="username"
                                        value={formState.username.value}
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={100}
                                        label="Mật khẩu cũ"
                                        placeholder="" />
                                </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_phone"
                                            field="phone"
                                            value={formState.phone.value}
                                            onChange={hasFormValueChanged}
                                            required={true}
                                            maxLength={200}
                                            label="Mật khẩu mới"
                                            placeholder="" />
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ChangePassword;
