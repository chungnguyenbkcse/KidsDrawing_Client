import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtAgeState, ICourseReportState } from "../../store/models/root.interface";
import { IArtAge, ArtAgeModificationStatus } from "../../store/models/art_age.interface";
import { setModificationStateArtAge } from "../../store/actions/art_age.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { DoughnutPieCharts } from "../../common/components/DoughnutPieCharts";

export type artAgeListProps = {
    onSelect?: (art_age: IArtAge) => void;
    value?: string;
    children?: React.ReactNode;
};

function CourseAnalytis(props: artAgeListProps): JSX.Element {
  const course_reports: ICourseReportState = useSelector((state: IStateType) => state.course_reports); 

  let data_list: number[] = []
  let data_name_list: string[] = []
  if (course_reports.course_reports.length > 0){
    course_reports.course_reports.map(ele => {
          data_list.push(ele.total_register)
          data_name_list.push(ele.name)
    })
  }

  const currentYear = new Date().getFullYear();
    const data = {
        labels: data_name_list,
        datasets: [
          {
            label: '# of Votes',
            data: data_list,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <Fragment>
            <DoughnutPieCharts data ={data}/>
        </Fragment>
    );
}

export default CourseAnalytis;
