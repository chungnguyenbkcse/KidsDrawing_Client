import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TeacherList from "./TeacherList";
import TeacherForm from "./TeacherForm";
import TopCard from "../../common/components/TopCard";
import "./Teacher.css";
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


const Teacher: React.FC = () => {
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
        if (products.selectedProduct) {
            setPopup(true);
        }
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Giáo viên</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="GIÁO VIÊN" text={`${numberItemsCount}`} icon="box" class="primary" />
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
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-green" onClick={() =>
                                    dispatch(setModificationState(ProductModificationStatus.Create))}>
                                    <i className="fas fa fa-plus"></i>
                                </button>
                                <button className="btn btn-success btn-blue" onClick={() =>
                                    dispatch(setModificationState(ProductModificationStatus.Edit))}>
                                    <i className="fas fa fa-pen"></i>
                                </button>
                                <button className="btn btn-success btn-red" onClick={() => onProductRemove()}>
                                    <i className="fas fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <TeacherList
                                onSelect={onProductSelect}
                            />
                        </div>
                    </div>
                </div>
                {((products.modificationState === ProductModificationStatus.Create)
                    || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ?
                    <TeacherForm /> : null}
            </div>


            <Popup
                className="popup-modal"
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="popup-modal">
                    <div className="popup-title">
                        Are you sure?
                    </div>
                    <div className="popup-content">
                        <button type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                if (!products.selectedProduct) {
                                    return;
                                }
                                dispatch(addNotification("Product removed", `Product ${products.selectedProduct.name} was removed`));
                                dispatch(removeProduct(products.selectedProduct.id));
                                dispatch(clearSelectedProduct());
                                setPopup(false);
                            }}>Remove
                        </button>
                    </div>
                </div>
            </Popup>
        </Fragment >
    );
};

export default Teacher;
