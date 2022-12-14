import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IChildsClassState, IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { addTeacher, editTeacher, setModificationState } from "../../store/actions/users.action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postContestSubmission } from "../../common/service/ContestSubmission/PostContestSubmission";
import { GrLinkDown } from "react-icons/gr";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { useHistory } from "react-router-dom";
import { putContestSubmission } from "../../common/service/ContestSubmission/PutContestSubmission";
import { logout } from "../../store/actions/account.actions";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { getContestSubmissionByContestAndStudent } from "../../common/service/ContestSubmission/GetContestSubmissionByContestAndStudent";
import jwt_decode from "jwt-decode";
import Loading from "../../common/components/Loading";
import { getChildsByContestAndParent } from "../../common/service/UserRegisterContest/GetUserRegisterJoinContestByContestAndParent";
import { deleteContestSubmission } from "../../common/service/ContestSubmission/DeleteContestSubmission";

function FormSubmitContestStudent(): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.selectedUser;
    const childs_classes: IChildsClassState = useSelector((state: IStateType) => state.childs_classes);

    var id_j = localStorage.getItem("url_contest_submission");
    let url_contest_submission = "";
    if (id_j !== null) {
        url_contest_submission = (id_j);
    }

    var id_jx = localStorage.getItem("contest_submission_id");
    let contest_submission_id = 0;
    if (id_jx !== null) {
        contest_submission_id = parseInt(id_jx);
    }

    var id_mx = localStorage.getItem('total_register');
    let total_register = 0;

    if (id_mx !== null) {
        total_register = parseInt(id_mx);
    }



    const isCreate: boolean = (url_contest_submission === "");

    if (!user || isCreate) {
        user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 }
    }

    var contest_description = localStorage.getItem('contest_description');
    var contest_description_: string = "";
    if (contest_description !== null) {
        contest_description_ = contest_description;
    }

    var contest_name = localStorage.getItem('contest_name');
    var contest_name_: string = "";
    if (contest_name !== null) {
        contest_name_ = contest_name;
    }

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);;
    }

    var id_x = localStorage.getItem('id');
    let id = 0;

    if (id_x !== null) {
        id = parseInt(id_x);
    }


    var id_z = localStorage.getItem('max_participant');
    let max_participant = 0;

    if (id_z !== null) {
        max_participant = parseInt(id_z);
    }

    var id_t = localStorage.getItem('art_type_contest');
    let art_type_contest: string = "";

    if (id_t !== null) {
        art_type_contest = id_t;
    }

    var id_h = localStorage.getItem('art_age_contest');
    let art_age_contest: string = "";

    if (id_h !== null) {
        art_age_contest = id_h;
    }

    var id_k = localStorage.getItem('registration_time');
    let registration_time: string = "";

    if (id_k !== null) {
        registration_time = id_k;
    }

    var id_l = localStorage.getItem('start_time');
    let start_time: string = "";

    if (id_l !== null) {
        start_time = id_l;
    }

    var id_m = localStorage.getItem('end_time');
    let end_time: string = "";

    if (id_m !== null) {
        end_time = id_m;
    }

    var id_mx = localStorage.getItem('time_submit_contest_submission');
    let time_submit_contest_submission: string = "";

    if (id_mx !== null) {
        time_submit_contest_submission = id_mx;
    }

    const { promiseInProgress } = usePromiseTracker();


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getChildsByContestAndParent(dispatch, contest_id, id))
                }
            }
            else {
                trackPromise(getChildsByContestAndParent(dispatch, contest_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);


    async function saveUser(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        if (filter === 0) {
            dispatch(setModificationState(UserModificationStatus.None));
            setImage(null)
            setPreview("")
            toast.update(idx, { render: "Vui lòng chọn học sinh trước khi nộp!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
        }
        else {
            var url = await setImageAction();
            let saveUserFn: Function = isCreate ? addTeacher : editTeacher;
            saveForm(saveUserFn, url, idx);
        }
    }

    const history = useHistory();
    function routeHome() {
        history.push({
            pathname: "/contests"
        });
    }

    function saveForm(saveFn: Function, url: string, idx: any): void {
            if (user) {
                if (saveFn === addTeacher) {
                    dispatch(postContestSubmission({
                        student_id: filter,
                        contest_id: contest_id,
                        image_url: url
                    }, idx))
                }
                else {
                    dispatch(deleteContestSubmission(contest_id,filter, {
                        student_id: filter,
                        contest_id: contest_id,
                        image_url: url
                    }, idx))
                }

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

    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    const [filter, setFilter] = useState(0)
    const [text, setText] = useState("")



    function handleChange(e: any) {
        setFilter(e.target.value)
        let index = e.nativeEvent.target.selectedIndex;
        setText(e.nativeEvent.target[index].text)
        localStorage.removeItem('contest_submission_id')
        localStorage.removeItem('url_contest_submission')
        setPreview("")
        trackPromise(getContestSubmissionByContestAndStudent(dispatch, contest_id, e.target.value))
    }

    function handleFilter() {
        localStorage.removeItem('contest_submission_id')
        localStorage.removeItem('url_contest_submission')
        trackPromise(getContestSubmissionByContestAndStudent(dispatch, contest_id, filter))
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <ToastContainer />
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="col-xl-12 col-md-12 mb-4">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin chung</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {contest_name}</p>
                                            </div>
                                            {
                                                text !== "" ? <div className="row no-gutters">
                                                <p id="phone">Học sinh: {text}</p>
                                            </div> : ""
                                            }
                                            <div className="row no-gutters">
                                                <p id="phone">Độ tuổi đăng kí: {art_age_contest}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thể loại: {art_type_contest}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Đã đăng kí: {total_register}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thời gian bắt đầu: {start_time.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thời gian kết thúc: {end_time.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            {
                                                function () {
                                                    if (url_contest_submission !== "") {
                                                        return (
                                                            <>
                                                                <div className="row no-gutters">
                                                                    <p id="phone">Nộp lúc: {time_submit_contest_submission.replaceAll("T", " ").substring(0, 16)}</p>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                }()
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="right-sort float-right">
                                    <div className="sort-by mr-3">
                                        <span className="mr-1">Vui lòng chọn học sinh:</span>

                                        <select name="cars" id="cars"
                                            value={filter}
                                            onChange={handleChange}
                                        >
                                            <option value={0} selected>Choose</option>
                                            {
                                                childs_classes.childs_class.map((ele, idx) => {
                                                    return (
                                                        <option value={ele.student_id}>{ele.student_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Bài nộp của học sinh</h6>
                        </div>
                        <div className="card-body mx-auto">
                            {
                                function () {
                                    if ((preview === null || preview === "") && url_contest_submission !== "") {
                                        return (
                                            <PhotoProvider>
                                                <PhotoView src={url_contest_submission}>
                                                    <img src={url_contest_submission} alt="" className="center-x" />
                                                </PhotoView>
                                            </PhotoProvider>
                                        )
                                    }
                                    else if (preview !== null && preview !== "") {
                                        return (
                                            <PhotoProvider>
                                                <PhotoView src={preview}>
                                                    <img src={preview} alt="" className="center-x" />
                                                </PhotoView>
                                            </PhotoProvider>
                                        )
                                    }
                                    return (
                                        <h6>Chưa có bài nộp</h6>
                                    )
                                }()
                            }
                        </div>
                    </div>
                </div>

                <div className="row" id="btn-register-course">
                    <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course4" onClick={() => handleClick()}>
                            <GrLinkDown id="btn-payment" color="#FFC0CB" />
                            Xem miêu tả
                        </button>
                    </div>
                </div>
                {
                    function () {
                        if (checked === true) {
                            return (
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-green">Chi tiết</h6>
                                    </div>
                                    <div className="card shadow mb-4">
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: contest_description_ }}>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }
            </Fragment>
    );
};

export default FormSubmitContestStudent;
