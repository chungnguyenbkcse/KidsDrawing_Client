import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IProductState, IStateType } from "../../store/models/root.interface";
import { ChartBar } from "../../common/components/ChartBar";
import TurnoverList from "./TurnoverList";

const Turnover: React.FC = () => {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const totalPrice: number = products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Doanh thu", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Doanh thu</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="DOANH THU" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
      <div className="col-xl-12 col-lg-12">
        <ChartBar />
      </div>
      </div>

      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách giao dịch</h6>
            </div>
            <div className="card-body">
              <TurnoverList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default Turnover;
