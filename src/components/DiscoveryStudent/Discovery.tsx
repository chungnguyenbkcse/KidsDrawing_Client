import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./Discovery.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ContestList from "./ContestList";
import { getContestByStudent } from "../../common/service/Contest/GetContestByStudent";
import { getCourseNew } from "../../common/service/CourseNew/GetCourseNew";
import CourseNewList from "./CourseNewList";

const DiscoveryStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    //const semester_classs: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    var id_x = localStorage.getItem('id');
    var id: string = "";
    if (id_x !== null) {
        id = id_x;
    }

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
                    trackPromise(getCourseNew(dispatch, id))
                    trackPromise(getContestByStudent(dispatch, id))
                }
            }
            else {
                trackPromise(getCourseNew(dispatch, id))
                trackPromise(getContestByStudent(dispatch, id))
            }
        }
        
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Khám phá", ""));
    }, [path.area, dispatch])


    const [checked, setChecked] = useState(true);
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
      </div> : <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            {/* <div className="row">
                <TopCard title="ĐÃ ĐĂNG KÍ" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
            </div> */}

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Khóa học</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked === true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Cuộc thi</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#ffffff" : "#F24E1E"
                    }}></div>
                </div>
            </div>


            {
                function () {
                    if (checked === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <CourseNewList />
                                </div>

                            </Fragment>
                        )
                    }
                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    <ContestList />
                                </div>

                            </Fragment>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default DiscoveryStudent;
