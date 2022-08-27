import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

const DetailTeacherRequest: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Bằng cấp", ""));
    var id_x = localStorage.getItem('resson_off_teacher')
    let description = "";
    if (id_x !== null) {
        description = id_x
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lý do xin nghỉ</h1>
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">

                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Nội dung</h6>
                        </div>
                        <div className="card-body" dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    </div>

                </div>

            </div>

        </Fragment>
    );
};

export default DetailTeacherRequest;
