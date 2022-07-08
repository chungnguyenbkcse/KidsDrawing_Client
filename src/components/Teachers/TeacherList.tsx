import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import {
    removeProduct, clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import TeacherForm from "./TeacherForm";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'first_name': 'Chung',
    'last_name': 'Nguyễn',
    'username': 'chungnguyen123',
    'status': 'Đang hoạt động'
  },
  {
    'id': 2,
    'first_name': 'Thanh',
    'last_name': 'Nguyễn',
    'username': 'thanhnguyen123',
    'status': 'Đang hoạt động'
  },
  {
    'id': 3,
    'first_name': 'Thao',
    'last_name': 'Nguyễn',
    'username': 'thaonguyen123',
    'status': 'Đang hoạt động'
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
      <td>{product.status}</td>
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


  return (
    <Fragment>
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tài khoản</th>
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
                    <TeacherForm />
                </div>
            </Popup>
    </Fragment>

  );
}

export default TeacherList;
