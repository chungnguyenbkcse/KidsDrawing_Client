import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { BsMap } from "react-icons/bs";
import { AiOutlineBook, AiFillCalendar, AiOutlineFileText } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { TbDeviceGamepad2 } from "react-icons/tb";

const LeftMenu: React.FC = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon icon-green rotate-n-15">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">REACT <sup>Admin</sup></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="/Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý người dùng
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teachers`}>
                        <FaChalkboardTeacher />
                        <span> Giáo viên</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/students`}>
                        <FaChild />
                        <span> Học sinh</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/parents`}>
                        <RiParentFill />
                        <span> Phụ huynh</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Quản lý hệ thống
                </div>


                <li className="nav-item">
                    <Link className="nav-link" to={`/semesters`}>
                        <BsMap />
                        <span> Học kì</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/lessons`}>
                        <AiOutlineBook />
                        <span> Tiết học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/schedules`}>
                        <AiFillCalendar />
                        <span>Lịch học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/arts`}>
                        <FaPaintBrush />
                        <span> Nghệ thuật</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/courses`}>
                        <MdSchool />
                        <span> Khóa học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/class`}>
                        <GiVideoConference />
                        <span> Lớp</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/contests`}>
                        <AiOutlineFileText />
                        <span> Cuộc thi</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/revenues`}>
                        <BsCashCoin />
                        <span> Doanh thu</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Trò chơi
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/game`}>
                        <TbDeviceGamepad2 />
                        <span> Game nhận biết màu sắc</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Yêu cầu người dùng
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/request-student-off`}>
                        <span>Nghỉ học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/request-teacher-off`}>
                        <span>Nghỉ dạy</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/request-level`}>
                        <span>Xác nhận trình độ</span>
                    </Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
