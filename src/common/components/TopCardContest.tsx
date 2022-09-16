import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/TopCardContest.types";

function TopCardContest(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (description: string, id: number) =>{ 
        localStorage.removeItem('description_contest');
        localStorage.setItem('description_contest', description);
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', id.toString())
        let path = '/contests/detail'; 
        history.push({
            pathname: path,
            state: { description: description, id: id}
        });
    }

    return (
        <div className="col-xl-4 col-md-4 mb-2" onClick={() => {routeChange(props.description, props.id)}}>
            <div className={`card shadow h-100 py-0`} id="topcard-user" >
                <img className="card-img-top" src={props.url_image} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{props.art_type_name}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{props.art_age_name}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thời gian đăng kí:</span> <span className="header-card-course-value-teacher">{props.registration_time}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thời gian bắt đầu:</span> <span className="header-card-course-value-teacher">{props.start_time}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-12" ><span className="header-card-course-teacher">Thời gian kết thúc:</span> <span className="header-card-course-value-teacher">{props.end_time}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardContest;
