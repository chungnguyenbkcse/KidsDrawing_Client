import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IProduct, ProductModificationStatus } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import { editProduct, clearSelectedProduct, setModificationState, addProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, IProductFormState } from "../../common/types/Form.types";

const ScheduleForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IProductState | null = useSelector((state: IStateType) => state.products);
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

      dispatch(addNotification("Lịch học ", `${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedProduct());
      dispatch(setModificationState(ProductModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ProductModificationStatus.None));
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
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} lịch học</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
            <div className="form-group">
                  <TextInput id="input_description"
                    field = "description"
                    value={formState.description.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={100}
                    label="Tên"
                    placeholder="" />
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                <TextInput
                    id="input_category"
                    field = "description"
                    value={formState.description.value}
                    onChange={hasFormValueChanged}
                    type="number"
                    required={false}
                    maxLength={100}
                    label="Số ngày học trong tuần"
                    placeholder=""
                  />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <SelectInput
                    id="input_category"
                    field="category"
                    label="Ngày trong tuần"
                    options={["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.category.value}
                  />
                </div>
                <div className="form-group col-md-6">
                <SelectInput
                    id="input_category"
                    field="category"
                    label="Ngày trong tuần"
                    options={["7:00 AM - 8:00 AM", "9:00 AM - 10:00 AM"]}
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
  );
};

export default ScheduleForm;
