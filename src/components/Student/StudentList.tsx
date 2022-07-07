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
    'first_name': 'Chung',
    'last_name': 'Nguyễn',
    'username': 'chungnguyen123',
    'parent': 'Thanh Trung',
    'status': 'Đang hoạt động'
  },
  {
    'id': 2,
    'first_name': 'Thanh',
    'last_name': 'Nguyễn',
    'parent': 'Thanh Trung',
    'username': 'thanhnguyen123',
    'status': 'Đang hoạt động'
  },
  {
    'id': 3,
    'first_name': 'Thao',
    'last_name': 'Nguyễn',
    'parent': 'Thanh Trung',
    'username': 'thaonguyen123',
    'status': 'Đang hoạt động'
  }
]

function StudentList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/students/detail'; 
    history.push(path);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      onClick={routeChange}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.first_name} {product.last_name}</td>
      <td>{product.username}</td>
      <td>{product.parent}</td>
      <td>{product.status}</td>
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
            <th scope="col">Tên</th>
            <th scope="col">Tài khoản</th>
            <th scope="col">Phụ huynh</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
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
