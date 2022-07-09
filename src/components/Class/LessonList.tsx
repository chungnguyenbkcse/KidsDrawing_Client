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
    'lesson': 'Buổi 1',
    'teacher': 'Chung Nguyễn',
    'number_stuent': '5/6',
  },
  {
    'id': 2,
    'lesson': 'Buổi 2',
    'teacher': 'Chung Nguyễn',
    'number_stuent': '6/6',
  },
  {
    'id': 3,
    'lesson': 'Buổi 3',
    'teacher': 'Chung Nguyễn',
    'number_stuent': '5/6',
  },
  {
    'id': 4,
    'lesson': 'Buổi 4',
    'teacher': 'Chung Nguyễn',
    'number_stuent': '5/6',
  },
  {
    'id': 5,
    'lesson': 'Buổi 5',
    'teacher': 'Chung Nguyễn',
    'number_stuent': '5/6',
  },
]

function LessonList(props: productListProps): JSX.Element  {
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
      <td>{product.lesson}</td>
      <td>{product.teacher}</td>
      <td>{product.number_stuent}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Buổi</th>
            <th scope="col">Giáo viên dạy</th>
            <th scope="col">Số học sinh tham gia</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default LessonList;
