import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/TopCardContest.types";

function TopCardContest(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (contest: PropsWithChildren<ICardProperties>) =>{ 
        localStorage.removeItem('description_contest');
        localStorage.setItem('description_contest', contest.description);
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', contest.id.toString())
        localStorage.removeItem('contest_name');
        localStorage.setItem('contest_name', contest.name)
        localStorage.removeItem('art_age_name');
        localStorage.setItem('art_age_name', contest.art_age_name.toString())
        localStorage.removeItem('art_type_name');
        localStorage.setItem('art_type_name', contest.art_type_name.toString())
        localStorage.removeItem('registration_time');
        
        localStorage.removeItem('start_time');
        localStorage.setItem('start_time', contest.start_time.toString())
        localStorage.removeItem('end_time');
        localStorage.setItem('end_time', contest.end_time.toString())
        localStorage.removeItem('max_participant');
        localStorage.setItem('max_participant', contest.max_participant.toString())
        let path = '/contests/register'; 
        history.push({
            pathname: path,
            state: { description: contest.description, id: contest.id}
        });
    }

    return (
        <div className="col-xl-4 col-md-4 mb-2" onClick={() => {routeChange(props)}}>
            <div className={`card shadow h-100 py-0`} id="topcard-user" >
                <img className="card-img-top" src={props.url_image} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{props.art_type_name}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{props.art_age_name}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thời gian bắt đầu:</span> <span className="header-card-course-value-teacher">{props.start_time}</span></p>
                        <p className="col-12" ><span className="header-card-course-teacher">Thời gian kết thúc:</span> <span className="header-card-course-value-teacher">{props.end_time}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardContest;