import React, { Dispatch, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct, ProductModificationStatus } from "../../store/models/product.interface";
import ClassForm from "./ClassForm";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/products.action";
import Popup from "reactjs-popup";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'class_id': 'CM-1',
    'course': 'Chì màu cho trẻ 4-6 tuổi',
    'teacher': 'Thanh Trung',
    'schedule': ['Thứ 2 (7:00 AM - 8:00 AM)', 'Thứ 4 (8:00 AM - 9:00 AM)'],
  },
  {
    'id': 2,
    'class_id': 'CM-1',
    'course': 'Chì màu cho trẻ 4-6 tuổi',
    'teacher': 'Le Thao',
    'schedule': ['Thứ 3 (7:00 AM - 8:00 AM)', 'Thứ 5 (8:00 AM - 9:00 AM)'],
  }
]

function ClassList(props: productListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();

  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();

  const [popup, setPopup] = useState(false);
  
  const routeChange = () =>{ 
    let path = '/class/detail'; 
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
      <td onClick={routeChange}>{product.class_id}</td>
      <td>{product.course}</td>
      <td>{product.teacher}</td>
      <td>
        {product.schedule.map((val, index) => {
            return (
                <p>{val}</p>
            )
        })}
      </td>
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
            <th scope="col">Mã lớp học</th>
            <th scope="col">Khóa học</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Lịch học</th>
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
                    <ClassForm />
                </div>
            </Popup>
    </Fragment>

  );
}

export default ClassList;
