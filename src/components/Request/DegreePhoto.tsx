import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateCurrentPath } from "../../store/actions/root.actions";

const DegreePhoto: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Bằng cấp", ""));

  const { state } = useLocation<any>();
  let x = "";
  if (typeof state !== undefined){
    x= state.degree_photo
  }
  console.log(x)

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Bằng cấp</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Hình ảnh</h6>
            </div>
            <div className="card-body">
            <img src={x} />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default DegreePhoto;
