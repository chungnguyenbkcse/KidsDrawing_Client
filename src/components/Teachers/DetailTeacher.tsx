import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./DetailTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType, ICourseState, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import {
    clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import HistoryTeach from "./HistoryTeach";
import { useLocation } from "react-router-dom";
import { IUser } from "../../store/models/user.interface";
import { getCourse } from "../../common/service/Course/GetCourse";


const DetailTeacher: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);

    useEffect(() => {
        dispatch(getCourse())
    }, [dispatch])

    const { state } = useLocation<any>();
    let user: IUser = { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: [] };
    if (typeof state !== undefined){
        user = state.user
    }

    console.log(user)

    let course_ids: number[] = [];
    teacher_register_quantifications.teacherRegisterQuantifications.map((ele, index) => {
        if (ele.teacher_id === user.id && ele.status === "Approved"){
            course_ids.push(ele.course_id)
        }
    })
    console.log(course_ids)
    console.log(courses.courses)

    let course_name = "";
    course_ids.map((ele, index) => {
        return courses.courses.map(course => {
            if (course.id === ele){
                console.log("hello")
                if (course_name !== ""){
                    course_name = course_name + ", "+ course.name;
                }
                else {
                    course_name = course_name + course.name;
                    console.log("hello")
                }
            }
        })
    })





    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("products", "list"));
    }, [path.area, dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="LỚP ĐANG DẠY" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="LỚP ĐÃ DẠY" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Thông tin giáo viên</h6>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked === true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Lịch sử dạy</h6>
                </div>
            </div>

            {
                function () {
                    if (checked === true) {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 text-center">
                                                    <img className="img-profile" id="img-profile" alt=""
                                                        src={user.profile_image_url} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Tên đăng nhập"
                                                            placeholder={user.username} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Ngày sinh"
                                                            placeholder={user.dateOfBirth} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Giới tính"
                                                            placeholder={user.sex} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Số điện thoại"
                                                            placeholder={user.phone} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Địa chỉ"
                                                            placeholder={user.address} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={100}
                                                            label="Trình độ"
                                                            placeholder={course_name} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-green">Lịch sử dạy</h6>
                                        </div>
                                        <div className="card-body">
                                            <HistoryTeach
                                                onSelect={onProductSelect}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }()
            }
        </Fragment >
    );
};

export default DetailTeacher;
