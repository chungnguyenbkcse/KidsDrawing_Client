import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ContestForm from "./ContestForm";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
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
import SelectInput from "../../common/components/Select";
import ContestIsOnList from "./ContestIsOnList";
import ContestEndList from "./ContestEndList";
import ContestNotOnYetList from "./ContestNotOnYetList";

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
    'teach_type': 'Chì màu',
    'teach_level': '4-6 tuổi'
}


const Contest: React.FC = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Cuộc thi", "danh sách"));
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
            <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="ĐANG DIỄN RA" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="ĐÃ KẾT THÚC" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="CHƯA DIỄN RA" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
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
                        if (checked1 == false) {
                            setChecked1(true)
                            setChecked2(false)
                            setChecked3(false)
                        }
                    }} style={{
                        color: checked1 ? "#F24E1E" : "#2F4F4F"
                    }}>Cuộc thi đang diễn ra</h6>
                </div>
                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked2 == false) {
                            setChecked2(true)
                            setChecked1(false)
                            setChecked3(false)
                        }
                    }}
                        style={{
                            color: checked2 ? "#F24E1E" : "#2F4F4F"
                        }}>Cuộc thi chưa diễn ra</h6>
                </div>

                <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                        if (checked3 == false) {
                            setChecked3(true)
                            setChecked1(false)
                            setChecked2(false)
                        }
                    }}
                        style={{
                            color: checked3 ? "#F24E1E" : "#2F4F4F"
                        }}>Cuộc thi đã kết thúc</h6>
                </div>
            </div>

            {
                function () {
                    if (checked1 == true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi đang diễn ra</h6>
                                            </div>
                                            <div className="card-body">
                                                <ContestIsOnList
                                                    onSelect={onProductSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    else if (checked2 == true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi chưa diễn ra</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationState(ProductModificationStatus.Create))
                                                        onProductRemove2()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm cuộc thi
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <ContestNotOnYetList
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
                                        {((products.modificationState === ProductModificationStatus.Create) || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ? <ContestForm /> : null}
                                    </div>
                                </Popup>
                            </Fragment>
                        )
                    }

                    else if (checked3 == true){
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách cuộc thi đã kết thúc</h6>
                                            </div>
                                            <div className="card-body">
                                                <ContestEndList
                                                    onSelect={onProductSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                }()
            }

        </Fragment >
    );
};

export default Contest;
