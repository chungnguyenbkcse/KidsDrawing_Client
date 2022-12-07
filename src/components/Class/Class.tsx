import React, { Fragment, Dispatch, useEffect, useState } from "react";
import ClassList from "./ClassList";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType, ISemesterState, ISemesterClassState, ILessonState } from "../../store/models/root.interface";
import {
    clearSelectedMyClass,
    changeSelectedMyClass,
    setModificationState,
    removeMyClass
} from "../../store/actions/my_class.action";
import { MyClassModificationStatus, IMyClass } from "../../store/models/my_class.interface";
import { ISemester } from "../../store/models/semester.interface";
import { getMyClass } from "../../common/service/MyClass/GetMyClass";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { addNotification } from "../../store/actions/notifications.action";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { changeSelectedSemesterClass, clearSelectedSemesterClass, removeSemesterClass, setModificationStateSemesterClass } from "../../store/actions/semester_class.action"
import ClassSemesterList from "./ClassSemesterList";
import Popup from "reactjs-popup";
import ClassSemesterForm from "./ClassSemesterForm";
import { deleteSemesterClass } from "../../common/service/SemesterClass/DeleteSemesterClass";
import { getSemesterClass } from "../../common/service/SemesterClass/GetSemesterClass";
import { getSchedule } from "../../common/service/Schedule/GetSchedule";
import { getLesson } from "../../common/service/Lesson/GetLesson";
import { getCourse } from "../../common/service/Course/GetCourse";
import { toast, ToastContainer } from "react-toastify";
import { postScheduleClass } from "../../common/service/MyClass/PostScheduleClass";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getSemesterNext } from "../../common/service/semester/GetSemesterNext";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import ClassForm from "./ClassForm";
import { deleteMyClass } from "../../common/service/MyClass/DeleteMyClass";

type Options = {
    name: string;
    value: any;
}

type Obj = {
    time: string[]
}
const format = "YYYY-MM-DD";

const Class: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const myclasss: IMyClassState = useSelector((state: IStateType) => state.myclasses);
    const semester_classes: ISemesterClassState = useSelector((state: IStateType) => state.semester_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = myclasss.myClasses.length
    const numberSemesterClassesCount: number = semester_classes.semesterClasses.length;
    const [value, setValue] = useState<any>([
        new DateObject().set({ day: 4, format }),
        new DateObject().set({ day: 25, format }),
        new DateObject().set({ day: 20, format })
    ]);
    const [checked, setChecked] = useState(true);

    const [semesterId, setSemesterId] = useState(0);
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [popup3, setPopup3] = useState(false);
    const [popup4, setPopup4] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        dispatch(clearSelectedMyClass());
        dispatch(updateCurrentPath("Lớp học", "Danh sách"));
    }, [path.area, dispatch]);

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getMyClass(dispatch))
                    trackPromise(getSemesterNext(dispatch))
                    trackPromise(getSemesterClass(dispatch))
                    trackPromise(getSchedule(dispatch))
                    trackPromise(getLesson(dispatch))
                    trackPromise(getCourse(dispatch))
                }
            }
            else {
                trackPromise(getMyClass(dispatch))
                trackPromise(getSemesterNext(dispatch))
                trackPromise(getSemesterClass(dispatch))
                trackPromise(getSchedule(dispatch))
                trackPromise(getLesson(dispatch))
                trackPromise(getCourse(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token])

    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const listSemester: ISemester[] = semesters.semesters
    //console.log(listLevel)
    const listSemesters: Options[] = [];
    listSemester.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listSemesters.push(item)
    })

    function onMyClassSelect(myclass: IMyClass): void {
        console.log('hello')
        dispatch(changeSelectedMyClass(myclass));
        onMyClassRemove()
        dispatch(setModificationState(MyClassModificationStatus.None));
    }

    function onMyClassSelect2(myclass: IMyClass): void {
        console.log('hello')
        dispatch(changeSelectedMyClass(myclass));
        setPopup2(true)
        dispatch(setModificationState(MyClassModificationStatus.None));
    }

    function onSemesterClassSelect(course: ISemesterClass): void {
        dispatch(changeSelectedSemesterClass(course));
        onSemesterClassRemove()
        dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.None));
    }

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setSemesterId(model.value);
    }

    console.log(semesterId)

    async function handleScheduleClass() {
        setPopup3(false)
        let time: String[] = [];
        value.map((ele: any, index: any) => {
            return time.push(ele.toString())
        })

        const idx = toast.loading("Đang xếp lớp. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
    
        dispatch(postScheduleClass(semesterId, { time: time }, idx));
    }

    function onSemesterClassRemove() {
        setPopup1(true);
    }

    function onMyClassRemove() {
        setPopup4(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    function onRemovePopup4(value: boolean) {
        setPopup4(false);
    }

    function cancelForm(): void {
        setPopup3(false);
        dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.None));
    }
    
    function getDisabledClass(): string {
      let isError: boolean = isFormInvalid();
      return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (semesterId == 0) as boolean;
      }

    return (

        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Lớp học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ LỚP THEO KÌ" text={`${numberSemesterClassesCount}`} icon="box" class="primary" />
                <TopCard title="SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
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
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Lớp đang mở</h6>

                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked === true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Lớp học</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#ffffff" : "#F24E1E"
                    }}></div>
                </div>
            </div>


            {
                function () {
                    if (checked === true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách lớp mở theo kì</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-primary mr-4" onClick={() => {
                                                        dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Create1))
                                                        setPopup3(true)
                                                    }}>
                                                        <i className="fas fa fa-random pr-2"></i>
                                                        Xếp lớp
                                                    </button>

                                                    <button className="btn btn-success" onClick={() => {
                                                        dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Create))
                                                        onSemesterClassRemove()
                                                    }}>
                                                        <i className="fas fa fa-plus pr-2"></i>
                                                        Mở lớp
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <ClassSemesterList
                                                    onSelect={onSemesterClassSelect} value={searchTerm}
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
                                                if ((semester_classes.modificationState === SemesterClassModificationStatus.Create1)) {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-xl-12 col-lg-12">
                                                                <div className="mb-4">
                                                                    <div className="py-3">
                                                                        <h6 className="m-0 font-weight-bold text-green">Xếp lớp</h6>
                                                                    </div>
                                                                    <form>
                                                                        <div className="form-row">
                                                                            <div className="form-group col-md-6">
                                                                                <SelectKeyValueNotField
                                                                                    value={semesterId}
                                                                                    id="input_total_page"
                                                                                    onChange={hasFormValueChangedNotFiled}
                                                                                    required={true}
                                                                                    label="Học kì: "
                                                                                    options={listSemesters}
                                                                                />
                                                                            </div>
                                                                            <div className="form-group col-md-6">
                                                                                <label>Ngày nghỉ: </label>
                                                                                <DatePicker
                                                                                    multiple
                                                                                    id="date-picker-class"
                                                                                    value={value}
                                                                                    onChange={setValue}
                                                                                    format={format}
                                                                                    plugins={[
                                                                                        <DatePanel />
                                                                                    ]}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                    <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                                                    <button className={`btn btn-success left-margin ${getDisabledClass()}`} onClick={() => { handleScheduleClass() }}>Xếp lớp</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>


                                <Popup
                                    open={popup1}
                                    onClose={() => setPopup1(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if ((semester_classes.modificationState === SemesterClassModificationStatus.Create) || ((semester_classes.selectedSemesterClass) && (semester_classes.modificationState === SemesterClassModificationStatus.Edit))) {
                                                    return <ClassSemesterForm isCheck={onRemovePopup1} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>


                                {
                                    function () {
                                        if ((semester_classes.selectedSemesterClass) && (semester_classes.modificationState === SemesterClassModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup1}
                                                    onClose={() => setPopup1(false)}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="popup-modal" id="popup-modal">
                                                        <div className="popup-title">
                                                            Bạn có chắc chắn muốn xóa?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!semester_classes.selectedSemesterClass) {
                                                                        return;
                                                                    }
                                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                                        position: toast.POSITION.TOP_CENTER
                                                                    });

                                                                    dispatch(deleteSemesterClass(semester_classes.selectedSemesterClass.id, idx))
                                                                    dispatch(addNotification("Độ tuổi ", `${semester_classes.selectedSemesterClass.name} đã được xóa`));
                                                                    dispatch(clearSelectedSemesterClass());
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

                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách lớp học</h6>
                                            </div>
                                            <div className="card-body">
                                                <ClassList
                                                    onSelect={onMyClassSelect} onSelect2 = {onMyClassSelect2} value={searchTerm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Popup
                                    open={popup4}
                                    onClose={() => setPopup4(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if (((myclasss.selectedMyClass) && myclasss.modificationState === MyClassModificationStatus.Edit)) {
                                                    return <ClassForm isCheck={onRemovePopup4} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>

                                {
                                    function () {
                                        if ((myclasss.selectedMyClass) && (myclasss.modificationState === MyClassModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup2}
                                                    onClose={() => setPopup2(false)}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="popup-modal" id="popup-modal">
                                                        <div className="popup-title">
                                                            Bạn có chắc chắn muốn xóa?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!myclasss.selectedMyClass) {
                                                                        return;
                                                                    }
                                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                                        position: toast.POSITION.TOP_CENTER
                                                                    });
                                                                    dispatch(addNotification("Trình độ ", `${myclasss.selectedMyClass.name} đã được xóa`));
                                                                    deleteMyClass(dispatch, myclasss.selectedMyClass.id, idx);
                                                                    dispatch(clearSelectedMyClass());
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
                }()
            }

        </Fragment >
    );
};

export default Class;
