import React, { PropsWithChildren, ReactElement } from "react";
import { ICardProperties } from "../types/TopCardLevel.types";

function TopCardCourse(props: PropsWithChildren<ICardProperties>): ReactElement {
    return (
        <div className="col-xl-12 col-md-12 mb-4">
            <div className={`card shadow h-100 py-0`} id="topcard-user">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 col-xs-4">
                            <div className="row justify-content-center">
                                <img className="image-course-teacher" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo9xqsZF_yYunSeg9vuq2UBWCGuuID6B7T1DCX2UQP&s" alt="Preview"/>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-8 col-xs-8">
                            <div className="row justify-content-center">
                                <h5 id="name-course-teacher">Khóa học mầm học kì 212 năm 2022</h5>
                            </div>
                            <div className="row">
                                <p className="col-4" id="type-name-teacher"><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">Chì màu</span></p>
                                <p className="col-4" id="level-name-teacher"><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">Cơ bản</span></p>
                                <p className="col-4" id="age-name-teacher"><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">5-10 tuổi</span></p>
                            </div>  
                            <div className="row">
                                <p className="col-4" id="number-section-teacher"><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">36 buổi</span></p>
                                <p className="col-4" id="price-teacher"><span className="header-card-course-teacher">Giá:</span> <span className="header-card-course-value-teacher">2.000.000 VNĐ</span></p>
                                <p className="col-4" id="time-register-teacher"><span className="header-card-course-teacher">Thời gian dự kiến bắt đàu:</span> <span className="header-card-course-value-teacher">1/7/2022</span></p>
                            </div>
                            <div className="row">
                                <p className="col-12" id="schedule-teacher"><span className="header-card-course-teacher">Lịch học:</span> <span className="header-card-course-value-teacher">Thứ 2 (7:00 - 8:00), Thứ 3(10:00 - 11:00)</span></p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardCourse;
