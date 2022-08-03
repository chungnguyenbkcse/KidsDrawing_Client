import React, { Fragment } from "react";
import TopCard from "../../common/components/TopCard";
import { ChartBar } from "../../common/components/ChartBar";

const TeacherHome: React.FC = () => {

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                <TopCard title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <ChartBar />
                </div>
            </div>

        </Fragment>
    );
};

export default TeacherHome;
