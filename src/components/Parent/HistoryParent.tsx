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
        'class_name': 'CM-1',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
    {
        'id': 2,
        'class_name': 'CM-2',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
    {
        'id': 3,
        'class_name': 'CM-3',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022'
    },
]

function HistoryParent(props: productListProps): JSX.Element {
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const history = useHistory();

    const routeChange = () => {
        let path = '/students/detail';
        history.push(path);
    }

    const productElements: (JSX.Element | null)[] = data.map(product => {
        if (!product) { return null; }
        return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
            onClick={routeChange}
            key={`product_${product.id}`}>
            <th scope="row">{product.id}</th>
            <td>{product.class_name}</td>
            <td>{product.course_name}</td>
            <td>{product.semester}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mã lớp</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Học kì</th>
                    </tr>
                </thead>
                <tbody>
                    {productElements}
                </tbody>
            </table>
        </div>

    );
}

export default HistoryParent;
