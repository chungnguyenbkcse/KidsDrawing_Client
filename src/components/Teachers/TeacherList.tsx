import React, { Dispatch, FormEvent, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import {
    removeProduct, clearSelectedProduct, setModificationState,
    changeSelectedProduct,
    addProduct,
    editProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TeacherForm from "./TeacherForm";
import { addNotification } from "../../store/actions/notifications.action";
import { IProductFormState, OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";
import SelectInput from "../../common/components/Select";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'first_name': 'Chung',
    'last_name': 'Nguyễn',
    'level': [
              {
                'art_type': 'Chì màu', 
                'art_level': '4-6 tuổi'
              }, 
              {
                'art_type': 'Chì màu', 
                'art_level': '6-10 tuổi'
              }
            ],
    'request_level': [
      {
        'art_type': 'Chì màu', 
        'art_level': '4-6 tuổi'
      }, 
      {
        'art_type': 'Chì màu', 
        'art_level': '6-10 tuổi'
      }
    ],
    'username': 'chungnguyen123',
    'status': 'Đang hoạt động'
  },
  {
    'id': 2,
    'first_name': 'Thanh',
    'last_name': 'Nguyễn',
    'level': [
      {
        'art_type': 'Chì màu', 
        'art_level': '4-6 tuổi'
      }, 
      {
        'art_type': 'Chì màu', 
        'art_level': '6-10 tuổi'
      }
    ],
    'request_level': [
      {
        'art_type': 'Chì màu', 
        'art_level': '4-6 tuổi'
      }, 
      {
        'art_type': 'Chì màu', 
        'art_level': '6-10 tuổi'
      }
    ],
    'username': 'thanhnguyen123',
    'status': 'Đang hoạt động'
  },
  {
    'id': 3,
    'first_name': 'Thao',
    'last_name': 'Nguyễn',
    'level': [
      {
        'art_type': 'Chì màu', 
        'art_level': '4-6 tuổi'
      }, 
      {
        'art_type': 'Chì màu', 
        'art_level': '6-10 tuổi'
      }
    ],
    'request_level': [
      {
        'art_type': 'Chì màu', 
        'art_level': '4-6 tuổi'
      }, 
      {
        'art_type': 'Chì màu', 
        'art_level': '6-10 tuổi'
      }
    ],
    'username': 'thaonguyen123',
    'status': 'Không hoạt động'
  }
]

function TeacherList(props: productListProps): JSX.Element  {
  
  const dispatch: Dispatch<any> = useDispatch();

  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();

  const [popup, setPopup] = useState(false);
  
  const routeChange = () =>{ 
    let path = '/teachers/detail'; 
    history.push(path);
  }

  const onChangeRequest = () => {
    let path = '/teachers/request-level'; 
    history.push(path);
  }

  function onProductRemove() {
    setPopup(true);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td onClick={routeChange}>{product.first_name} {product.last_name}</td>
      <td>{product.username}</td>
      <td>{product.level.map((val, index) => {
        return (<p key={index}>{val.art_type} {val.art_level}</p>)
      })}</td>

      <td onClick={onChangeRequest}>{product.request_level.length}</td>
      {
        function () {
          if (product.status == 'Đang hoạt động'){
            return (
              <td style={{color: "#18AB56"}}>{product.status}</td>
            )
          }
          else { 
            return (
              <td style={{color:"#2F4F4F"}}>{product.status}</td>
            )
          }
        }()
      }

      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          dispatch(setModificationState(ProductModificationStatus.Create))
          onProductRemove()
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });

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

          dispatch(addNotification("Giáo viên", ` ${formState.name.value} chỉnh bởi bạn`));
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
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tài khoản</th>
            <th scope="col">Trình độ</th>
            <th scope="col">Xác nhận trình độ</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>
    <Popup
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="row text-left">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
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
                </div>
            </Popup>
    </Fragment>

  );
}

export default TeacherList;
