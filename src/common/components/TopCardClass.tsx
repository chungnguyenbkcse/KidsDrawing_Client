import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/TopCardClass.types";

function TopCardClass(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (class_id: any) =>{ 
        let path = '/classes/detail'; 
        localStorage.removeItem("class_id");
        localStorage.setItem("class_id", class_id.toString())
        history.push({
            pathname: path,
            state: { class_id: class_id }
        });
    }

    return (
        <div className="col-xl-12 col-md-12 mb-4" onClick={() => {routeChange(props.class_id)}}>
            <div className={`card shadow h-100 py-0`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-12- col-md-12 col-xs-12">
                            <div className="row justify-content-center">
                                <h5 id="name-course-teacher">Lớp: {props.name}  (Mã Lớp: {props.security_code})</h5>
                            </div>
                            <div className="row">
                                <p className="col-6" id="type-name-teacher"><span className="header-card-course-teacher">Khóa học:</span> <span className="header-card-course-value-teacher">{props.course_name}</span></p>
                                <p className="col-6" id="level-name-teacher"><span className="header-card-course-teacher">Học kì:</span> <span className="header-card-course-value-teacher">{props.semester_name}</span></p>
                            </div>  
                            <div className="row">
                                <p className="col-6" id="price-teacher"><span className="header-card-course-teacher">Số học sinh:</span> <span className="header-card-course-value-teacher">{props.total_student} VNĐ</span></p>
                                <p className="col-6" id="time-register-teacher"><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">{props.num_of_section}</span></p>
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


export default TopCardClass;
