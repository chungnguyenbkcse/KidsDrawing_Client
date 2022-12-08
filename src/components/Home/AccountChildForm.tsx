import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IAnonymousNotificationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import TextInput from "../../common/components/TextInput";
import { editAnonymousNotification, clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { OnChangeModel } from "../../common/types/Form.types";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { toast } from "react-toastify";
import { postRegisterStudent } from "../../common/service/Aut/RegisterStudent";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    foo: () => void;
    children?: React.ReactNode;
};


function AccountChildForm(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    let notification: IAnonymousNotification | null = notifications.selectedAnonymousNotification;
    const isCreate: boolean = (notifications.modificationState === AnonymousNotificationModificationStatus.Create);

    if (!notification || isCreate) {
        notification = { id: 0, name: "", description: "", time: "" };
    }

    const [formState, setFormState] = useState({
        username: { error: "", value: "" },
        password: { error: "", value: "" },
        email: { error: "", value: "" },
        firstName: { error: "", value: "" },
        lastName: { error: "", value: "" },
        dateOfBirth: { error: "", value: "" },
        profile_image_url: { error: "", value: "" },
        sex: { error: "", value: "" },
        phone: { error: "", value: "" },
        address: { error: "", value: "" },
        parent_id: { error: "", value: "" },
        roleName: { error: "", value: "" },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        props.isCheck(false);
        let saveUserFn: Function = (isCreate) ? addAnonymousNotification : editAnonymousNotification;
        saveForm(saveUserFn);
    }

    function saveForm(saveFn: Function): void {
        if (notification) {
            const idx = toast.loading("Đang xử lý yêu cầu. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            
            if (saveFn === addAnonymousNotification) {
                (postRegisterStudent(dispatch, {
                    username: formState.username.value,
                    password: formState.password.value,
                    email: formState.email.value,
                    firstName: formState.firstName.value,
                    lastName: formState.lastName.value,
                    dateOfBirth: formState.dateOfBirth.value,
                    profile_image_url: null,
                    sex: formState.sex.value,
                    phone: formState.phone.value,
                    address: formState.address.value,
                    parent_id: localStorage.getItem('id'),
                    roleName: "STUDENT"
                }, idx))
            }

            dispatch(clearSelectedAnonymousNotification());
            dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.None));
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.username.error || !formState.username.value 
            || formState.email.error || !formState.email.value 
            || formState.password.error || !formState.password.value ) as boolean;
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} độ tuổi</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">
                                    <TextInput id="input_username"
                                        value={formState.username.value}
                                        field="username"
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={20000}
                                        label="Tên đăng nhập"
                                        placeholder="" />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_email"
                                        field="email"
                                        value={formState.email.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100000}
                                        label="Email"
                                        placeholder="" />
                                </div>

                                <div className="form-group">
                                    <TextInput id="input_password"
                                        field="password"
                                        value={formState.password.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100000}
                                        label="Mật khẩu"
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
