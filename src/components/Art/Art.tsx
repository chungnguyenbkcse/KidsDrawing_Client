import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TeachTypeList from "./TeachTypeList";
import TeachTypeForm from "./TeachTypeForm";
import TeachLevelList from "./TeachLevelList";
import TeachLevelForm from "./TeachLevelForm";
import TeachAgeList from "./TeachAgeList";
import TeachAgeForm from "./TeachAgeForm";
import TopCard from "../../common/components/TopCard";
import "./Art.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IArtTypeState, IArtLevelState, IArtAgeState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedArtType, setModificationState,
    changeSelectedArtType,
    removeArtType
} from "../../store/actions/art_type.action";
import { ArtLevelModificationStatus, IArtLevel } from "../../store/models/art_level.interface";
import {
    clearSelectedArtLevel,
    changeSelectedArtLevel,
    setModificationStateArtLevel,
    removeArtLevel
} from "../../store/actions/art_level.action";
import { ArtTypeModificationStatus, IArtType } from "../../store/models/art_type.interface";
import {
    clearSelectedArtAge,
    changeSelectedArtAge,
    setModificationStateArtAge,
    removeArtAge
} from "../../store/actions/art_age.action";
import { ArtAgeModificationStatus, IArtAge } from "../../store/models/art_age.interface";
import Popup from "reactjs-popup";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteArtType } from "../../common/service/ArtType/DeleteArtType";
import { deleteArtLevel } from "../../common/service/ArtLevel/DeleteArtLevel";
import { deleteArtAge } from "../../common/service/ArtAge/DeleteArtAge";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";


const Art: React.FC = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
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
                    trackPromise(getArtType(dispatch))
                    trackPromise(getArtAge(dispatch))
                    trackPromise(getArtLevel(dispatch))
                }
            }
            else {
                trackPromise(getArtType(dispatch))
                trackPromise(getArtAge(dispatch))
                trackPromise(getArtLevel(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token])
    
    
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberArtTypeCount: number = art_types.artTypes.length;
    const numberArtLevelCount: number = art_levels.artLevels.length;
    const numberArtAgeCount: number = art_ages.artAges.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [popup3, setPopup3] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(clearSelectedArtType());
        dispatch(clearSelectedArtLevel());
        dispatch(clearSelectedArtAge());
        dispatch(updateCurrentPath("Nghệ thuật", "danh sách"));
    }, [path.area, dispatch]);

    function onArtTypeSelect(art_type: IArtType): void {
        dispatch(changeSelectedArtType(art_type));
        onArtTypeRemove()
        dispatch(setModificationState(ArtTypeModificationStatus.None));
    }

    function onArtLevelSelect(art_level: IArtLevel): void {
        dispatch(changeSelectedArtLevel(art_level));
        onArtLevelRemove()
        dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.None));
    }

    function onArtAgeSelect(art_age: IArtAge): void {
        dispatch(changeSelectedArtAge(art_age));
        onArtAgeRemove()
        dispatch(setModificationStateArtAge(ArtAgeModificationStatus.None));
    }

    function onArtTypeRemove() {
        setPopup1(true);
    }
    function onArtLevelRemove() {
        setPopup3(true);
    }

    function onArtAgeRemove() {
        setPopup2(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    function onRemovePopup2(value: boolean) {
        setPopup2(false);
    }

    function onRemovePopup3(value: boolean) {
        setPopup3(false);
    }


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
            <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Nghệ thuật</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="THỂ LOẠI" text={`${numberArtTypeCount}`} icon="box" class="primary" />
                <TopCard title="ĐỘ TUỔI" text={`${numberArtAgeCount}`} icon="box" class="primary" />
                <TopCard title="TRÌNH ĐỘ" text={`${numberArtLevelCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
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


            <div className="row">
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked1 === false) {
                            setChecked1(true)
                            setChecked2(false)
                            setChecked3(false)
                        }
                    }} style={{
                        color: checked1 ? "#F24E1E" : "#2F4F4F"
                    }}>Thể loại</h6>

                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
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
                        }}>Độ tuổi</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
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
                        }}>Trình độ</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
            </div>


            {
                function () {
                    if (checked1 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách thể loại</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationState(ArtTypeModificationStatus.Create))
                                                        onArtTypeRemove()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm thể loại
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <TeachTypeList
                                                    onSelect={onArtTypeSelect} value={searchTerm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Popup
                                    open={popup1}
                                    onClose={() => setPopup1(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if ((art_types.modificationState === ArtTypeModificationStatus.Create) || ((art_types.selectedArtType) && (art_types.modificationState === ArtTypeModificationStatus.Edit))) {
                                                    return <TeachTypeForm isCheck={onRemovePopup1} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>
                                {
                                    function () {
                                        if ((art_types.selectedArtType) && (art_types.modificationState === ArtTypeModificationStatus.Remove)) {
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
                                                                    if (!art_types.selectedArtType) {
                                                                        return;
                                                                    }
                                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                                        position: toast.POSITION.TOP_CENTER
                                                                    });
                                                                    dispatch(deleteArtType(art_types.selectedArtType.id, idx))
                                                                    dispatch(addNotification("Thể loại ", `${art_types.selectedArtType.name} đã được xóa`));
                                                                    dispatch(removeArtType(art_types.selectedArtType.id));
                                                                    dispatch(clearSelectedArtType());
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
                    else if (checked2 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách độ tuổi</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationStateArtAge(ArtAgeModificationStatus.Create))
                                                        onArtAgeRemove()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm độ tuổi
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <TeachAgeList
                                                    onSelect={onArtAgeSelect} value={searchTerm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Popup
                                    open={popup2}
                                    onClose={() => setPopup2(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if ((art_ages.modificationState === ArtAgeModificationStatus.Create) || ((art_ages.selectedArtAge) && (art_ages.modificationState === ArtAgeModificationStatus.Edit))) {
                                                    return <TeachAgeForm isCheck={onRemovePopup2} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>
                                {
                                    function () {
                                        if ((art_ages.selectedArtAge) && (art_ages.modificationState === ArtAgeModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup2}
                                                    onClose={() => setPopup2(false)}
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
                                                                    if (!art_ages.selectedArtAge) {
                                                                        return;
                                                                    }
                                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                                        position: toast.POSITION.TOP_CENTER
                                                                    });
                                                                    dispatch(deleteArtAge(art_ages.selectedArtAge.id, idx))
                                                                    dispatch(addNotification("Độ tuổi ", `${art_ages.selectedArtAge.name} đã được xóa`));
                                                                    dispatch(removeArtAge(art_ages.selectedArtAge.id));
                                                                    dispatch(clearSelectedArtAge());
                                                                    setPopup2(false);
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

                    else if (checked3 === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách trình độ</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.Create))
                                                        onArtLevelRemove()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm trình độ
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <TeachLevelList
                                                    onSelect={onArtLevelSelect} value={searchTerm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <Popup
                                    open={popup3}
                                    onClose={() => setPopup3(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if ((art_levels.modificationState === ArtLevelModificationStatus.Create) || ((art_levels.selectedArtLevel) && (art_levels.modificationState === ArtLevelModificationStatus.Edit))) {
                                                    return <TeachLevelForm isCheck={onRemovePopup3} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>
                                {
                                    function () {
                                        if ((art_levels.selectedArtLevel) && (art_levels.modificationState === ArtLevelModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup3}
                                                    onClose={() => setPopup3(false)}
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
                                                                    if (!art_levels.selectedArtLevel) {
                                                                        return;
                                                                    }
                                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                                        position: toast.POSITION.TOP_CENTER
                                                                    });
                                                                    dispatch(deleteArtLevel(art_levels.selectedArtLevel.id, idx))
                                                                    dispatch(addNotification("Trình độ ", `${art_levels.selectedArtLevel.name} đã được xóa`));
                                                                    dispatch(removeArtLevel(art_levels.selectedArtLevel.id));
                                                                    dispatch(clearSelectedArtLevel());
                                                                    setPopup3(false);
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
                }()
            }

        </Fragment >
    );
};

export default Art;
