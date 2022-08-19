import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IAnonymousNotificationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import TextInput from "../../common/components/TextInput";
import { editAnonymousNotification, clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IAnonymousNotificationFormState } from "../../common/types/Form.types";
import { postAnonymousNotification } from "../../common/service/AnonymousNotification/PostAnonymousNotification";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import SelectInput from "../../common/components/Select";
import SelectKeyValue from "../../common/components/SelectKeyValue";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

const data =  [
    
]

function TeachAgeForm(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    let notification: IAnonymousNotification | null = notifications.selectedAnonymousNotification;
    const isCreate: boolean = (notifications.modificationState === AnonymousNotificationModificationStatus.Create);

    if (!notification || isCreate) {
        notification = { id: 0, name: "", description: "", time: "" };
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
        props.isCheck(false);
        let saveUserFn: Function = (isCreate) ? addAnonymousNotification : editAnonymousNotification;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IAnonymousNotificationFormState, saveFn: Function): void {
        if (notification) {
            if (saveFn === addAnonymousNotification) {
                dispatch(postAnonymousNotification(formState.type_send.value, {
                    name: formState.name.value,
                    description: formState.description.value
                }))
            }

            console.log({
                name: formState.name.value,
                description: formState.description.value,
                type_send: formState.type_send
            })

            dispatch(addNotification("Thông báo ", `${formState.name.value} gửi bởi bạn`));
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
                                        label="Tên"
                                        placeholder="" />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100}
                                        label="Miêu tả"
                                        placeholder="" />
                                </div>

                                <div className="form-row">
                                <div className="form-group col-md-6">
                                    <SelectKeyValue id="input_type_send"
                                        field="type_send"
                                        value={formState.type_send.value}
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        label="Thuộc khóa học"
                                        options={[
                                            {
                                                name: "Toàn hệ thống",
                                                value: "all"
                                            },
                                            {
                                                name: "Chỉ giáo viên",
                                                value: "teacher"
                                            },
                                            {
                                                name: "Học viên và phụ huynh",
                                                value: "student"
                                            }
                                        ]}
                                    />
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

export default TeachAgeForm;
