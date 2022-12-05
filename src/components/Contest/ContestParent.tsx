import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IContestParentState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getContestStudentByParent } from "../../common/service/ContestStudent/GetContestStudentByParent";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import ContestParentDoingList from "./ContestParentDoingList";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import ContestParentNotOpenNowList from "./ContestParentNotOpenNowList";
import ContestParentEndList from "./ContestParentEndList";

const ContestParent: React.FC = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const contest_parent: IContestParentState = useSelector((state: IStateType) => state.contest_parents);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestStudentByParent(dispatch, id))
                    trackPromise(getArtType(dispatch))
                    trackPromise(getArtAge(dispatch))
                    trackPromise(getStudentByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getContestStudentByParent(dispatch, id))
                trackPromise(getArtType(dispatch))
                trackPromise(getArtAge(dispatch))
                trackPromise(getStudentByParent(dispatch, id))
            }
        }
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi của bé", ""));
    }, [path.area, dispatch])

    const [searchTerm, setSearchTerm] = useState("");

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <div className="row" id="search-box">
                    <div className="col-xl-12 col-lg-12">
                        <div className="input-group" id="search-content">
                            <div className="form-outline">
                                <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                    setSearchTerm(event.target.value)
                                    console.log(searchTerm)
                                }} />
                            </div>
                            <button type="button" className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked1 === false) {
                                setChecked1(true)
                                setChecked2(false)
                                setChecked3(false)
                            }
                        }} style={{
                            color: checked1 ? "#F24E1E" : "#2F4F4F"
                        }}>Cuộc thi chưa diễn ra</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked1 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked2 === false) {
                                setChecked2(true)
                                setChecked1(false)
                                setChecked3(false)
                            }
                        }}
                            style={{
                                color: checked2 ? "#F24E1E" : "#2F4F4F"
                            }}>Cuộc thi đang diễn ra</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked2 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>

                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked3 === false) {
                                setChecked3(true)
                                setChecked1(false)
                                setChecked2(false)
                            }
                        }}
                            style={{
                                color: checked3 ? "#F24E1E" : "#2F4F4F"
                            }}>Cuộc thi đã kết thúc</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                </div>

                {
                    function () {
                        if (checked2 === true) {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-body">
                                                    <ContestParentDoingList value={searchTerm}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                        else if (checked1 === true) {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-body">
                                                    <ContestParentNotOpenNowList value={searchTerm}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Fragment>
                            )
                        }

                        else if (checked3 === true) {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-body">
                                                    <ContestParentEndList value={searchTerm}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    }()
                }


            </Fragment>
    );
};

export default ContestParent;
