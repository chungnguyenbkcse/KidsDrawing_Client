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
    'name': 'X',
    'year_old': '5',
    'sex': 'Nam',
  },
  {
    'id': 2,
    'name': 'X',
    'year_old': '5',
    'sex': 'Nam',
  },
  {
    'id': 3,
    'name': 'X',
    'year_old': '5',
    'sex': 'Nam',
  },
  {
    'id': 4,
    'name': 'X',
    'year_old': '5',
    'sex': 'Nam',
  },
  {
    'id': 5,
    'name': 'X',
    'year_old': '5',
    'sex': 'Nam',
  },
]

function StudentList(props: productListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();

  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();

  const [popup, setPopup] = useState(false);
  
  const routeChange = () =>{ 
    let path = '/class/lesson'; 
    history.push(path);
  }

  function onProductRemove() {
    setPopup(true);
}

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      key={`product_${product.id}`} onClick={routeChange}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.year_old}</td>
      <td>{product.sex}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tuổi</th>
            <th scope="col">Giới tính</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default StudentList;
