import React, { useState, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IoNotificationsSharp } from "react-icons/io5"

function TopMenuNotification(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  //const username: string = useSelector((state: IStateType) => state.account.username);
  const [isShow, setShow] = useState(false);

  return (

    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        href="# "
        id="userDropdown"
        role="button"
        style={{color: "white"}}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <IoNotificationsSharp color="#1E90FF"/>
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a className="dropdown-item"
        onClick={() =>{}}
        href="# " 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
          Yêu cầu nghỉ học
        </a>
        <a className="dropdown-item"
        onClick={() => dispatch(logout())}
        href="# " 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
};

export default TopMenuNotification;
