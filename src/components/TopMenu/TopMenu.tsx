import React from "react";
import TopMenuAccount from "./TopMenuAccount";
import "./TopMenu.css";
import { useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import TopMenuNotification from "./TopNotification";

const TopMenu: React.FC = () => {
  const page: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  var role_privilege = localStorage.getItem('role_privilege')
  var rolePrivilege:string[] =[]
  var roleUser :string =""
  if (role_privilege !== null) {
      rolePrivilege = role_privilege.split(',')
      roleUser = rolePrivilege[0]
  }

  if (roleUser === "ADMIN_USER"){
    return (
      <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top shadow">
        <ol className="breadcrumb dark-breadcrumb">
          <li className="breadcrumb-item"><a href="# ">{page ? page.area : null}</a></li>
          <li className="breadcrumb-item"><a href="# ">{page ? page.subArea : null}</a></li>
        </ol>
  
        <ul className="navbar-nav ml-auto">
          <TopMenuNotification />
          <div className="topbar-divider d-none d-sm-block"></div>
          <TopMenuAccount />
        </ul>
      </nav>
    );
  }
  else if (roleUser === "TEACHER_USER" || roleUser === "PARENT_USER" || roleUser === "STUDENT_USER"){
    return (
      <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top" id="teacher_navbar">
        <ol className="breadcrumb dark-breadcrumb" id="teacher_breadcrumb">
          <li className="breadcrumb-item teacher-breadcrumb-item"><h1 className="h3 mb-2 text-gray-800" id="home-teacher">{page ? page.area : null}</h1></li>
          <li className="breadcrumb-item teacher-breadcrumb-item"><h1 className="h3 mb-2 text-gray-800" id="home-teacher">{page ? page.subArea : null}</h1></li>
        </ol>
  
        <ul className="navbar-nav ml-auto">
          <TopMenuNotification />
          <div className="topbar-divider d-none d-sm-block"></div>
          <TopMenuAccount />
        </ul>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top shadow">
      <ol className="breadcrumb dark-breadcrumb">
        <li className="breadcrumb-item"><a href="# ">{page ? page.area : null}</a></li>
        <li className="breadcrumb-item"><a href="# ">{page ? page.subArea : null}</a></li>
      </ol>

      <ul className="navbar-nav ml-auto">
        <TopMenuNotification />
        <div className="topbar-divider d-none d-sm-block"></div>
        <TopMenuAccount />
      </ul>
    </nav>
  );
  
};

export default TopMenu;
