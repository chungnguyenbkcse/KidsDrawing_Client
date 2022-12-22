import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ILessonState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeLesson, clearSelectedLesson, setModificationState,
    changeSelectedLesson
} from "../../store/actions/lesson.action";
import { LessonModificationStatus, ILesson } from "../../store/models/lesson.interface";
import { deleteLesson } from "../../common/service/Lesson/DeleteLesson";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import DrawingBoard from "react-drawing-board"
import { useHistory } from "react-router-dom";
import { putExerciseSubmission } from "../../common/service/ExerciseSubmission/PutExerciseSubmissionById";
import { postExerciseSubmission } from "../../common/service/ExerciseSubmission/PostExerciseSubmission";


const Drawing1: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = lessons.lessons.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { promiseInProgress } = usePromiseTracker();

    var id_x = localStorage.getItem("exercise_description");
    let exercise_description: string = "";
    if (id_x !== null) {
        exercise_description = id_x;
    }

    var id_y = localStorage.getItem("id");
    let id: number = 0;
    if (id_y !== null) {
        id = parseInt(id_y);
    }

    var id_y = localStorage.getItem('exercise_submission_id');
    var exercise_submission_id: number = 0;
    if (id_y !== null) {
        exercise_submission_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem("exercise_id");
    let exercise_id: number = 0;
    if (id_z !== null) {
        exercise_id = parseInt(id_z);
    }

    var id_k = localStorage.getItem("exercise_name");
    let exercise_name = "";
    if (id_k !== null) {
        exercise_name = (id_k);
    }

    var id_h = localStorage.getItem("exercise_level_name");
    let exercise_level_name = "";
    if (id_h !== null) {
        exercise_level_name = (id_h);
    }

    var id_i = localStorage.getItem("deadline");
    let deadline = "";
    if (id_i !== null) {
        deadline = (id_i);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("url_exercise_submission");
    let url_exercise_submission = "";
    if (id_j !== null) {
        url_exercise_submission = (id_j);
    }

    useEffect(() => {
        dispatch(clearSelectedLesson());
        dispatch(updateCurrentPath("Vẽ online", ""));
    }, [path.area, dispatch]);

    function onLessonSelect(lesson: ILesson): void {
        dispatch(changeSelectedLesson(lesson));
        onLessonRemove();
        dispatch(setModificationState(LessonModificationStatus.None));
    }

    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    const [preview, setPreview] = useState("")

    const [image, setImage] = useState<any>();

    async function saveUser(urlx: any): Promise<void> {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        var url = await setImageAction(urlx);
        saveForm(url, idx);
    }

    const history = useHistory();
    function routeHome() {
        history.push({
            pathname: "/exercise-submission/view"
        });
    }

    function saveForm(url: string, idx: any): void {
        if (url) {
            dispatch(postExerciseSubmission({
                student_id: id,
                exercise_id: exercise_id,
                image_url: url
            }, idx, routeHome))
        }
    }


    const uploadPicture = (dataUrl: string) => {
        setImage({
            pictureAsFile: dataUrl
        })
    };

    async function setImageAction(url: any) {
        const formData = new FormData();
        formData.append(
            "gifFile",
            url
        );
        // do your post request
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/cloudinary/gifs`, {
            method: "POST",
            body: formData
        }
        )
        const data = await res.json()
        return data.url_image

    };


    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-body">
                            <DrawingBoard style={{width: "100%"}} onSave={(image: { canvas: HTMLCanvasElement, dataUrl: string }) => {
                                var blobBin = atob(image.dataUrl.split(',')[1]);
                                var array = [];
                                for(var i = 0; i < blobBin.length; i++) {
                                    array.push(blobBin.charCodeAt(i));
                                }
                                var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
                                saveUser(file)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default Drawing1;
