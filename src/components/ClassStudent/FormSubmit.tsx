import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { editTeacher, setModificationState } from "../../store/actions/users.action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postExerciseSubmission } from "../../common/service/ExerciseSubmission/PostExerciseSubmission";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useHistory } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";

function FormSubmit(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.selectedUser;

    const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

    if (!user || isCreate) {
        user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0, parent: "", student_ids: [], student_names: [] }
    }

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


    async function saveUser(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        var url = await setImageAction();
        let saveUserFn: Function = editTeacher;
        saveForm(saveUserFn, url, idx);
    }

    const history = useHistory();
    function routeHome() {
        history.push({
            pathname: "/classes/detail-student"
        });
    }

    function saveForm(saveFn: Function, url: string, idx: any): void {
        if (user) {
            dispatch(postExerciseSubmission({
                student_id: id,
                exercise_id: exercise_id,
                image_url: url
            }, idx, routeHome))
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
        setImage(null)
        setPreview("")
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (preview === null || preview === "") as boolean;
    }

    const src = user.profile_image_url;

    const [preview, setPreview] = useState("")

    const [image, setImage] = useState<any>();

    const uploadPicture = (e: any) => {
        setImage({
            /* contains the preview, if you want to show the picture to the user
                you can access it with this.state.currentPicture
           */
            picturePreview: URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile: e.target.files[0]
        })
        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    async function setImageAction() {
        const formData = new FormData();
        formData.append(
            "gifFile",
            image.pictureAsFile
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

    function handleDrawing() {
        let path = '/drawing-1'; 
        history.push({
            pathname: path
        });
    }
    
    return (
        <Fragment>
            <ToastContainer />
            <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="col-xl-12 col-md-12 mb-4">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin bài tập</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {exercise_name}</p>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Nội dung: <span dangerouslySetInnerHTML={{ __html: exercise_description }}></span></p>
                                            </div>

                                           

                                            <div className="row no-gutters">
                                                <p id="phone">Hạn nộp: {deadline.replaceAll("T", " ").substring(0,16)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                <div className="row">
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow py-2`} >
                            <div className="card-body">
                                <div className="row no-gutters justify-content-left exercise-list">
                                    <h4 id="full-name">Nộp bài</h4>
                                </div>
                                <div className="row mx-auto">
                                    <form onSubmit={saveUser}>
                                        <div className="form-row">
                                            <div className="form-group pl-2">
                                                <label htmlFor="profile_image">Chọn ảnh:</label>
                                                <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                        <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài nộp của học sinh</h6>
                    </div>
                    <div className="card-body mx-auto">
                        {
                            function () {
                                if (preview === null || preview === "") {
                                    return (
                                        <p>Vui lòng chọn ảnh cần nộp!</p>
                                    )
                                }
                                else {
                                    return (
                                    <PhotoProvider>
                                        <PhotoView src={preview}>
                                            <img src={preview} alt="" className="center-x" />
                                        </PhotoView>
                                    </PhotoProvider>
                                    )
                                }
                            }()
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default FormSubmit;
