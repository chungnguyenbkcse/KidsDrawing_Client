import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TeachTypeList from "./TeachTypeList";
import TeachTypeForm from "./TeachTypeForm";
import TeachLevelList from "./TeachLevelList";
import TeachLevelForm from "./TeachLevelForm";
import TopCard from "../../common/components/TopCard";
import "./Art.css";
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


const Art: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Độ tuổi", "danh sách"));
    }, [path.area, dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    function onProductRemove1() {
        setPopup1(true);
    }
    function onProductRemove2() {
        setPopup2(true);
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Nghệ thuật</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="THỂ LOẠI" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="ĐỘ TUỔI" text={`${numberItemsCount}`} icon="box" class="primary" />
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
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked == false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Thể loại</h6>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked == true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Độ tuổi</h6>
                </div>
            </div>

            {
                function () {
                    if (checked == true) {
                        return (
                            <Fragment>
                                <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách thể loại</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() =>{
                                    dispatch(setModificationState(ProductModificationStatus.Create))
                                    onProductRemove1()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm thể loại
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <TeachTypeList
                                onSelect={onProductSelect}
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
                <div className="row text-left">
                    {((products.modificationState === ProductModificationStatus.Create) || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ? <TeachTypeForm /> : null}
                </div>
            </Popup>
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
                            <h6 className="m-0 font-weight-bold text-green">Danh sách độ tuổi</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() =>{
                                    dispatch(setModificationState(ProductModificationStatus.Create))
                                    onProductRemove2()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm độ tuổi
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <TeachLevelList
                                onSelect={onProductSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Popup
                open={popup2}
                onClose={() => setPopup2(false)}
                closeOnDocumentClick
            >
                <div className="row text-left">
                    {((products.modificationState === ProductModificationStatus.Create) || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ? <TeachLevelForm /> : null}
                </div>
            </Popup>
                            </Fragment>
                        )
                    }
                }()
            }

        </Fragment >
    );
};

export default Art;
