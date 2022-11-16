import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DetailExerciseStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    var id_y = localStorage.getItem('image_url_exercise');
    var image_url_exercise: string = "";
    if (id_y !== null) {
        image_url_exercise = id_y;
    }

    var id_z = localStorage.getItem('score');
    var score: number = 0;
    if (id_z !== null) {
        score = parseInt(id_z);
    }

    var id_t = localStorage.getItem('description');
    var description: string = "";
    if (id_t !== null) {
        description = id_t;
    }

    var id_h = localStorage.getItem('time_submit');
    var time_submit: string = "";
    if (id_h !== null) {
        time_submit = id_h;
    }

    var id_k = localStorage.getItem('feedback');
    var feedback: string = "";
    if (id_k !== null) {
        feedback = id_k;
    }

    let percentage = score * 10;


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4 form-review">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            {feedback}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài làm của bé</h6>
                        </div>
                        <div className="card-body">
                            <img className="img-exercise" src={image_url_exercise} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default DetailExerciseStudent;
