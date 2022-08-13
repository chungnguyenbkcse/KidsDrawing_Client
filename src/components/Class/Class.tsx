import React, { Fragment, Dispatch, useEffect, useState, FormEvent } from "react";
import ClassList from "./ClassList";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IMyClassState, IStateType, IRootPageStateType, ISemesterState } from "../../store/models/root.interface";
import {
    clearSelectedMyClass, setModificationState,
    changeSelectedMyClass
} from "../../store/actions/my_class.action";
import { MyClassModificationStatus, IMyClass } from "../../store/models/my_class.interface";
import { getSemester } from "../../common/service/semester/GetSemester";
import { ISemester } from "../../store/models/semester.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { getMyClass } from "../../common/service/MyClass/GetMyClass";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { addNotification } from "../../store/actions/notifications.action";
import { postScheduleClass } from "../../common/service/MyClass/PostScheduleClass";
import { postCalendar } from "../../common/service/MyClass/PostCalendar";
import { getStudent } from "../../common/service/Student/GetStudent";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getCourse } from "../../common/service/Course/GetCourse";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";

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
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = myclasss.myClasses.length
    const [value, setValue] = useState<any>([
        new DateObject().set({ day: 4, format }),
        new DateObject().set({ day: 25, format }),
        new DateObject().set({ day: 20, format })
    ]);
    const [semesterId, setSemesterId] = useState(0);

    useEffect(() => {
        dispatch(clearSelectedMyClass());
        dispatch(updateCurrentPath("Lớp học", "Danh sách"));
    }, [path.area, dispatch]);

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
                    dispatch(getMyClass())
                    dispatch(getSemester())
                }
            }
            else {
                dispatch(getMyClass())
                dispatch(getSemester())
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

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setSemesterId(model.value);
    }

    console.log(semesterId)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        let time: String[]= [];
        value.map((ele: any, index: any) => {
            time.push(ele.toString())
        })
        console.log(time)

        dispatch(postScheduleClass(semesterId, {time: time}));
        dispatch(addNotification("Xếp lớp", `Xếp lớp thành công!`));
        dispatch(clearSelectedMyClass());
        dispatch(setModificationState(MyClassModificationStatus.None));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="mb-4">
                        <div className="py-3">
                            <h6 className="m-0 font-weight-bold text-green">Xếp lớp</h6>
                        </div>
                        <form onSubmit={saveUser}>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <SelectKeyValueNotField
                                        value={semesterId}
                                        id="input_total_page"
                                        onChange={hasFormValueChangedNotFiled}
                                        required={true}
                                        label="Học kì: "
                                        options={listSemesters}
                                    />
                                </div>
                                <div className="form-group col-md-4">
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

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm"/>
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
                            <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                        </div>
                        <div className="card-body">
                            <ClassList
                                onSelect={onMyClassSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default Class;
