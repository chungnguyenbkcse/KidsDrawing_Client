import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ClassForm from "./ClassForm";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeProduct, clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import LessonList from "./LessonList";
import StudentList from "./StudentList";

const data = {
    'id': 3,
    'class_id': 'CM-1',
    'art_type': 'Chì màu',
    'art_level': '4-6 tuổi',
    'teacher': 'Chung Nguyễn',
    'number_student': '6',
    'course': 'Khóa học mầm chì màu học kì 1 năm học 2022',
    'number_lesson': '10',
}


const DetailClass: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp", "Lớp CM-1"));
    }, [path.area, dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    function onProductRemove() {
        setPopup(true);
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp CM-1</h1>
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
                                            placeholder={data.class_id} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_email"
                                            value={''}
                                            field="name"
                                            onChange={() => { }}
                                            required={true}
                                            maxLength={20}
                                            label="Thuộc khóa học"
                                            placeholder={data.course} />
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
                                            placeholder={data.art_type} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_email"
                                            value={''}
                                            field="name"
                                            onChange={() => { }}
                                            required={true}
                                            maxLength={20}
                                            label="Độ tuổi"
                                            placeholder={data.art_level} />
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
                                            placeholder={data.teacher} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_email"
                                            value={''}
                                            field="name"
                                            onChange={() => { }}
                                            required={true}
                                            maxLength={20}
                                            label="Số buổi"
                                            placeholder={data.number_lesson} />
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
                                            placeholder={data.number_student} />
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
                        <StudentList
                                onSelect={onProductSelect}
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
                <div className="row text-left">
                    {((products.modificationState === ProductModificationStatus.Create) || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ? <ClassForm /> : null}
                </div>
            </Popup>
        </Fragment >
    );
};

export default DetailClass;
