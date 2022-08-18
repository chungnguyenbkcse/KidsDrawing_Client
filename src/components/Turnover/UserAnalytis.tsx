import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtAgeState } from "../../store/models/root.interface";
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

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 5, 6],
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
