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



const Teacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = users.teachers.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getTeacher())
        dispatch(getTeacherRegisterQuantification())
        console.log("hello")
    }, [dispatch])

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
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="GIÁO VIÊN" text={`${numberItemsCount}`} icon="user" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                setSearchTerm(event.target.value)
                                console.log(searchTerm)
                            }}/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(UserModificationStatus.ImportFile))
                                    onUserRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Import file
                                </button>
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
                                onSelect={onUserSelect} value={searchTerm}
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
                                        Are you sure?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (!users.selectedUser) {
                                                    return;
                                                }
                                                dispatch(deleteUser(users.selectedUser.id))
                                                dispatch(addNotification("Giáo viên", `${users.selectedUser.username} đã được xóa!`));
                                                dispatch(removeTeacher(users.selectedUser.id));
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
