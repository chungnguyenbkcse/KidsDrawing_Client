import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ContestForm from "./ContestForm";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeContest, clearSelectedContest, setModificationState,
    changeSelectedContest
} from "../../store/actions/contest.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ContestModificationStatus, IContest } from "../../store/models/contest.interface";
import TextInput from "../../common/components/TextInput";
import SelectInput from "../../common/components/Select";
import ContestIsOnList from "./ContestIsOnList";
import ContestEndList from "./ContestEndList";
import ContestNotOnYetList from "./ContestNotOnYetList";
import { useHistory } from "react-router-dom";
import { deleteContest } from "../../common/service/Contest/DeleteContest";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { getContest } from "../../common/service/Contest/GetContest";

const data = {
    'id': 3,
    'first_name': 'Thao',
    'last_name': 'Nguyễn',
    'username': 'thaonguyen123',
    'status': 'Đang hoạt động',
    'date_of_birth': '10/10/2000',
    'phone': '0989439678',
    'sex': 'Nữ',
    'address': 'Thanh Hoa',
    'teach_type': 'Chì màu',
    'teach_level': '4-6 tuổi'
}


const Contest: React.FC = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const contests: IContestState = useSelector((state: IStateType) => state.contests);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = contests.contests.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedContest());
        dispatch(updateCurrentPath("Cuộc thi", "danh sách"));
    }, [path.area, dispatch]);

    useEffect(() => {
        dispatch(getContest())
        dispatch(getArtType())
        dispatch(getArtLevel())
        dispatch(getArtAge())
    }, [dispatch])

    function onContestSelectNotOnYetList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        onContestRemove1()
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestSelectOnList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestSelectEndList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestRemove1() {
        setPopup1(true);
    }
    function onContestRemove2() {
        setPopup2(true);
    }

    const history = useHistory();

    const routeChange = () => {
        let path = `/contests/edit-contest`; 
        history.push(
            {
                pathname: path,
                state: {contest_value: null} // your data array of objects
            }
        );
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="ĐANG DIỄN RA" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="ĐÃ KẾT THÚC" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="CHƯA DIỄN RA" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

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
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked1 == false) {
                            setChecked1(true)
                            setChecked2(false)
                            setChecked3(false)
                        }
                    }} style={{
                        color: checked1 ? "#F24E1E" : "#2F4F4F"
                    }}>Cuộc thi đang diễn ra</h6>
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
                        if (checked2 == false) {
                            setChecked2(true)
                            setChecked1(false)
                            setChecked3(false)
                        }
                    }}
                        style={{
                            color: checked2 ? "#F24E1E" : "#2F4F4F"
                        }}>Cuộc thi chưa diễn ra</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked2 ?  "#F24E1E" : "#ffffff"
                        }}></div>
                </div>

                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked3 == false) {
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
                            backgroundColor: checked3 ?  "#F24E1E" : "#ffffff"
                        }}></div>
                </div>
            </div>

            {
                function () {
                    if (checked1 == true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi đang diễn ra</h6>
                                            </div>
                                            <div className="card-body">
                                                <ContestIsOnList
                                                    onSelect={onContestSelectOnList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    else if (checked2 == true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi chưa diễn ra</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationState(ContestModificationStatus.Create))
                                                        routeChange()
                                                        onContestRemove2()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm cuộc thi
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <ContestNotOnYetList
                                                    onSelect={onContestSelectNotOnYetList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    function () {
                                        if ((contests.selectedContest) && (contests.modificationState === ContestModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup1}
                                                    onClose={() => setPopup1(false)}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="popup-modal" id="popup-modal">
                                                        <div className="popup-title">
                                                            Are you sure?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!contests.selectedContest) {
                                                                        return;
                                                                    }
                                                                    dispatch(deleteContest(contests.selectedContest.id))
                                                                    dispatch(addNotification("Khóa học ", `${contests.selectedContest.id} đã được xóa`));
                                                                    dispatch(removeContest(contests.selectedContest.id));
                                                                    dispatch(clearSelectedContest());
                                                                    setPopup1(false);
                                                                }}>Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            )
                                        }
                                    }()
                                }
                            </Fragment>
                        )
                    }

                    else if (checked3 == true){
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi đã kết thúc</h6>
                                            </div>
                                            <div className="card-body">
                                                <ContestEndList
                                                    onSelect={onContestSelectEndList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                }()
            }

        </Fragment >
    );
};

export default Contest;
