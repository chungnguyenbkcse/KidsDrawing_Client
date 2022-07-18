import React, { Fragment, Dispatch, useState, useEffect, FormEvent } from "react";
import TeacherList from "./TeacherList";
import TopCard from "../../common/components/TopCard";
import "./Teacher.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeProduct, clearSelectedProduct, setModificationState,
    changeSelectedProduct,
    addProduct,
    editProduct
} from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import { IProductFormState, OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";
import SelectInput from "../../common/components/Select";


const Teacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Giáo viên", "Danh sách"));
    }, [path.area, dispatch]);

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    function onProductRemove() {
        setPopup(true);
    }
    let product: IProduct | null = products.selectedProduct;
    const isCreate: boolean = (products.modificationState === ProductModificationStatus.Create);

    if (!product || isCreate) {
        product = { id: 0, name: "", description: "", amount: 0, price: 0, hasExpiryDate: false, category: "" };
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: product.name },
        description: { error: "", value: product.description },
        amount: { error: "", value: product.amount },
        price: { error: "", value: product.price },
        hasExpiryDate: { error: "", value: product.hasExpiryDate },
        category: { error: "", value: product.category }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addProduct : editProduct;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IProductFormState, saveFn: Function): void {
        if (product) {
            dispatch(saveFn({
                ...product,
                name: formState.name.value,
                description: formState.description.value,
                price: formState.price.value,
                amount: formState.amount.value,
                hasExpiryDate: formState.hasExpiryDate.value,
                category: formState.category.value
            }));

            dispatch(addNotification("Product edited", `Product ${formState.name.value} edited by you`));
            dispatch(clearSelectedProduct());
            dispatch(setModificationState(ProductModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(ProductModificationStatus.None));
        setPopup(false);
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.amount.error || formState.description.error
            || formState.name.error || formState.price.error || formState.hasExpiryDate.error
            || formState.category.error || !formState.name.value || !formState.category.value) as boolean;
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
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
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
                                <button className="btn btn-success btn-green" onClick={() => {
                                    dispatch(setModificationState(ProductModificationStatus.Create))
                                    onProductRemove()
                                }}>
                                    <i className="fas fa fa-plus"></i>
                                    Thêm giáo viên
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
            </div>


            <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="row text-left">
                    <Fragment>
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} giáo viên</h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={saveUser}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <TextInput id="input_email"
                                                    value={formState.name.value}
                                                    field="name"
                                                    onChange={hasFormValueChanged}
                                                    required={true}
                                                    maxLength={20}
                                                    label="Họ"
                                                    placeholder="" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <TextInput id="input_email"
                                                    value={formState.name.value}
                                                    field="name"
                                                    onChange={hasFormValueChanged}
                                                    required={true}
                                                    maxLength={20}
                                                    label="Tên"
                                                    placeholder="" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <TextInput id="input_description"
                                                    field="description"
                                                    value={formState.description.value}
                                                    onChange={hasFormValueChanged}
                                                    required={false}
                                                    maxLength={100}
                                                    label="Tên đăng nhập"
                                                    placeholder="" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <TextInput id="input_description"
                                                    field="description"
                                                    value={formState.description.value}
                                                    onChange={hasFormValueChanged}
                                                    required={false}
                                                    maxLength={100}
                                                    label="Email"
                                                    placeholder="" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <SelectInput
                                                    id="input_category"
                                                    field="category"
                                                    label="Thể loại dạy"
                                                    options={["Chì màu", "Sáp màu", "Sơn dầu"]}
                                                    required={true}
                                                    onChange={hasFormValueChanged}
                                                    value={formState.category.value}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <SelectInput
                                                    id="input_category"
                                                    field="category"
                                                    label="Độ tuổi dạy"
                                                    options={["4-6 tuổi", "6-10 tuổi", "10-14 tuổi"]}
                                                    required={true}
                                                    onChange={hasFormValueChanged}
                                                    value={formState.category.value}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                        <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </Popup>
        </Fragment >
    );
};

export default Teacher;
