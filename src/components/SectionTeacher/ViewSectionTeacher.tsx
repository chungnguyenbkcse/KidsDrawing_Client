import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { logout } from "../../store/actions/account.actions";
import { IStateType, ITutorialPageState } from "../../store/models/root.interface";

const ViewSectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const TutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 1;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }

    const [count, setCount] = useState(1);

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
                    dispatch(getTutorialPageBySection(section_id))
                }
            }
            else {
                dispatch(getTutorialPageBySection(section_id))
            }
        }
    }, [dispatch, access_token, refresh_token]);
    
    return (
        <Fragment>
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
                                                        return <div className="card-body" dangerouslySetInnerHTML={{ __html: TutorialPages.tutorialPages[count-1].description }}>
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

export default ViewSectionTeacher;
