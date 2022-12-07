import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IChildState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { editChild, clearSelectedChild, setModificationState, addChild } from "../../store/actions/child.action";
import { OnChangeModel } from "../../common/types/Form.types";
import { toast } from "react-toastify";
import { IChild, ChildModificationStatus } from "../../store/models/child.interface";
import TextInput from "../../common/components/TextInput";
import { postUser } from "../../common/service/User/PostUser";

export type lessonListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}

function AccountChildForm(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const childs: IChildState | null = useSelector((state: IStateType) => state.childs);
    let user: IChild | null = childs.selectedChild;
    const isCreate: boolean = (childs.modificationState === ChildModificationStatus.Create);

    if (!user || isCreate) {
        user = { id: 0, total_contest: 0, total_course: 0,  username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 }
    }

    const [formState, setFormState] = useState({
        username: { error: "", value: user.username },
        email: { error: "", value: user.email },
        password: { error: "", value: user.password },
        birthday: { error: "", value: user.dateOfBirth }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        props.isCheck(false);

        let saveUserFn: Function = (isCreate) ? addChild : editChild;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: any, saveFn: Function): void {
        if (user) {

            const idx = toast.loading("Yêu cầu đang được gửi. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });

            if (saveFn === addChild) {
                dispatch(postUser({
                    username: formState.username.value,
                    password: formState.password.value,
                    email: formState.email.value,
                    firstName: null,
                    lastName: null,
                    dateOfBirth: formState.birthday.value,
                    profile_image_url: null,
                    sex: null,
                    phone: null,
                    address: null,
                    parent_id: localStorage.getItem('id'),
                    roleName: "STUDENT"
                }, idx))
            }

            console.log(saveFn)

            dispatch(clearSelectedChild());
            dispatch(setModificationState(ChildModificationStatus.None));
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
        dispatch(setModificationState(ChildModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.username.error || formState.email.error || formState.password.error
            || !formState.username.value || !formState.email.value || !formState.password.value) as boolean;
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green" id="header-form-teacher-level">Đăng kí tài khoản con</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">

                                    <TextInput id="input_username"
                                        field="username"
                                        value={formState.username.value}
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={100}
                                        label="Tên đăng nhập"
                                        placeholder="" />
                                </div>

                                <div className="form-group">

                                    <TextInput id="input_email"
                                        field="email"
                                        value={formState.email.value}
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={100}
                                        label="Email"
                                        placeholder="" />
                                </div>

                                <div className="form-group">
                                    <TextInput id="input_password"
                                        field="password"
                                        value={formState.password.value}
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={100}
                                        type="password"
                                        label="Mật khẩu"
                                        placeholder="" />
                                </div>
                                <div className="form-group">

                                    <TextInput id="input_birthday"
                                        field="birthday"
                                        value={formState.birthday.value}
                                        onChange={hasFormValueChanged}
                                        type="date"
                                        required={true}
                                        maxLength={100}
                                        label="Ngày sinh"
                                        placeholder="" />
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

export default AccountChildForm;
