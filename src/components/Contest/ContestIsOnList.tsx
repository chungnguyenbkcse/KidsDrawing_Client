import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestState } from "../../store/models/root.interface";
import { IContest } from "../../store/models/contest.interface";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../common/components/ConverDate";

export type contestListProps = {
    onSelect?: (contest: IContest) => void;
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}

function ContestIsOnList(props: contestListProps): JSX.Element {
    const contests: IContestState = useSelector((state: IStateType) => state.contests);
    const history = useHistory();

    const routeChange = () => {
        let path = '/contests/detail';
        history.push(path);
    }
    const date_0 = new Date();
    const date = date_0.toUTCString()
    //console.log(date)
    const date_now = formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16);
    console.log( formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16))
    
    const contestElements: (JSX.Element | null)[] = contests.contests.map((contest, index) => {
        var strDate1 = contest.start_time;
        var strDate2 = contest.end_time;
        if (!contest || strDate1 > date_now || date_now > strDate2) { return null; }
        return (<tr className={`table-row ${(contests.selectedContest && contests.selectedContest.id === contest.id) ? "selected" : ""}`}
            key={`contest_${contest.id}`}>
            <th scope="row">{index + 1}</th>
            <td onClick={routeChange}>{contest.name}</td>
            <td>{contest.art_type_name}</td>
            <td>{contest.art_age_name}</td>
            <td>{strDate1.substring(0, 10) + " " + strDate1.substring(11,19)}</td>
            <td>{strDate2.substring(0, 10) + " " + strDate2.substring(11,19)}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Độ tuổi</th>
                        <th scope="col">Thời gian bắt đầu</th>
                        <th scope="col">Thời gian kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {contestElements}
                </tbody>
            </table>
        </div>

    );
}

export default ContestIsOnList;
