import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const DetailScoreContestStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);



    var id_x = localStorage.getItem("feedback");
    let feedback: string = "";
    if (id_x !== null) {
        feedback = id_x;
    }

    var id_y = localStorage.getItem("id");
    let id: number = 0;
    if (id_y !== null) {
        id = parseInt(id_y);
    }

    var id_y = localStorage.getItem('contest_submission_id');
    var contest_submission_id: number = 0;
    if (id_y !== null) {
        contest_submission_id = parseInt(id_y);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("score");
    let score = 0;
    if (id_j !== null) {
        score = parseInt(id_j);
    }

    var id_a = localStorage.getItem("url_conest_submission");
    let url_conest_submission = "";
    if (id_a !== null) {
        url_conest_submission = (id_a);
    }

    var id_b = localStorage.getItem("art_type_name");
    let art_type_name = "";
    if (id_b !== null) {
        art_type_name = (id_b);
    }

    var id_c = localStorage.getItem("art_age_name");
    let art_age_name = "";
    if (id_c !== null) {
        art_age_name = (id_c);
    }

    var id_d = localStorage.getItem("start_time");
    let start_time = "";
    if (id_d !== null) {
        start_time = (id_d);
    }

    var id_e = localStorage.getItem("end_time");
    let end_time = "";
    if (id_e !== null) {
        end_time = (id_e);
    }

    var id_f = localStorage.getItem("contest_name");
    let contest_name = "";
    if (id_f !== null) {
        contest_name = (id_f);
    }


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        <Fragment>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className="col-xl-12 col-md-12 mb-2">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin cuộc thi</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {contest_name}</p>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Thể loại: {art_type_name}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Độ tuổi: {art_age_name}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thời gian bắt đầu: {start_time.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thời gian kết thúc: {end_time.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Thời gian nộp: {time_submit.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Bài làm của học sinh</h4>
                                        </div>
                                        <div className="row mx-auto">
                                        <PhotoProvider>
                                            <PhotoView src={url_conest_submission}>
                                                <img src={url_conest_submission} alt="" className="center-x" />
                                            </PhotoView>
                                        </PhotoProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                            <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Điểm</h4>
                                        </div>
                                        <div className="row mx-auto" style={{ width: 200, height: 200 }}>
                                                <CircularProgressbar value={score*10} text={`${score}`} />;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Nhận xét</h4>
                                        </div>
                                        <div className="row mx-auto">
                                            {feedback}
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

export default DetailScoreContestStudent;
