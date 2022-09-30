import React from "react";
import { IProduct } from "../../store/models/product.interface";
import { useHistory } from "react-router-dom";
import { RatingStar } from "rating-star";

export type productListProps = {
    onSelect?: (product: IProduct) => void;
    children?: React.ReactNode;
};

const data = [
    {
        'id': 1,
        'class_name': 'CM-1',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022',
        'rating_star': 4
    },
    {
        'id': 2,
        'class_name': 'CM-2',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022',
        'rating_star': 5
    },
    {
        'id': 3,
        'class_name': 'CM-3',
        'course_name': 'Chì màu 4-6 tuổi',
        'semester': 'Học kì 1 2022',
        'rating_star': 3.5
    },
]

function HistoryTeach(props: productListProps): JSX.Element {
    const history = useHistory();

    const routeChange = () => {
        let path = '/teachers/detail';
        history.push(path);
    }

    const productElements: (JSX.Element | null)[] = data.map(product => {
        if (!product) { return null; }
        return (<tr className={`table-row`}
            onClick={routeChange}
            key={`product_${product.id}`}>
            <th scope="row">{product.id}</th>
            <td>{product.class_name}</td>
            <td>{product.course_name}</td>
            <td>{product.semester}</td>
            <td>
                <RatingStar id={product.class_name} rating={product.rating_star} />
            </td>
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
                        <th scope="col">Đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {productElements}
                </tbody>
            </table>
        </div>

    );
}

export default HistoryTeach;
