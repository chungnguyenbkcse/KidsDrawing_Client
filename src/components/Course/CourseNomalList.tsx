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
    'name': 'Khóa học mầm chì màu',
    'art_type': 'Chì màu',
    'art_level': '4-6 tuổi'
  },
  {
    'id': 2,
    'name': 'Khóa học chồi chì màu',
    'art_type': 'Chì màu',
    'art_level': '6-10 tuổi'
  },
]

function CourseNomalList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = '/teachers/detail'; 
    history.push(path);
  }

  const productElements: (JSX.Element | null)[] = data.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      onClick={routeChange}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.art_type}</td>
      <td>{product.art_level}</td>
      <td>
        <button type="button" className="btn btn-primary">Chỉnh sửa thông tin</button>
      </td>
      <td>
        <button type="button" className="btn btn-warning">Chỉnh sửa giáo án</button>
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
            <th scope="col">Tên</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Độ tuổi</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
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

export default CourseNomalList;
