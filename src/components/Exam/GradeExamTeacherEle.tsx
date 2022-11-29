import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./GradeExamTeacher.css"
import 'react-circular-progressbar/dist/styles.css';
import TextInput from "../../common/components/TextInput";
import { useHistory } from "react-router-dom";
import { OnChangeModel } from "../../common/types/Form.types";
import NumberInput from "../../common/components/NumberInput";
import { postUserGradeExercise } from "../../common/service/UserGradeExercise/PostUserGradeExercise";
import { toast, ToastContainer } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const GradeExamTeacherEle: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    let user_grade_exercise_submission = {
        feedback: "",
        score: 0
    }

    const [formState, setFormState] = useState({
        feedback: { error: "", value: user_grade_exercise_submission.feedback },
        score: { error: "", value: user_grade_exercise_submission.score },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveForm() {
        const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        dispatch(postUserGradeExercise({
            teacher_id: localStorage.getItem('id'),
            exercise_submission_id: localStorage.getItem('exercise_submission_id'),
            score: formState.score.value,
            feedback: formState.feedback.value
        }, id))

    }

    var id_y = localStorage.getItem('exercise_id');
    let exercise_id = 0;

    if (id_y !== null) {
        exercise_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('exercise_name');
    let exercise_name = "";

    if (id_z !== null) {
        exercise_name = id_z;
    }

    var id_k = localStorage.getItem('image_url_exercise_submission');
    let image_url_exercise_submission = "";

    if (id_k !== null) {
        image_url_exercise_submission = id_k;
    }

    var id_h = localStorage.getItem('time_submit');
    let time_submit = "";

    if (id_h !== null) {
        time_submit = id_h;
    }

    var id_t = localStorage.getItem('student_name');
    let student_name = "";

    if (id_t !== null) {
        student_name = id_t;
    }



    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);

    const history = useHistory();

    const routeChange1 = () => {
        let path = '/exercise/result-grade';
        history.push({
            pathname: path,
        });
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <div className="card-body">
                        <PhotoProvider>
                            <PhotoView src={image_url_exercise_submission}>
                                <img src={image_url_exercise_submission} alt="" className="center-x" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="row">
                        <div className={`card shadow h-100 py-2 ml-4 mr-4`} id="topcard-user">
                            <div className="card-body">
                                <div className="row no-gutters justify-content-left">
                                    <h4 id="full-name">Thông tin bài nộp</h4>
                                </div>
                                <div className="row no-gutters justify-content-left">
                                    <p id="username-teacher">Tên học sinh: {student_name}</p>
                                </div>
                                <div className="row no-gutters justify-content-left">
                                    <p id="username-teacher">Thời gian nộp: {time_submit.replaceAll("T", " ").substring(0,16)}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row mt-4 ml-4">
                        <NumberInput
                            id="input_score"
                            value={formState.score.value}
                            field="score"
                            onChange={hasFormValueChanged}
                            max={10}
                            min={0}
                            label="Nhập điểm"
                        />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <TextInput id="input_feedback"
                                    field="feedback"
                                    value={formState.feedback.value}
                                    onChange={hasFormValueChanged}
                                    required={false}
                                    maxLength={100}
                                    label=""
                                    placeholder=""
                                />
                            </div>
                            <button className="btn btn-warning" onClick={() => { saveForm() }}>Lưu</button>
                            <button className={`btn btn-success left-margin`} onClick={() => { routeChange1() }}>Hoàn thành</button>

                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default GradeExamTeacherEle;
