import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

const DegreePhoto: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Bằng cấp", ""));

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
            <img src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png"  alt="First slide" />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default DegreePhoto;
