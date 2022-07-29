import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

const data = [
  {
    'id': 1,
    'parent': 'parent1',
    'child': 'child1',
    'course': 'Khóa học mầm chì màu học kì 1 năm học 2022',
    'price': 2000000,
    'status': 'Đang tiến hành',
    'date': '2022-07-07 30:20:10'
  },
  {
    'id': 2,
    'parent': 'parent2',
    'child': 'child2',
    'course': 'Khóa học chồi chì màu học kì 1 năm học 2022',
    'price': 2000000,
    'status': 'Đang tiến hành',
    'date': '2022-07-07 30:20:10'
  }
]

function TurnoverList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.parent}</td>
      <td>{product.child}</td>
      <td>{product.course}</td>
      <td>{product.price}</td>
      <td>{product.status}</td>
      <td>{product.date}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Phụ huynh</th>
            <th scope="col">Học sinh</th>
            <th scope="col">Khóa học</th>
            <th scope="col">Giá tiền</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày giao dịch</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default TurnoverList;
