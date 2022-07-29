import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStudentLeaveState, IStateType } from "../../store/models/root.interface";
import StudentRequestList from "./StudentRequestList";

const StudentRequest: React.FC = () => {
  const studentLeaveLeaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
  const numberItemsCount: number = studentLeaveLeaves.leaves.length;

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu nghỉ học", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu nghỉ học</h1>
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
              <StudentRequestList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default StudentRequest;
