import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ClassForm from "./ClassForm";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType, IUserState, IInformationClassState } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import LessonList from "./LessonList";
import StudentList from "./StudentList";
import { useLocation } from "react-router-dom";
import { getStudent } from "../../common/service/Student/GetStudent";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";


const DetailClass: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const students: IUserState = useSelector((state: IStateType) => state.users);
    const information_class: IInformationClassState = useSelector((state: IStateType) => state.information_classes);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = students.students.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp", "Lớp CM-1"));
    }, [path.area, dispatch]);

    const { state } = useLocation<any>();


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
                    dispatch(getInfoMyClass(state.class_id))
                }
            }
            else {
                dispatch(getInfoMyClass(state.class_id))
            }
        }
    }, [dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    console.log(information_class.informationClasses)

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">{information_class.informationClasses.length > 0 ? information_class.informationClasses[0].name : ""}</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ HỌC SINH" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="SỐ BUỔI ĐÃ DẠY" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>
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
        </Fragment >
    );
};

export default DetailClass;
