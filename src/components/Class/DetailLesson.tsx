import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedProduct
} from "../../store/actions/products.action";
import { useHistory } from "react-router-dom";




const DetailLesson: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length;

    var id_x = localStorage.getItem('link_recording')
    let link_recording = "";
    if (id_x !== null) {
        link_recording = id_x
    }
    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp CM-1", "Buổi 1"));
    }, [path.area, dispatch]);

    var id_y = localStorage.getItem('section_id')
    let section_id = "";
    if (id_y !== null) {
        section_id = id_y
    }

    const history = useHistory();
    const routeChange2 = () => {
        let path = "/section/view";
        history.push({
            pathname: path,
            state: { section_id: section_id }
        });
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Buổi 1</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ HỌC SINH THAM GIA" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>
            <div className="row">
                    
                            <button className={`btn btn-success ml-4 mb-4 mt-4`} onClick={routeChange2}>Xem giáo trình</button>
                </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Video buổi dạy học</h6>
                        </div>
                        <div className="card-body">
                        <iframe width="100%" height="315" src={link_recording} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment >
    );
};

export default DetailLesson;
