import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IProductState, IStateType } from "../../store/models/root.interface";
import ProductList from "../Products/ProductsList";
import { IOrder } from "../../store/models/order.interface";
import OrderList from "../Orders/OrderList";

const Home: React.FC = () => {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const numberItemsCount: number = products.products.length;
  const totalPrice: number = products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const totalProductAmount: number = products.products.reduce((prev, next) => prev + (next.amount || 0), 0);

  const orders: IOrder[] = useSelector((state: IStateType) => state.orders.orders);
  const totalSales: number = orders.reduce((prev, next) => prev + next.totalPrice, 0);
  const totalOrderAmount: number = orders.reduce((prev, next) => prev + next.amount, 0);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="KHÓA HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
        <TopCard title="CUỘC THI" text={`${totalProductAmount}`} icon="warehouse" class="danger" />
        <TopCard title="DOANH THU" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <TopCard title="HỌC VIÊN" text={totalSales.toString()} icon="donate" class="primary" />
        <TopCard title="GIÁO VIÊN" text={totalOrderAmount.toString()} icon="calculator" class="danger" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học được yêu thích</h6>
            </div>
            <div className="card-body">
              <ProductList />
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học ít người đăng ký</h6>
            </div>
            <div className="card-body">
              <OrderList />
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;
