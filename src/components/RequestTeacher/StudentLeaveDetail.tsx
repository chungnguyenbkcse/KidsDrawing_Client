import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import 'react-circular-progressbar/dist/styles.css';

const StudentLeaveDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    var id_y = localStorage.getItem('detail_resson');
    var detail_resson: string = "";
    if (id_y !== null) {
        detail_resson = id_y;
    }

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
                    
                }
            }
            else {
                
            }
        }
    }, [dispatch, access_token, refresh_token]);


    useEffect(() => {
        dispatch(updateCurrentPath("Yêu cầu nghỉ học", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Lý do</h6>
                        </div>
                        <div className="card-body">
                            <p>
                                {detail_resson}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default StudentLeaveDetail;
