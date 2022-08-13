import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SemesterList from "./SemesterList";
import SemesterForm from "./SemesterForm";
import TopCard from "../../common/components/TopCard";
import "./Semester.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISemesterState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeSemester, clearSelectedSemester, setModificationState,
    changeSelectedSemester
} from "../../store/actions/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { SemesterModificationStatus, ISemester } from "../../store/models/semester.interface";
import { getSemester } from "../../common/service/semester/GetSemester";
import { deleteSemester } from "../../common/service/semester/DeleteSemester";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";


const Semester: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = semesters.semesters.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
                    dispatch(getSemester())
                }
            }
            else {
                dispatch(getSemester())
            }
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedSemester());
        dispatch(updateCurrentPath("Học kì", "Danh sách"));
    }, [path.area, dispatch]);

    function onSemesterSelect(semester: ISemester): void {
        dispatch(changeSelectedSemester(semester));
        onSemesterRemove();
        dispatch(setModificationState(SemesterModificationStatus.None));
    }

    function onSemesterRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Học kì</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ HỌC KÌ" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                setSearchTerm(event.target.value)
                                console.log(searchTerm)
                            }}/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách học kì</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(SemesterModificationStatus.Create))
                                    onSemesterRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm học kì
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <SemesterList
                                onSelect={onSemesterSelect} value={searchTerm}
                            />
                        </div>
                    </div>
                </div>
            </div>



            <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <>
                    {
                        function () {
                            if ((semesters.modificationState === SemesterModificationStatus.Create) || ((semesters.selectedSemester) && (semesters.modificationState === SemesterModificationStatus.Edit))) {
                                return <SemesterForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>
            {
                function () {
                    if ((semesters.selectedSemester) && (semesters.modificationState === SemesterModificationStatus.Remove)) {
                        return (
                            <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
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
                                                if (!semesters.selectedSemester) {
                                                    return;
                                                }
                                                dispatch(deleteSemester(semesters.selectedSemester.id))
                                                dispatch(addNotification("Semester removed", `Semester ${semesters.selectedSemester.name} was removed`));
                                                dispatch(removeSemester(semesters.selectedSemester.id));
                                                dispatch(clearSelectedSemester());
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                }()
            }


        </Fragment >
    );
};

export default Semester;
