import React, { Fragment, Dispatch, useEffect, useState } from "react";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType, IUserState, IInformationClassState, ISectionState, ISectionTeacherState } from "../../store/models/root.interface";
import {
    clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import LessonList from "./LessonList";
import StudentList from "./StudentList";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { getInfoMyClass1 } from "../../common/service/MyClass/GetInfoMyClass1";
import ScheduleClass from "./ScheduleClass";
import LessonList1 from "./LessonList1";
import { useHistory } from "react-router-dom";
import ReviewClassList from "./ReviewClassList";
import { getClassHasRegisterJoinSemesterByClass } from "../../common/service/ClassHasRegisterJoinSemester/GetClassHasRegisterJoinSemesterByClass";


const DetailClassEnd: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionTeacherState = useSelector((state: IStateType) => state.section_teachers);
    const students: IUserState = useSelector((state: IStateType) => state.users);
    const information_class: IInformationClassState = useSelector((state: IStateType) => state.information_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = students.students.length;
    const numberItemsCount1: number = sections.sections.length;
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp", ""));
    }, [path.area, dispatch]);

    var id_x = localStorage.getItem('class_id')
    let class_id: number = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x)
    }


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
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getSectionByClass(dispatch, class_id))
                    trackPromise(getClassHasRegisterJoinSemesterByClass(dispatch, class_id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getSectionByClass(dispatch, class_id))
                trackPromise(getClassHasRegisterJoinSemesterByClass(dispatch, class_id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    const history = useHistory();
    function handleViewParent(student_id: number) {
        localStorage.removeItem("student_id");
        localStorage.setItem("student_id", student_id.toString())
        let path = '/student/detail';
        history.push({
            pathname: path
        });
    }

    const [checked, setChecked] = useState(true);
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    console.log(information_class.informationClasses)

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <h1 className="h3 mb-2 text-gray-800">{information_class.informationClasses.length > 0 ? information_class.informationClasses[0].name : ""}</h1>
                <p className="mb-4">Thông tin chung</p>
                <div className="row">
                    <TopCard title="SỐ HỌC SINH" text={`${numberItemsCount}`} icon="box" class="primary" />
                    <TopCard title="SỐ BUỔI" text={`${numberItemsCount1}`} icon="box" class="primary" />
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
                    }}>Thông tin chung</h6>
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
                        if (checked2 === false) {
                            setChecked2(true)
                            setChecked1(false)
                            setChecked3(false)
                        }
                    }}
                        style={{
                            color: checked2 ? "#F24E1E" : "#2F4F4F"
                        }}>Buổi học</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "50%",
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
                        }}>Học sinh</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "50%",
                        backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
            </div>

                {
                    function () {

                        if (checked2 === true) {
                            return (
                                <>
                                    

                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4">
                                                <div className="card-body">
                                                    <LessonList1
                                                        onSelect={onProductSelect}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else if (checked1 == true) {
                            return (
                                <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4">
                                                
                                                <div className="card-body">
                                                    <form>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6 ">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Mã lớp"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].security_code : ""} />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Thuộc khóa học"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].course : ""} />
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Thể loại"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].art_type : ""} />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Độ tuổi"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].art_level : ""} />
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Giảng viên"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].teacher : ""} />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Số buổi"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].number_section.toString() : ""} />
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-12">
                                                                <label htmlFor={"input_email"}>Học sinh</label>
                                                                {   students.students.length > 0 ? students.students.map((ele, idx) => {
                                                                                    if (idx == students.students.length - 1) {
                                                                                        return (
                                                                                            <p className="ml-2" style={{ cursor: "pointer", color: 'blue' }} onClick={() => { handleViewParent(ele.id) }}>
                                                                                                {ele.username + " - " + ele.firstName + " " + ele.lastName}
                                                                                            </p>
                                                                                        )
                                                                                    }
                                                                                    return (
                                                                                        <p className="ml-2" style={{ cursor: "pointer", color: 'blue' }} onClick={() => { handleViewParent(ele.id) }}>
                                                                                            {ele.username + " - " + ele.firstName + " " + ele.lastName}
                                                                                        </p>
                                                                                    )
                                                                                }) : ""
                                                                            }
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
                        else if (checked3 == true) {
                            return (
                                <>
                                    

                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4">
                                                <div className="card-body">
                                                    <ReviewClassList
                                                        onSelect={onProductSelect}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    }()
                }
            </Fragment >
    );
};

export default DetailClassEnd;
