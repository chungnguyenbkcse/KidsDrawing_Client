import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IAnonymousNotificationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import TextInput from "../../common/components/TextInput";
import { editAnonymousNotification, clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { OnChangeModel, IAnonymousNotificationFormState } from "../../common/types/Form.types";
import { postNotificationByClass } from "../../common/service/Notification/PostNotificationByClass";
import { toast } from "react-toastify";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
    data?: any;
};


function NotificationClassTeacher(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    let notification: IAnonymousNotification | null = notifications.selectedAnonymousNotification;
    const isCreate: boolean = (notifications.modificationState === AnonymousNotificationModificationStatus.Create);

    if (!notification || isCreate) {
        notification = { id: 0, name: "", description: "", time: "" };
    }

    var id_x = localStorage.getItem('class_id');
    let class_id = 0
    if (id_x !== null) {
        class_id = parseInt(id_x)
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: notification.name },
        description: { error: "", value: notification.description },
        type_send: { error: "", value: "Chon gửi tới" },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }



    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        const idx = toast.loading("Đang gửi thông báo. Vui lòng đợi trong giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        props.isCheck(false);
        let saveUserFn: Function = addAnonymousNotification;
        saveForm(formState, saveUserFn, idx);
    }

    function saveForm(formState: IAnonymousNotificationFormState, saveFn: Function, idx: any): void {
        if (notification) {
            if (saveFn === addAnonymousNotification) {
                if (props.data === undefined || props.data === null) {
                    return 
                }
                else {
                    dispatch(postNotificationByClass(class_id,{
                        subject: formState.name.value,
                        msgBody: formState.description.value
                    }, idx))

                    console.log({
                        name: formState.name.value,
                        description: formState.description.value,
                        type_send: class_id
                    })
                }
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
        return (formState.name.error || !formState.name.value) as boolean;
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
                                    <TextInput id="input_email"
                                        value={formState.name.value}
                                        field="name"
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={20}
                                        label="Tiêu đề"
                                        placeholder="" />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100}
                                        label="Nội dung"
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

export default NotificationClassTeacher;
