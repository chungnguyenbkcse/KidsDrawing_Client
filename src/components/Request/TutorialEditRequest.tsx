import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStudentLeaveState, IStateType } from "../../store/models/root.interface";
import TutorialEditRequestList from "./TutorialEditRequestList";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getStudentLeave } from "../../common/service/StudentLeave/GetStudentLeave";

const TutorialEditRequest: React.FC = () => {
  const studentLeaveLeaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
  const numberItemsCount: number = studentLeaveLeaves.leaves.length;

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu chỉnh giáo án", ""));

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
                    dispatch(getStudentLeave())
                }
            }
            else {
                dispatch(getStudentLeave())
            }
        }
    }, [dispatch]);

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu chỉnh giáo án</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="SỐ YÊU CẦU" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
            </div>
            <div className="card-body">
              <TutorialEditRequestList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default TutorialEditRequest;
