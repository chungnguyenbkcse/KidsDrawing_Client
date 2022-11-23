import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ParentList from "./ParentList";
import TopCard from "../../common/components/TopCard";
import "./Parent.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IUserState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import {clearSelectedUser, setModificationState, changeSelectedUser, removeParent  } from "../../store/actions/users.action";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { deleteUser } from "../../common/service/User/DeleteUser";
import { getParent } from "../../common/service/Parent/GetParent";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";



const Parent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = users.parents.length;
    const [popup, setPopup] = useState(false);
    const { promiseInProgress } = usePromiseTracker();

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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getParent(dispatch))
                }
            }
            else {
                trackPromise(getParent(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token])

    useEffect(() => {
        dispatch(clearSelectedUser());
        dispatch(updateCurrentPath("Phụ huynh", "Danh sách"));
    }, [path.area, dispatch]);

    function onUserSelect(user: IUser): void {
        dispatch(changeSelectedUser(user));
        onUserRemove();
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function onUserRemove() {
        setPopup(true);
    }

    return (
        promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> :<Fragment>
            <h1 className="h3 mb-2 text-gray-800">Phụ huynh</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="PHỤ HUYNH" text={`${numberItemsCount}`} icon="user" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách phụ huynh</h6>
                        </div>
                        <div className="card-body">
                            <ParentList
                                onSelect={onUserSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
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
                                                dispatch(addNotification("Phụ huynh ", `${users.selectedUser.username} đã được xóa!`));
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

export default Parent;
