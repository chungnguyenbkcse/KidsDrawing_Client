import React from "react";
import TopMenuAccount from "./TopMenuAccount";
import "./TopMenu.css";
import { useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import TopMenuNotification from "./TopNotification";
import TopMenuCart from "./TopMenuCart";

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
  else if (roleUser === "TEACHER_USER"){
    return (
      <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4 static-top" id="teacher_navbar">
        <ol className="breadcrumb dark-breadcrumb" id="teacher_breadcrumb">
          <li className="breadcrumb-item teacher-breadcrumb-item"><p className="mb-2 text-gray-400" id="home-teacher">{page ? page.area : null}</p></li>
          <li className="breadcrumb-item teacher-breadcrumb-item"><p className="mb-2 text-gray-400" id="home-teacher">{page ? page.subArea : null}</p></li>
        </ol>
  
        <ul className="navbar-nav ml-auto">
          <TopMenuNotification />
          <div className="topbar-divider d-none d-sm-block"></div>
          <TopMenuAccount />
        </ul>
      </nav>
    );
  }

  else if (roleUser === "PARENT_USER" || roleUser === "STUDENT_USER") {
    return (
      <nav className="navbar navbar-expand navbar-light bg-custom-dark topbar mb-4" id="teacher_navbar">
        <ol className="breadcrumb dark-breadcrumb" id="teacher_breadcrumb">
          <li className="breadcrumb-item teacher-breadcrumb-item"><p className="mb-2 text-gray-400" id="home-teacher">{page ? page.area : null}</p></li>
          <li className="breadcrumb-item teacher-breadcrumb-item"><p className="mb-2 text-gray-400" id="home-teacher">{page ? page.subArea : null}</p></li>
        </ol>
  
        <ul className="navbar-nav ml-auto">
          <TopMenuCart />
          <div className="topbar-divider d-none d-sm-block"></div>
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
