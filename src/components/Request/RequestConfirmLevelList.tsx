import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";
import { useHistory } from "react-router-dom";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'name': 'Teacher 1',
    'level': 'Chì màu 4-6 tuổi',
  },
  {
    'id': 2,
    'name': 'Teacher 2',
    'level': 'Chì màu 6-10 tuổi',
  }
]

function RequestConfirmLevelList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();
  const routeChange = () =>{ 
    let path = '/teachers/request-level/degree-photo'; 
    history.push(path);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td onClick={routeChange}>{product.name}</td>
      <td onClick={routeChange}>{product.level}</td>
      <td>
        <button type="button" className="btn btn-primary">Chấp nhận</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Trình độ</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default RequestConfirmLevelList;
