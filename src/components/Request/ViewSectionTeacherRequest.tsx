import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IStateType, IUserRegisterTutorialPageState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getUserRegisterTutorialPage } from "../../common/service/UserRegisterTutorialPage/GetUserRegisterTutorialPageByUserRegisterTutorialId";
import { updateCurrentPath } from "../../store/actions/root.actions";

const ViewSectionTeacherRequest: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_register_tutorial_pages: IUserRegisterTutorialPageState = useSelector((state: IStateType) => state.user_register_tutorial_pages);

    dispatch(updateCurrentPath("Giáo án", "Nội dung"));
    
    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('user_register_tutorial_id');
    
    let user_register_tutorial_id = 0;

    if (id_z !== null) {
        user_register_tutorial_id = parseInt(id_z);
    }

    const [count, setCount] = useState(1);

    const { promiseInProgress } = usePromiseTracker();

    function setChangeCount() {
        let x = count;
        let y = x + 1;
        if (x < user_register_tutorial_pages.user_register_tutorial_pages.length){
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
                    trackPromise(getUserRegisterTutorialPage(dispatch, user_register_tutorial_id))
                }
            }
            else {
                trackPromise(getUserRegisterTutorialPage(dispatch, user_register_tutorial_id))
            }
        }
    }, [dispatch, access_token, refresh_token, user_register_tutorial_id]);
    
    return (
        promiseInProgress ?
      <div className="loader"></div> :  <Fragment>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`}>
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">{user_register_tutorial_pages.user_register_tutorial_pages.length !== 0 ? user_register_tutorial_pages.user_register_tutorial_pages[0].name : ""}</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            {
                                                function () {
                                                    if (user_register_tutorial_pages.user_register_tutorial_pages.length < 1) {
                                                        return ""
                                                    }
                                                    else {
                                                        return <div className="card-body" dangerouslySetInnerHTML={{ __html: user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[count-1].description }}>
                                                        </div>
                                                    }
                                                }()
                                            }
                                        </div>
                                        <div className="row no-gutters justify-content-right">
                                            {
                                                function () {
                                                    if (count < user_register_tutorial_pages.user_register_tutorial_pages.length) {
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

export default ViewSectionTeacherRequest;