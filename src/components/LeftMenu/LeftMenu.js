
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


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = () => {

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="collapseMenu" className="navbar-nav bg-gradient-primary-green sidebar-dark accordion">
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
              <MenuItem active={true} icon={<FiHome />}>
                <Link to={`/home`}>
                  Trang chủ
                </Link>
              </MenuItem>
              <SubMenu icon={<FaList />} title="Giáo vụ" color="#ffffff">
                <MenuItem icon={<MdSchool />}> 
                  <Link className="nav-link" to={`/contests`}>
                      <span> Cuộc thi</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<GiVideoConference />}> 
                  <Link className="nav-link" to={`/class`}>
                      <span> Lớp</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineFileText />}> 
                  <Link className="nav-link" to={`/courses`}>
                      <span> Khóa học</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<RiPencilLine />} title="Người dùng" color="#ffffff">
                <MenuItem icon={<FaChalkboardTeacher />}> 
                  <Link className="nav-link" to={`/teachers`}>
                      <span> Giáo viên</span>
                  </Link> 
                </MenuItem>
                <MenuItem icon={<FaChild />}> 
                  <Link className="nav-link" to={`/students`}>
                      <span> Học sinh</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<RiParentFill />}> 
                  <Link className="nav-link" to={`/parents`}>
                      <span> Phụ huynh</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<FaRegHeart />}>
                <Link to={`/turnovers`}>
                    <span> Phân tích</span>
                </Link>
              </MenuItem>
              <SubMenu icon={<BiCog />} title="Thiết lâp" color="#ffffff">
                <MenuItem icon={<BsMap />}>
                  <Link className="nav-link" to={`/semesters`}>
                    <span> Học kì</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<AiOutlineBook />}> 
                  <Link className="nav-link" to={`/lessons`}>
                      <span> Tiết học</span>
                  </Link>
                </MenuItem>
                <MenuItem icon={<FaPaintBrush />}> 
                  <Link className="nav-link" to={`/arts`}>
                      <span> Nghệ thuật</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<BiCog />} title="Yêu cầu" color="#ffffff">
                <MenuItem icon={<BsMap />}> 
                  <Link className="nav-link" to={`/tutorial-edit`}>
                  <span> Giáo án</span>
                  </Link> 
                </MenuItem>
                <MenuItem icon={<AiOutlineBook />}> 
                  <Link className="nav-link" to={`/request-teacher-off`}>
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
};

export default Header;
