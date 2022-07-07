import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TeacherList from "./TeacherList";
import TeacherForm from "./TeacherForm";
import TopCard from "../../common/components/TopCard";
import "./DetailTeacher.css";
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
import HistoryTeach from "./HistoryTeach";

const data = {
    'id': 3,
    'first_name': 'Thao',
    'last_name': 'Nguyễn',
    'username': 'thaonguyen123',
    'status': 'Đang hoạt động',
    'date_of_birth': '10/10/2000',
    'phone': '0989439678',
    'sex': 'Nữ',
    'address': 'Thanh Hoa',
    'teach_type':'Chì màu' ,
    'teach_level': '4-6 tuổi'
}


const DetailTeacher: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("products", "list"));
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
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="LỚP ĐANG DẠY" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="LỚP ĐÃ DẠY" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" onClick={() => {
                        if (checked == false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Thông tin giáo viên</h6>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" onClick={() => {
                        if (checked == true) {
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
                    if (checked == true) {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 text-center">
                                                    <img className="img-profile" id="img-profile" alt=""
                                                        src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Tên đăng nhập"
                                                            placeholder={data.username} />
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
                                                            placeholder={data.date_of_birth} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Giới tính"
                                                            placeholder={data.sex} />
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
                                                            placeholder={data.phone} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Địa chỉ"
                                                            placeholder={data.address} />
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
                                                            label="Thể loại dạy"
                                                            placeholder={data.teach_type} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Độ tuổi dạy"
                                                            placeholder={data.teach_level} />
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


            <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="row text-left">
                    {((products.modificationState === ProductModificationStatus.Create) || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ? <TeacherForm /> : null}
                </div>
            </Popup>
        </Fragment >
    );
};

export default DetailTeacher;
