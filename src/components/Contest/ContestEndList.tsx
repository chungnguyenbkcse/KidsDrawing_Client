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
        'name': 'Cuộc thi vẽ tranh gia đình',
        'art_type': 'Chì màu',
        'art_level': '4-6 tuổi',
        'start_time': '8:00 AM 10/08/2022',
        'end_time': '8:00 AM 10/09/2022'
    },
    {
        'id': 2,
        'name': 'Cuộc thi vẽ tranh về môi trường',
        'art_type': 'Chì màu',
        'art_level': '6-10 tuổi',
        'start_time': '8:00 AM 10/08/2022',
        'end_time': '8:00 AM 10/09/2022'
    },
]

function ContestEndList(props: productListProps): JSX.Element {
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const history = useHistory();

    const routeChange = () => {
        let path = '/courses/detail';
        history.push(path);
    }

    const routeChange1 = () => {
        let path = '/courses/lesson-plan';
        history.push(path);
    }

    const productElements: (JSX.Element | null)[] = data.map(product => {
        if (!product) { return null; }
        return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
            key={`product_${product.id}`}>
            <th scope="row">{product.id}</th>
            <td onClick={routeChange}>{product.name}</td>
            <td>{product.art_type}</td>
            <td>{product.art_level}</td>
            <td>{product.start_time}</td>
            <td>{product.end_time}</td>
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
                        <th scope="col">Thời gian bắt đầu</th>
                        <th scope="col">Thời gian kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {productElements}
                </tbody>
            </table>
        </div>

    );
}

export default ContestEndList;
