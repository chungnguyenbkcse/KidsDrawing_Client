import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/TopCardCourseNew.types";

function TopCardCourseNew(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (course: PropsWithChildren<ICardProperties>) =>{ 
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.id.toString())
        let path = '/courses/semester-classes'; 
        history.push({
            pathname: path
        });
    }

    return (
        <div className="col-xl-4 col-md-4 mb-2" onClick={() => {routeChange(props)}}>
            <div className={`card shadow h-100 py-0`} id="topcard-user" >
                <img className="card-img-top" src={props.image_url} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{props.art_type_name}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">{props.art_level_name}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{props.art_age_name}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">{props.num_of_section}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Số lớp mở:</span> <span className="header-card-course-value-teacher">{props.total}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Giá:</span> <span className="header-card-course-value-teacher">{props.price} VNĐ</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardCourseNew;
