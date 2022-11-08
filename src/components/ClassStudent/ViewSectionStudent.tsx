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

const ViewSectionStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const TutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    
    let id = 0;

    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const [count, setCount] = useState(1);

    const { promiseInProgress } = usePromiseTracker();

    function setChangeCount() {
        let x = count;
        let y = x + 1;
        if (x < TutorialPages.tutorialPages.length){
            console.log("Count")
            setCount(y);
        }
        console.log(count)
    }

    function setChangeCountBack() {
        let x = count;
        let y = x - 1;
        if (x > 1){
            setCount(y);
        }
    }

    function handleChecked() {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
          });
        dispatch(putAttendanceByUserAndSection(section_id,id, idx));
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
                    trackPromise(getTutorialPageBySection(dispatch, section_id))
                }
            }
            else {
                trackPromise(getTutorialPageBySection(dispatch, section_id))
            }
        }
    }, [dispatch, access_token, refresh_token, section_id]);
    
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
      </div> :  <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`}>
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">{TutorialPages.tutorialPages.length !== 0 ? TutorialPages.tutorialPages[0].name : ""}</h4>
                                        </div>
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
                                        <div className="row no-gutters justify-content-right">
                                            {
                                                function() {
                                                    if (count === TutorialPages.tutorialPages.length) {
                                                        return (
                                                            <button className={`btn btn-success left-margin mt-2`} onClick={() => {handleChecked()}}>Điểm danh</button>
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
                </div>
            </div>

        </Fragment>
    );
};

export default ViewSectionStudent;
