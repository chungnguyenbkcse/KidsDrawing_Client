import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import TextInput from "../../common/components/TextInput";
import { clearSelectedAnonymousNotification, setModificationStateAnonymousNotification, addAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { OnChangeModel } from "../../common/types/Form.types";
import { toast, ToastContainer } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { putClassHasRegisterJoinSemester } from "../../common/service/ClassHasRegisterJoinSemester/PutClassHasRegisterJoinSemesterStudent";
import { useHistory } from "react-router-dom";


function ReviewStart(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();

    const [formState, setFormState] = useState({
        review: { error: "", value: "" }
    });

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    
    useEffect(() => {
        dispatch(updateCurrentPath("Đánh giá", ""));
    }, [path.area, dispatch]);

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        let saveUserFn: Function =  addAnonymousNotification ;
        saveForm(saveUserFn);
    }

    function saveForm(saveFn: Function): void {
            const idx = toast.loading("Đang xử lý yêu cầu. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            console.log(idx)
            dispatch(putClassHasRegisterJoinSemester({
                classes_id: localStorage.getItem('class_id'),
                user_register_join_semester_id: localStorage.getItem('user_register_join_semester_id'),
                student_feedback: formState.review.value,
                review_star: rating
            }, idx))

            setTimeout(function () {
                routeHome();
            }, 2000);

            dispatch(clearSelectedAnonymousNotification());
            dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.None));
    }

    function cancelForm(): void {
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.review.error || !formState.review.value ) as boolean;
    }

    const [rating, setRating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate: number) => {
      setRating(rate)
      // other logic
    }

    const history = useHistory();
    function routeHome() {
        let path = `/classes`;
        history.push(path);
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
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

export default ReviewStart;
