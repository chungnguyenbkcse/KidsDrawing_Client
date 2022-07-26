import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IProductState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IProduct, ProductModificationStatus } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import { editProduct, clearSelectedProduct, setModificationState, addProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, IProductFormState } from "../../common/types/Form.types";
import { updateCurrentPath } from "../../store/actions/root.actions";
import Editor from "../../common/components/Quill/Editor";

const LessonPlan: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IProductState | null = useSelector((state: IStateType) => state.products);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  let product: IProduct | null = products.selectedProduct;
  const isCreate: boolean = (products.modificationState === ProductModificationStatus.Create);
  useEffect(() => {
    dispatch(clearSelectedProduct());
    dispatch(updateCurrentPath("Khóa học chung", "Khóa học mầm chì màu"));
}, [path.area, dispatch]);
  
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

  const [textHtml, setTextHtml] = useState<string>("")
  function getValue(value: string) {
      setTextHtml(value);
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

      dispatch(addNotification("Giáo trình ", `${formState.name.value} chỉnh bởi bạn`));
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
        <h1 className="h3 mb-2 text-gray-800">Soạn giáo trình chung</h1>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Buổi 1</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                <TextInput id="input_email"
                    value={formState.name.value}
                    field="email"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Tiêu đề buổi học"
                    placeholder="" />
                </div>
                <div className="form-group col-md-6">
                <SelectInput
                    id="input_category"
                    field="category"
                    label="Hình thức học"
                    options={["Dạy thông qua Jitsi", "Tự đọc giáo trình"]}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.category.value}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                <SelectInput
                    id="input_category"
                    field="category"
                    label="Số trang"
                    options={["1", "2", "3", "4"]}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.category.value}
                  />
              </div>
              </div>
              <div className="form-group">
                  <label>Nội dung</label>
                  <Editor getValue={getValue} isCreate={isCreate} setValue={formState.description.value}/>
              </div>
              <div className="form-group">
                <button className="btn btn-info right-margin" >Trang tiếp theo</button>
              </div>
            
              <button className="btn btn-warning">Lưu</button>
              <button type="submit" className={`btn btn-primary left-margin`}>Tiếp</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LessonPlan;
