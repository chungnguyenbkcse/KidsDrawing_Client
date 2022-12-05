import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IChildState, IRootPageStateType, IStateType, IUserRegisterJoinSemesterState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";
import HistoryParentList from "./HistoryParentList";
import { getReportRegisterJoinSemesterByPayer } from "../../common/service/UserRegisterJoinSemester/GetReportUserRegisterJoinSemesterByPayer";


const HistoryForParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const childs: IChildState = useSelector((state: IStateType) => state.childs);
    const user_register_join_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    const totalMoney: number = user_register_join_semesters.completed.reduce((prev, next) => prev + ((next.price * 1) || 0), 0);

    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { promiseInProgress } = usePromiseTracker();
    const [checked, setChecked] = useState(true);

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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getReportRegisterJoinSemesterByPayer(dispatch, id))
                }
            }
            else {
                trackPromise(getReportRegisterJoinSemesterByPayer(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Thống kê", ""));
    }, [path.area, dispatch]);

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <div className="row">
                    <TopCard title="SỐ TIỀN" text={`${totalMoney}`} icon="donate" class="primary" />
                </div>

                <div className="row">
                    <div className="col-xl-12 col-md-12 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Danh sách lịch sử mua</h3>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <HistoryParentList />
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

export default HistoryForParent;
