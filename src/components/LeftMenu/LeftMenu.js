
//import useState hook to create menu collapse state
import React, { useState } from "react";

import { Link } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { BsMap } from "react-icons/bs";
import { AiOutlineBook, AiOutlineFileText } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = () => {

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  var role_privilege = localStorage.getItem('role_privilege')
  var rolePrivilege = []
  var roleUser = ""
  if (role_privilege !== null) {
      rolePrivilege = role_privilege.split(',')
      roleUser = rolePrivilege[0]
  }

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);
  const [active7, setActive7] = useState(false);
  const [active8, setActive8] = useState(false);
  const [active9, setActive9] = useState(false);
  const [active10, setActive10] = useState(false);
  const [active11, setActive11] = useState(false);
  const [active12, setActive12] = useState(false);
  const [active13, setActive13] = useState(false);
  const [active14, setActive14] = useState(false);
  const [active15, setActive15] = useState(false);
  const [active16, setActive16] = useState(false);
  const [active17, setActive17] = useState(false);

  if (roleUser === 'ADMIN_USER') {
    return (
      <>
        <div id="collapseMenu" className="navbar-nav admin-navbar-nav bg-gradient-primary-green sidebar-dark accordion">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? "" : "KidsDrawing"}</p>
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={active1} icon={<FiHome />}>
                  <Link to={`/home`} className={active1 ? "link-active" : ""} onClick={() => {
                    if (active1 === false) {
                      setActive1(true);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                  }}>
                    Trang chủ
                  </Link>
                </MenuItem>
                <SubMenu active={active2} icon={<FaList />} title="Giáo vụ" color="#ffffff" className={active2 ? "link-active" : ""}>
                  <MenuItem icon={<AiOutlineFileText />}>
                    <Link className={active9 ? "nav-link link-active" : "nav-link"} to={`/courses`} onClick={() => {
                      if (active2 === false) {
                        setActive1(false);
                        setActive2(true);
                        setActive3(false);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active9 === false) {
                        setActive7(false);
                        setActive8(false);
                        setActive9(true);
                      }
                    }}>
                      <span> Khóa học</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<GiVideoConference />}>
                    <Link className={active8 ? "nav-link link-active" : "nav-link"} to={`/class`} onClick={() => {
                      if (active2 === false) {
                        setActive1(false);
                        setActive2(true);
                        setActive3(false);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active8 === false) {
                        setActive7(false);
                        setActive8(true);
                        setActive9(false);
                      }
                    }}>
                      <span> Lớp</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<MdSchool />} active={active2}>
                    <Link to={`/contests`} className={active7 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active2 === false) {
                        setActive1(false);
                        setActive2(true);
                        setActive3(false);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active7 === false) {
                        setActive7(true);
                        setActive8(false);
                        setActive9(false);
                      }
                    }}>
                      <span> Cuộc thi</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu active={active3} icon={<RiPencilLine />} title="Người dùng" color="#ffffff" className={active3 ? "link-active" : ""} onClick={() => {
                  if (active3 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(true);
                    setActive4(false);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<FaChalkboardTeacher />}>
                    <Link to={`/teachers`} className={active10 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (setActive3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active10 === false) {
                        setActive10(true);
                        setActive11(false);
                        setActive12(false);
                      }
                    }}>
                      <span> Giáo viên</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<FaChild />}>
                    <Link to={`/students`}  className={active11 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (setActive3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active11 === false) {
                        setActive10(false);
                        setActive11(true);
                        setActive12(false);
                      }
                    }}>
                      <span> Học sinh</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<RiParentFill />}>
                    <Link to={`/parents`} className={active12 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (setActive3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active12 === false) {
                        setActive7(false);
                        setActive8(false);
                        setActive12(true);
                      }
                    }}>
                      <span> Phụ huynh</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem active={active4} icon={<FaRegHeart />}>
                  <Link to={`/turnovers`} className={active4 ? "link-active" : ""} onClick={() => {
                    if (active4 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(false);
                      setActive4(true);
                      setActive5(false);
                      setActive6(false);
                    }
                  }}>
                    <span> Phân tích</span>
                  </Link>
                </MenuItem>
                <SubMenu active={active5} icon={<BiCog />} title="Thiết lâp" color="#ffffff" className={active5 ? "link-active" : ""} onClick={() => {
                  if (active5 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(true);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/semesters`} className={active13 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active5 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(true);
                        setActive6(false);
                      }
                      if (active13 === false) {
                        setActive13(true);
                        setActive14(false);
                        setActive15(false);
                      }
                    }}>
                      <span> Học kì</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/lessons`} className={active14 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active5 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(true);
                        setActive6(false);
                      }
                      if (active14 === false) {
                        setActive13(false);
                        setActive14(true);
                        setActive15(false);
                      }
                    }}>
                      <span> Tiết học</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<FaPaintBrush />}>
                    <Link to={`/arts`} className={active15 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active5 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(true);
                        setActive6(false);
                      }
                      if (active15 === false) {
                        setActive13(false);
                        setActive14(false);
                        setActive15(true);
                      }
                    }}>
                      <span> Nghệ thuật</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu active={active6} icon={<BiCog />} title="Yêu cầu" color="#ffffff" className={active6 ? "link-active" : ""} onClick={() => {
                  if (active6 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(false);
                    setActive6(true);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/tutorial-edit`} className={active16 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active6 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(false);
                        setActive6(true);
                      }
                      if (active16 === false) {
                        setActive16(true);
                        setActive17(false);
                      }
                    }}>
                      <span> Giáo án</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/request-teacher-off`} className={active17 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active6 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(false);
                        setActive6(true);
                      }
                      if (active17 === false) {
                        setActive16(false);
                        setActive17(true);
                      }
                    }}>
                      <span> Nghỉ dạy</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    );
  }
  else if (roleUser === 'TEACHER_USER') {
    return (
      <>
        <div id="collapseMenu" className="navbar-nav teacher-navbar-nav bg-gradient-primary-green sidebar-dark accordion">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? "" : "KidsDrawing"}</p>
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={active1} icon={<FiHome />}>
                  <Link to={`/home`} className={active1 ? "link-active" : ""} onClick={() => {
                    if (active1 === false) {
                      setActive1(true);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                  }}>
                    Trang chủ
                  </Link>
                </MenuItem>
                <MenuItem active={active2} icon={<MdSchool />}>
                  <Link to={`/teacher-level`} className={active2 ? "link-active" : ""} onClick={() => {
                    if (active2 === false) {
                      setActive1(false);
                      setActive2(true);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                  }}>
                    Trình độ
                  </Link>
                </MenuItem>
                <SubMenu active={active3} icon={<BiCog />} title="Khám phá" color="#ffffff" className={active3 ? "link-active" : ""} onClick={() => {
                  if (active3 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(true);
                    setActive4(false);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/courses`} className={active7 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active7 === false) {
                        setActive7(true);
                        setActive8(false);
                      }
                    }}>
                      <span> Khóa học</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/courses`} className={active8 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active8 === false) {
                        setActive7(false);
                        setActive8(true);
                      }
                    }}>
                      <span> Cuộc thi</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu active={active4} icon={<BiCog />} title="Giáo vụ" color="#ffffff" className={active3 ? "link-active" : ""} onClick={() => {
                  if (active4 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(true);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/classes`} className={active9 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active4 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(true);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active9 === false) {
                        setActive9(true);
                        setActive10(false);
                      }
                    }}>
                      <span> Lớp</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/contests`} className={active10 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active4 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(true);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active10 === false) {
                        setActive9(false);
                        setActive10(true);
                      }
                    }}>
                      <span> Cuộc thi</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu active={active5} icon={<BiCog />} title="Giáo vụ" color="#ffffff" className={active5 ? "link-active" : ""} onClick={() => {
                  if (active5 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(true);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/request`} className={active11 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active5 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(true);
                        setActive6(false);
                      }
                      if (active11 === false) {
                        setActive11(true);
                        setActive12(false);
                      }
                    }}>
                      <span> Nghỉ phép</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/request`} className={active12 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active5 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(false);
                        setActive5(true);
                        setActive6(false);
                      }
                      if (active12 === false) {
                        setActive11(false);
                        setActive12(true);
                      }
                    }}>
                      <span> Dạy thay</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem active={active5} icon={<MdSchool />}>
                  <Link to={`/schedule-teacher`} className={active5 ? "link-active" : ""} onClick={() => {
                    if (active6 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(true);
                    }
                  }}>
                    Thời khóa biểu
                  </Link>
                </MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem>
                  <img className="img-profile rounded-circle img-sideleft" alt="" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png" />
                </MenuItem>
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    );
  }
  else if (roleUser === 'PARENT_USER') {
    return (
      <>
        <div id="collapseMenu" className="navbar-nav teacher-navbar-nav bg-gradient-primary-green sidebar-dark accordion">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? "" : "KidsDrawing"}</p>
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle />
                ) : (
                  <FiArrowLeftCircle />
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={active1} icon={<FiHome />}>
                  <Link to={`/home`} className={active1 ? "link-active" : ""} onClick={() => {
                    if (active1 === false) {
                      setActive1(true);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                  }}>
                    Trang chủ
                  </Link>
                </MenuItem>
                <SubMenu active={active3} icon={<BiCog />} title="Quản lý" color="#ffffff" className={active3 ? "link-active" : ""} onClick={() => {
                  if (active3 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(true);
                    setActive4(false);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/classes`} className={active7 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active7 === false) {
                        setActive7(true);
                        setActive8(false);
                      }
                    }}>
                      <span> Lớp của bé</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/contests`} className={active8 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active3 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(true);
                        setActive4(false);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active8 === false) {
                        setActive7(false);
                        setActive8(true);
                      }
                    }}>
                      <span> Cuộc thi của bé</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <SubMenu active={active4} icon={<BiCog />} title="Khám phá" color="#ffffff" className={active4 ? "link-active" : ""} onClick={() => {
                  if (active4 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(true);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  <MenuItem icon={<BsMap />}>
                    <Link to={`/discover`} className={active9 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active4 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(true);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active9 === false) {
                        setActive9(true);
                        setActive10(false);
                      }
                    }}>
                      <span> Khóa học</span>
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<AiOutlineBook />}>
                    <Link to={`/discover`} className={active10 ? "nav-link link-active" : "nav-link"} onClick={() => {
                      if (active4 === false) {
                        setActive1(false);
                        setActive2(false);
                        setActive3(false);
                        setActive4(true);
                        setActive5(false);
                        setActive6(false);
                      }
                      if (active10 === false) {
                        setActive9(false);
                        setActive10(true);
                      }
                    }}>
                      <span> Cuộc thi</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
                <MenuItem active={active6} icon={<MdSchool />}>
                  <Link to={`/schedules`} className={active6 ? "link-active" : ""} onClick={() => {
                    if (active6 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(false);
                      setActive4(false);
                      setActive5(false);
                      setActive6(true);
                    }
                  }}>
                    Thời khóa biểu
                  </Link>
                </MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem>
                  <img className="img-profile rounded-circle" alt="" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png" />
                </MenuItem>
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    );
  }
  return (
    <>
      <div id="collapseMenu" className="navbar-nav  teacher-navbar-nav bg-gradient-primary-green sidebar-dark accordion">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "" : "KidsDrawing"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={active1} icon={<FiHome />}>
                <Link to={`/home`} className={active1 ? "link-active" : ""} onClick={() => {
                  if (active1 === false) {
                    setActive1(true);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(false);
                    setActive6(false);
                  }
                }}>
                  Trang chủ
                </Link>
              </MenuItem>
              <SubMenu active={active3} icon={<BiCog />} title="Quản lý" color="#ffffff" className={active3 ? "link-active" : ""} onClick={() => {
                if (active3 === false) {
                  setActive1(false);
                  setActive2(false);
                  setActive3(true);
                  setActive4(false);
                  setActive5(false);
                  setActive6(false);
                }
              }}>
                <MenuItem icon={<BsMap />}>
                  <Link to={`/classes`} className={active7 ? "nav-link link-active" : "nav-link"} onClick={() => {
                    if (active3 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(true);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                    if (active7 === false) {
                      setActive7(true);
                      setActive8(false);
                    }
                  }}>
                    <span> Lớp của bé</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineBook />}>
                  <Link to={`/contests`} className={active8 ? "nav-link link-active" : "nav-link"} onClick={() => {
                    if (active3 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(true);
                      setActive4(false);
                      setActive5(false);
                      setActive6(false);
                    }
                    if (active8 === false) {
                      setActive7(false);
                      setActive8(true);
                    }
                  }}>
                    <span> Cuộc thi của bé</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu active={active4} icon={<BiCog />} title="Khám phá" color="#ffffff" className={active4 ? "link-active" : ""} onClick={() => {
                if (active4 === false) {
                  setActive1(false);
                  setActive2(false);
                  setActive3(false);
                  setActive4(true);
                  setActive5(false);
                  setActive6(false);
                }
              }}>
                <MenuItem icon={<BsMap />}>
                  <Link to={`/discover`} className={active9 ? "nav-link link-active" : "nav-link"} onClick={() => {
                    if (active4 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(false);
                      setActive4(true);
                      setActive5(false);
                      setActive6(false);
                    }
                    if (active9 === false) {
                      setActive9(true);
                      setActive10(false);
                    }
                  }}>
                    <span> Khóa học</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineBook />}>
                  <Link to={`/discover`} className={active10 ? "nav-link link-active" : "nav-link"} onClick={() => {
                    if (active4 === false) {
                      setActive1(false);
                      setActive2(false);
                      setActive3(false);
                      setActive4(true);
                      setActive5(false);
                      setActive6(false);
                    }
                    if (active10 === false) {
                      setActive9(false);
                      setActive10(true);
                    }
                  }}>
                    <span> Cuộc thi</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <MenuItem active={active6} icon={<BsCashCoin />}>
                <Link to={`/schedules`} className={active6 ? "link-active" : ""} onClick={() => {
                  if (active6 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(false);
                    setActive6(true);
                  }
                }}>
                  Thời khóa biểu
                </Link>
              </MenuItem>
              <MenuItem active={active5} icon={<BsCashCoin />}>
                <Link to={`/game/guess-color`} className={active5 ? "link-active" : ""} onClick={() => {
                  if (active5 === false) {
                    setActive1(false);
                    setActive2(false);
                    setActive3(false);
                    setActive4(false);
                    setActive5(true);
                    setActive6(false);
                  }
                }}>
                  Trò chơi
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem>
                  <img className="img-profile rounded-circle" alt="" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png" />
                </MenuItem>
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
