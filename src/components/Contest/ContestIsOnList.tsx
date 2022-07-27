import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestState, IArtLevelState, IArtTypeState, IArtAgeState } from "../../store/models/root.interface";
import { IContest } from "../../store/models/contest.interface";
import { useHistory } from "react-router-dom";
import { IArtLevel } from "../../store/models/art_level.interface";
import { IArtType } from "../../store/models/art_type.interface";
import { IArtAge } from "../../store/models/art_age.interface";
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
    const levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
    const listLevel: IArtLevel[] = levels.artLevels
    const listLevels: Options[] = [];
    listLevel.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listLevels.push(item)
    })

    const mytypes: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const listMytype: IArtType[] = mytypes.artTypes
    const listMytypes: Options[] = [];
    listMytype.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listMytypes.push(item)
    })

    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const listArtAge: IArtAge[] = art_ages.artAges
    const listArtAges: Options[] = [];
    listArtAge.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listArtAges.push(item)
    })

    let typeList: string[] = []

    contests.contests.map((contest_item) => {
        return mytypes.artTypes.forEach(element => {
            if (element.id === contest_item.art_type_id) {
                return typeList.push(element.name)
            }
        });
    })



    let ageList: string[] = []
    contests.contests.map((contest_item) => {
        return art_ages.artAges.forEach(element => {
            if (element.id === contest_item.art_age_id) {
                return ageList.push(element.name)
            }
        });
    })

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
        var strDate3 = contest.registration_time;
        if (!contest || strDate1 > date_now || date_now > strDate2) { return null; }
        return (<tr className={`table-row ${(contests.selectedContest && contests.selectedContest.id === contest.id) ? "selected" : ""}`}
            key={`contest_${contest.id}`}>
            <th scope="row">{index + 1}</th>
            <td onClick={routeChange}>{contest.name}</td>
            <td>{typeList[index]}</td>
            <td>{ageList[index]}</td>
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
