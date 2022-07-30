import React, { Fragment, Dispatch, useEffect } from "react";
import ClassList from "./ClassList";
import TopCard from "../../common/components/TopCard";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType, ISemesterState } from "../../store/models/root.interface";
import {
    clearSelectedProduct, setModificationState,
    changeSelectedProduct
} from "../../store/actions/products.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import { getSemester } from "../../common/service/semester/GetSemester";
import { ISemester } from "../../store/models/semester.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";

type Options = {
    name: string;
    value: any;
}

const Class: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const products: IProductState = useSelector((state: IStateType) => state.products);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = products.products.length

    useEffect(() => {
        dispatch(clearSelectedProduct());
        dispatch(updateCurrentPath("Lớp học", "Danh sách"));
    }, [path.area, dispatch]);

    useEffect(() => {
        dispatch(getSemester())
    }, [dispatch])

    const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
    const listSemester: ISemester[] = semesters.semesters
    //console.log(listLevel)
    const listSemesters: Options[] = [];
    listSemester.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listSemesters.push(item)
    })

    function onProductSelect(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
        dispatch(setModificationState(ProductModificationStatus.None));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ LỚP HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="mb-4">
                        <div className="py-3">
                            <h6 className="m-0 font-weight-bold text-green">Xếp lớp</h6>
                        </div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <SelectKeyValue id="input_creation_id"
                                    field = "creation_id"
                                    value={0}
                                    onChange={() => {}}
                                    required={true}
                                    label="Học kì"
                                    options={listSemesters}
                                />
                                </div>
                            </div>
                            <button type="submit" className={`btn btn-success left-margin`}>Xếp lớp</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm"/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                        </div>
                        <div className="card-body">
                            <ClassList
                                onSelect={onProductSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default Class;
