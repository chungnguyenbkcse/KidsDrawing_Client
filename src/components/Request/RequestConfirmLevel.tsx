import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IProductState, IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import RequestConfirmLevelList from "./RequestConfirmLevelList";
import { useLocation } from "react-router-dom";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getCourse } from "../../common/service/Course/GetCourse";

const RequestConfirmLevel: React.FC = () => {
  const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  const numberItemsCount: number = teacher_register_quantifications.teacherRegisterQuantifications.length;

  const { state } = useLocation<any>();
  console.log(state.teacher_id)


  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu xác nhận trình độ", ""));

  useEffect(() => {
    dispatch(getTeacherRegisterQuantificationByTeacherId(state.teacher_id))
    dispatch(getTeacher())
    dispatch(getCourse())
  }, [dispatch])

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu xác nhận trình độ</h1>
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
              <RequestConfirmLevelList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default RequestConfirmLevel;
