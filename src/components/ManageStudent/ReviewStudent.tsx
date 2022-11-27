import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IAnonymousNotificationState, IClassHasRegisterJoinSemesterState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { editAnonymousNotification, clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { IAnonymousNotificationFormState } from "../../common/types/Form.types";
import { toast } from "react-toastify";
import Editor from "../../common/components/Quill/EditReviewStudent";
import { putClassHasRegisterJoinSemesterTeacher } from "../../common/service/ClassHasRegisterJoinSemester/PutClassHasRegisterJoinSemesterTeacher";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
    data?: any;
};


function ReviewStudent(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const class_has_register_join_semester: IClassHasRegisterJoinSemesterState = useSelector((state: IStateType) => state.class_has_register_join_semesters);
    const notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    let notification: IAnonymousNotification | null = notifications.selectedAnonymousNotification;
    const isCreate: boolean = (class_has_register_join_semester.class_has_register_join_semesters.length === 0);

    if (!notification || isCreate) {
        notification = { id: 0, name: "", description: "", time: "" };
    }

    let formState = {
        name: { error: "", value: notification.name },
        description: { error: "", value: class_has_register_join_semester.class_has_register_join_semesters.length > 0 ? class_has_register_join_semester.class_has_register_join_semesters[0].teacher_feedback : "" },
        type_send: { error: "", value: "Chon gửi tới" },
    };

    var id_x = localStorage.getItem('class_id');
    let classes_id: number = 0;
    if (id_x !== null) {
        classes_id = parseInt(id_x)
    }

    var id_y = localStorage.getItem('student_id');
    let student_id: number = 0;
    if (id_y !== null) {
        student_id = parseInt(id_y)
    } 

    const [textHtml, setTextHtml] = useState<string>("")
    function getValue(value: string) {
      setTextHtml(value);
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
            const idx = toast.loading("Đang gửi thông báo. Vui lòng đợi trong giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            
            dispatch(putClassHasRegisterJoinSemesterTeacher({
                classes_id: classes_id,
                student_id: student_id,
                teacher_feedback: textHtml
            }, idx))

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
        return (textHtml === null) as boolean;
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} nhận xét</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                            <div className="form-group">
                              <label>Miêu tả</label>
                              <Editor getValue={getValue} isCreate={isCreate} setValue={formState.description.value} />
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

export default ReviewStudent;
