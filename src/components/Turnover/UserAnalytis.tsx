import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtAgeState, IReportUserState } from "../../store/models/root.interface";
import { IArtAge, ArtAgeModificationStatus } from "../../store/models/art_age.interface";
import { setModificationStateArtAge } from "../../store/actions/art_age.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { DoughnutPieCharts } from "../../common/components/DoughnutPieCharts";
import { ChartLine } from "../../common/components/CharLine";

export type artAgeListProps = {
    onSelect?: (art_age: IArtAge) => void;
    value?: string;
    children?: React.ReactNode;
};

function CourseAnalytis(props: artAgeListProps): JSX.Element {

    const report_users: IReportUserState = useSelector((state: IStateType) => state.report_users); 

    let data_list: number[] = []
    if (report_users.report_users.length > 0){
        report_users.report_users.map(ele => {
            data_list.push(ele.total)
        })
    }

    const currentYear = new Date().getFullYear();

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: `Năm ${currentYear}`,
                data: data_list,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Fragment>
            <ChartLine data={data} />
        </Fragment>
    );
}

export default CourseAnalytis;
