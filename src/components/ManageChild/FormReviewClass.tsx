import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import TextInput from "../../common/components/TextInput";
import { clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { OnChangeModel } from "../../common/types/Form.types";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { putReviewClassByStudent } from "../../common/service/ClassHasRegisterJoinSemester/PutReviewClassByStudent";
import { IClassHasRegisterJoinSemester } from "../../store/models/class_has_register_join_semester.interface";
import { IClassHasRegisterJoinSemesterState, IStateType } from "../../store/models/root.interface";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};


function FormReviewClass(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const class_has_register_join_semester: IClassHasRegisterJoinSemesterState = useSelector((state: IStateType) => state.class_has_register_join_semesters);

    const [formState, setFormState] = useState({
        review_start: { error: "", value: 0 },
        review: { error: "", value: class_has_register_join_semester.class_has_register_join_semesters.length > 0 ? class_has_register_join_semester.class_has_register_join_semesters[0].student_feedback : "" }
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
        let saveUserFn: Function =  addAnonymousNotification ;
        saveForm(saveUserFn);
    }

    var id_x = localStorage.getItem('class_id');
    let class_id = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x)
    }

    var id_y = localStorage.getItem('id');
    let id = 0;
    if (id_y !== null) {
        id = parseInt(id_y)
    }

    function saveForm(saveFn: Function): void {
            const idx = toast.loading("Đang xử lý yêu cầu. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            
            if (saveFn === addAnonymousNotification) {
                console.log(idx)
                let x = {
                    classes_id: class_id,
                    parent_id: id,
                    student_feedback: formState.review.value,
                    review_star: rating
                }

                console.log(x)

                dispatch(putReviewClassByStudent(x, idx))
            }

            dispatch(clearSelectedAnonymousNotification());
            dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.None));
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
        return (rating === null || rating === undefined
            || formState.review.error || !formState.review.value ) as boolean;
    }

    const [rating, setRating] = useState(class_has_register_join_semester.class_has_register_join_semesters.length > 0 ? class_has_register_join_semester.class_has_register_join_semesters[0].review_star : 0) // initial rating value

    // Catch Rating value
    const handleRating = (rate: number) => {
      setRating(rate)
      // other logic
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Tạo nhận xét lớp</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">
                                    <label>Đánh giá</label>
                                    <Rating
                                      onClick={handleRating}
                                      ratingValue={rating}
                                      showTooltip
                                      tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_review"
                                        value={formState.review.value}
                                        field="review"
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={20000}
                                        label="Nhận xét"
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

export default FormReviewClass;
