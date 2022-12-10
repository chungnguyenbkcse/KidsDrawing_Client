import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TeacherList from "./TeacherList";
import TopCard from "../../common/components/TopCard";
import "./Teacher.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IUserState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import {clearSelectedUser, setModificationState, changeSelectedUser, removeTeacher  } from "../../store/actions/users.action";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TeacherForm from "./TeacherForm";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { deleteUser } from "../../common/service/User/DeleteUser";
import TeacherImportForm from "./TeacherImportForm";
import { getTeacherRegisterQuantification } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantification";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import CSVReader from "react-csv-reader";
import { toast, ToastContainer } from "react-toastify";
import { postTeacher1 } from "../../common/service/Teacher/PostTeacher1";



const Teacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = users.teachers.length;
    const [popup, setPopup] = useState(false);
    const { promiseInProgress } = usePromiseTracker();
    const [datas, setDatas] = useState<any[]>([]);
    const handleForce = (data: any, fileInfo: any) => {
        if (data.length === 0) {
            toast.error("File không chưa dữ liệu", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            });
        }
        else {
            let is_check = true;
            for (let index = 0; index < data.length; index++) {
                const ele = data[index];
                if (ele.username === null || ele.username === "" || ele.email === null || ele.email === "")   {
                    toast.error(`Lỗi tại dòng ${index + 1}`, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000
                    });
                    is_check = false;
                    break;
                }
            }

            if (is_check === true) {
                setDatas(data);
            }
        }
    };
    console.log(datas)

    function getDisabledClass(): string {
        let isError: boolean = datas.length === 0;
        return isError ? "disabled" : "";
    }

    const handleImport = () => {
        let isError: boolean = datas.length === 0;
        if (isError === false) {
            const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            dispatch(postTeacher1({
                username: datas[0].username,
                email: datas[0].email,
                password: null,
                firstName: null,
                lastName: null,
                dateOfBirth: null,
                profile_image_url: null,
                sex: null,
                phone: null,
                address: null,
                roleName: ["TEACHER"]
              }, datas.slice(1, datas.length), id));
            /* datas.map((ele: any, idx: any) => {
                if (idx === datas.length - 1) {
                    dispatch(postTeacher({
                        username: ele.username,
                        email: ele.email,
                        password: ele.password,
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        profile_image_url: null,
                        sex: null,
                        phone: null,
                        address: null,
                        roleName: ["TEACHER"]
                      }, id));
                }
                else {
                    dispatch(postTeacher1({
                        username: ele.username,
                        email: ele.email,
                        password: ele.password,
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        profile_image_url: null,
                        sex: null,
                        phone: null,
                        address: null,
                        roleName: ["TEACHER"]
                      }));
                }
            }) */
        } 
    }

    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_")
    };


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    trackPromise(getTeacher(dispatch))
                    trackPromise(getTeacherRegisterQuantification(dispatch))
                }
            }
            else {
                trackPromise(getTeacher(dispatch))
                trackPromise(getTeacherRegisterQuantification(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token])

    useEffect(() => {
        dispatch(clearSelectedUser());
        dispatch(updateCurrentPath("Giáo viên", "Danh sách"));
    }, [path.area, dispatch]);

    function onUserSelect(user: IUser): void {
        dispatch(changeSelectedUser(user));
        onUserRemove();
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function onUserRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(value);
    }


    return (
        promiseInProgress ?
      <div className="loader"></div> :<Fragment>
        <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="GIÁO VIÊN" text={`${numberItemsCount}`} icon="user" class="primary" />
                <div className="col-xl-2 col-lg-2">
                    <div>
                        <h6 className="m-0 font-weight-bold text-green">Import</h6>
                    </div>
                    <div>
                        <a className="m-0 font-weight-bold" href={`https://recording-jitsi-chung.s3.ap-southeast-1.amazonaws.com/Asset/example.csv`}>File mẫu</a>
                    </div>
                    <div>
                        <CSVReader
                            cssClass="csv-reader-input import-teacher"
                            label=""
                            onFileLoaded={handleForce}
                            parserOptions={papaparseOptions}
                        />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 btn-import-teacher">
                    <button type="button" className={`btn btn-success left-margin mt-2 ${getDisabledClass()}`} onClick={handleImport}>Gửi</button>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
                            <div className="header-buttons">
                                {/* <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(UserModificationStatus.ImportFile))
                                    onUserRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Import file
                                </button> */}
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(UserModificationStatus.Create))
                                    onUserRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm thủ công
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <TeacherList
                                onSelect={onUserSelect} 
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <>
                    {
                        function () {
                            if ((users.modificationState === UserModificationStatus.Create) || ((users.selectedUser) && (users.modificationState === UserModificationStatus.Edit))) {
                                return <TeacherForm isCheck={onRemovePopup}/>
                            }

                            else if (users.modificationState === UserModificationStatus.ImportFile){
                                return <TeacherImportForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>
            {
                function () {
                    if ((users.selectedUser) && (users.modificationState === UserModificationStatus.Remove)) {
                        return (
                            <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (!users.selectedUser) {
                                                    return;
                                                }
                                                const idx = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
                                                    position: toast.POSITION.TOP_CENTER
                                                });
                                                deleteUser(dispatch, users.selectedUser.id, idx)
                                                dispatch(clearSelectedUser());
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                }()
            }
        </Fragment >
    );
};

export default Teacher;
