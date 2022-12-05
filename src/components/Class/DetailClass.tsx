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


const DetailClass: React.FC = () => {
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getSectionByClass(dispatch, class_id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getSectionByClass(dispatch, class_id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    const [checked, setChecked] = useState(true);

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
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Thông tin chung</h6>

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
                            }}>Lịch học</h6>
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
                                <>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-green">Thông tin chi tiết</h6>
                                                </div>
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
                                                            <div className="form-group col-md-6">
                                                                <TextInput id="input_email"
                                                                    value={''}
                                                                    field="name"
                                                                    onChange={() => { }}
                                                                    required={true}
                                                                    maxLength={20}
                                                                    label="Số học sinh"
                                                                    placeholder={information_class.informationClasses.length > 0 ? information_class.informationClasses[0].number_student.toString() : ""} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-green">Buổi học đã dạy</h6>
                                                </div>
                                                <div className="card-body">
                                                    <LessonList
                                                        onSelect={onProductSelect}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <div className="card shadow mb-4">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-green">Học sinh</h6>
                                                </div>
                                                <div className="card-body">
                                                    <StudentList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (
                                <ScheduleClass />
                            )
                        }
                    }()
                }
            </Fragment >
    );
};

export default DetailClass;
