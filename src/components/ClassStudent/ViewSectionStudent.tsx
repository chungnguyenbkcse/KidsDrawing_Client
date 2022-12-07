import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { logout } from "../../store/actions/account.actions";
import { IStateType, ITutorialPageState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { putAttendanceByUserAndSection } from "../../common/service/Attendance/PutAttendanceByUserAndSection";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getAttendanceBySectionAndStudent } from "../../common/service/Attendance/GetUserAttendaceBySectionAndStudent";

const ViewSectionStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const TutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    var id_t = localStorage.getItem('is_active');
    var is_active = "";
    if (id_t !== null) {
        is_active = id_t;
    }

    var id_x = localStorage.getItem('id');
    
    let id = 0;

    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const [count, setCount] = useState(1);

    const { promiseInProgress } = usePromiseTracker();


    function setChangeCountBack() {
        let x = count;
        let y = x - 1;
        if (x > 1){
            setCount(y);
        }
    }

    const history = useHistory();
    function routeHome(){
        let path = "/classes/section";
        history.push({
            pathname: path
        });
    }

    function setChangeCount() {
        let x = count;
        let y = x + 1;
        if (x < TutorialPages.tutorialPages.length){
            console.log("Count")
            setCount(y);
        }

        var id_j = localStorage.getItem('is_attendance');
        var is_attendance = "";
        if (id_j !== null) {
            is_attendance = id_j;
        }

        if (is_attendance === "false") {
            if (y === TutorialPages.tutorialPages.length && (is_active === 'pre_active_now' || is_active === 'active_now')) {
                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                    position: toast.POSITION.TOP_CENTER
                  });
                dispatch(putAttendanceByUserAndSection(section_id,id, idx));
            }
        }

        console.log(count)
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getTutorialPageBySection(dispatch, section_id))
                    trackPromise(getAttendanceBySectionAndStudent(dispatch, section_id, id))
                    
                }
            }
            else {
                trackPromise(getTutorialPageBySection(dispatch, section_id))
                trackPromise(getAttendanceBySectionAndStudent(dispatch, section_id, id))
                
            }
        }
    }, [dispatch, access_token, refresh_token, section_id, id]);
    
    return (
        promiseInProgress ?
      <div className="loader"></div> :  <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`}>
                                    <div className="card-body">
                                        <div className="row no-gutters">
                                            {
                                                function () {
                                                    if (TutorialPages.tutorialPages.length < 1) {
                                                        return ""
                                                    }
                                                    else {
                                                        return <div className="card-body" dangerouslySetInnerHTML={{ __html: TutorialPages.tutorialPages.sort((a, b) => a.number - b.number)[count-1].description }}>
                                                        </div>
                                                    }
                                                }()
                                            }
                                        </div>
                                        <div className="row no-gutters justify-content-right">
                                            {
                                                function () {
                                                    if (count < TutorialPages.tutorialPages.length) {
                                                        if (count === 1){
                                                            return (
                                                                <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                            )
                                                        }
                                                        else if (count > 1){
                                                            return (
                                                                <> 
                                                                    <button className={`btn btn-warning left-margin`} onClick={() => {setChangeCountBack()}}>Trở về</button>
                                                                    <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    }
                                                    else {
                                                        return (
                                                            <button className={`btn btn-warning left-margin`} onClick={() => {setChangeCountBack()}}>Trở về</button>
                                                        )
                                                    }
                                                }()
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-md-12 mx-auto">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ViewSectionStudent;
