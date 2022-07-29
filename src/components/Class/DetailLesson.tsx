import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";




const DetailLesson: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp CM-1", "Buổi 1"));
    }, [path.area, dispatch]);

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Buổi 1</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ HỌC SINH THAM GIA" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Thông tin chi tiết</h6>
                        </div>
                        <div className="card-body text-center">
                            <button className={`btn btn-success left-margin`}>Xem giáo trình</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Video buổi dạy học</h6>
                        </div>
                        <div className="card-body">
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/kROrqp0Dx8o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6"> </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Tin nhắn buổi học</h6>
                        </div>
                        <div className="card-body text-center">
                            <button className={`btn btn-success left-margin`}>Xuất</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default DetailLesson;
