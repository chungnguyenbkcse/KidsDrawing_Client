import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/TopCardCourse.types";

function TopCardCourse(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (description: string, course_id: number) =>{ 
        let path = '/courses/detail'; 
        history.push({
            pathname: path,
            state: { description: description, course_id: course_id}
        });
    }

    return (
        <div className="col-xl-12 col-md-12 mb-4" onClick={() => {routeChange(props.description, props.course_id)}}>
            <div className={`card shadow h-100 py-0`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 col-xs-4">
                            <div className="row justify-content-center">
                                <img className="image-course-teacher" src={props.url_image} alt="Preview"/>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-8 col-xs-8">
                            <div className="row justify-content-center">
                                <h5 id="name-course-teacher">{props.course_name}</h5>
                            </div>
                            <div className="row">
                                <p className="col-4" id="type-name-teacher"><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{props.art_type_name}</span></p>
                                <p className="col-4" id="level-name-teacher"><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">{props.art_level_name}</span></p>
                                <p className="col-4" id="age-name-teacher"><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{props.art_age_name}</span></p>
                            </div>  
                            <div className="row">
                                <p className="col-4" id="number-section-teacher"><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">{props.num_of_section}</span></p>
                                <p className="col-4" id="price-teacher"><span className="header-card-course-teacher">Giá:</span> <span className="header-card-course-value-teacher">{props.price} VNĐ</span></p>
                                <p className="col-4" id="time-register-teacher"><span className="header-card-course-teacher">Thời gian dự kiến bắt đàu:</span> <span className="header-card-course-value-teacher">{props.registration_deadline}</span></p>
                            </div>
                            <div className="row">
                                <p className="col-12" id="schedule-teacher"><span className="header-card-course-teacher">Lịch học:</span> <span className="header-card-course-value-teacher">{props.schedule}</span></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardCourse;
