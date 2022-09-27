import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardSemesterClassStudentProperties } from "../types/TopCardSemesterClassStudent.types";

function TopCardSemesterClassStudent(props: PropsWithChildren<ICardSemesterClassStudentProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (course: PropsWithChildren<ICardSemesterClassStudentProperties>) =>{ 
        localStorage.removeItem('description_course');
        localStorage.setItem('description_course', course.description);
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.course_id.toString())
        localStorage.removeItem('course_name');
        localStorage.setItem('course_name', course.course_name)
        localStorage.removeItem('art_age_name');
        localStorage.setItem('art_age_name', course.art_age_name.toString())
        localStorage.removeItem('art_type_name');
        localStorage.setItem('art_type_name', course.art_type_name.toString())
        localStorage.removeItem('num_of_section');
        localStorage.setItem('num_of_section', course.num_of_section.toString())
        localStorage.removeItem('schedule');
        localStorage.setItem('schedule', course.schedule.toString())
        localStorage.removeItem('art_level_name');
        localStorage.setItem('art_level_name', course.art_level_name.toString())
        localStorage.removeItem('semester_class_name');
        localStorage.setItem('semester_class_name', course.name.toString())
        localStorage.removeItem('price');
        localStorage.setItem('price', course.price.toString())
        localStorage.removeItem('semester_class_id');
        localStorage.setItem('semester_class_id', course.semester_class_id.toString())
        localStorage.removeItem('url_image');
        localStorage.setItem('url_image', course.url_image.toString())
        let path = '/courses/detail'; 
        history.push({
            pathname: path
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
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">{props.art_level_name}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{props.art_age_name}</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">{props.num_of_section}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-12" ><span className="header-card-course-teacher">Lịch học:</span> <span className="header-card-course-value-teacher">{props.schedule}</span></p>
                    </div>
                    <div className="row">
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Giá:</span> <span className="header-card-course-value-teacher">{props.price} VNĐ</span></p>
                        <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Trạng thái:</span> <span className="header-card-course-value-teacher">{props.status}</span></p>
                    </div>
                        {/* <div className="col-xl-4 col-md-4 col-xs-4">
                            <div className="row justify-content-center">
                                <img className="image-course-teacher" src={props.url_image} alt="Preview"/>
                            </div>
                        </div> */}
                       {/*  <div className="col-xl-8 col-md-8 col-xs-8"> */}
                            {/* <div className="row justify-content-center">
                                <h5 id="name-course-teacher">{props.name}</h5>
                            </div> */}
                            
                            
                        {/* </div> */}
                </div>
            </div>
        </div>
    );
}


export default TopCardSemesterClassStudent;
