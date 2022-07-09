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
    'name': 'Student 1',
    'class': 'CM-1',
    'lesson': 'Buổi 2',
    'time': 'Thứ 2 (7:00 AM - 8:00 AM) 8/8/2022',
    'teacher': 'Chung Nguyen',
  },
  {
    'id': 2,
    'name': 'Student 1',
    'class': 'CM-2',
    'lesson': 'Buổi 2',
    'time': 'Thứ 3 (7:00 AM - 8:00 AM) 8/8/2022',
    'teacher': 'Chung Nguyen',
  }
]

function StudentRequestList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.class}</td>
      <td>{product.lesson}</td>
      <td>{product.time}</td>
      <td>{product.teacher}</td>
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
            <th scope="col">Học sinh</th>
            <th scope="col">Lớp</th>
            <th scope="col">Buổi</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Giáo viên</th>
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

export default StudentRequestList;
