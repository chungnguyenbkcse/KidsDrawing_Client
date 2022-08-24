import React, { Fragment, Dispatch, useEffect, useState, FormEvent } from "react";
import ClassList from "./ClassList";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType, ISemesterState, ISemesterClassState } from "../../store/models/root.interface";
import {
    clearSelectedMyClass,
    changeSelectedMyClass,
    setModificationState,
    removeMyClass
} from "../../store/actions/my_class.action";
import { MyClassModificationStatus, IMyClass } from "../../store/models/my_class.interface";
import { getSemester } from "../../common/service/semester/GetSemester";
import { ISemester } from "../../store/models/semester.interface";
import { getMyClass } from "../../common/service/MyClass/GetMyClass";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { addNotification } from "../../store/actions/notifications.action";
import { postScheduleClass } from "../../common/service/MyClass/PostScheduleClass";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { changeSelectedSemesterClass, clearSelectedSemesterClass, removeSemesterClass, setModificationStateSemesterClass } from "../../store/actions/semester_class.action"
import ClassSemesterList from "./ClassSemesterList";
import Popup from "reactjs-popup";
import ClassSemesterForm from "./ClassSemesterForm";
import { deleteSemesterClass } from "../../common/service/SemesterClass/DeleteSemesterClass";
import ClassForm from "./ClassForm";
import { getSemesterClass } from "../../common/service/SemesterClass/GetSemesterClass";
import { getSchedule } from "../../common/service/Schedule/GetSchedule";
import { getLesson } from "../../common/service/Lesson/GetLesson";
import { getCourse } from "../../common/service/Course/GetCourse";
import { toast } from "react-toastify";
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
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [semesterId, setSemesterId] = useState(0);
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    dispatch(getMyClass())
                    dispatch(getSemester())
                    dispatch(getSemesterClass())
                    dispatch(getSchedule())
                    dispatch(getLesson())
                    dispatch(getCourse())
                }
            }
            else {
                dispatch(getMyClass())
                dispatch(getSemester())
                dispatch(getSemesterClass())
                dispatch(getSchedule())
                dispatch(getLesson())
                dispatch(getCourse())
            }
        }
    }, [dispatch])

    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const listSemester: ISemester[] = semesters.semesters
    //console.log(listLevel)
    const listSemesters: Options[] = [];
    listSemester.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listSemesters.push(item)
    })

    function onMyClassSelect(myclass: IMyClass): void {
        dispatch(changeSelectedMyClass(myclass));
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

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        let time: String[] = [];
        value.map((ele: any, index: any) => {
            time.push(ele.toString())
        })
        console.log(time)

        const id = toast.loading("Đang xếp lớp. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        dispatch(postScheduleClass(semesterId, { time: time }, id));
        dispatch(clearSelectedMyClass());
        dispatch(setModificationState(MyClassModificationStatus.None));
    }

    function onSemesterClassRemove() {
        setPopup1(true);
    }

    function onMyClassRemove() {
        setPopup2(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    function onRemovePopup2(value: boolean) {
        setPopup2(false);
    }

    return (

        <Fragment>
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
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked1 === false) {
                            setChecked1(true)
                            setChecked2(false)
                            setChecked3(false)
                        }
                    }} style={{
                        color: checked1 ? "#F24E1E" : "#2F4F4F"
                    }}>Xếp lớp</h6>

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
                        }}>Lớp theo kì</h6>
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
                        }}>Lớp học</h6>
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
                                        <div className="mb-4">
                                            <div className="py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Xếp lớp</h6>
                                            </div>
                                            <form onSubmit={saveUser}>
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
                                                <button type="submit" className={`btn btn-success left-margin`}>Xếp lớp</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách lớp mở theo kì</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Create))
                                                        onSemesterClassRemove()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
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
                                                            Are you sure?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!semester_classes.selectedSemesterClass) {
                                                                        return;
                                                                    }
                                                                    dispatch(deleteSemesterClass(semester_classes.selectedSemesterClass.id))
                                                                    dispatch(addNotification("Độ tuổi ", `${semester_classes.selectedSemesterClass.name} đã được xóa`));
                                                                    dispatch(removeSemesterClass(semester_classes.selectedSemesterClass.id));
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

                    else if (checked3 === true) {
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
                                                    onSelect={onMyClassSelect} value={searchTerm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                            Are you sure?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!myclasss.selectedMyClass) {
                                                                        return;
                                                                    }
                                                                    dispatch(addNotification("Trình độ ", `${myclasss.selectedMyClass.name} đã được xóa`));
                                                                    dispatch(removeMyClass(myclasss.selectedMyClass.id));
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
