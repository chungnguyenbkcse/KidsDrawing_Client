import React, { useState, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/account.actions";

function TopMenuNotification(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  //const username: string = useSelector((state: IStateType) => state.account.username);
  const [isShow, setShow] = useState(false);

  return (

    <li className="nav-item dropdown no-arrow">


      <a className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={() => {
        setShow(!isShow);
      }} href="# ">
        <span className="badge badge-danger ml-2">4</span>
        <i className="fas fa-bell"></i>
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow dropdown-secondary animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a className="dropdown-item waves-light"
          onClick={() => { }}
          href="# "
          data-toggle="modal"
          data-target="#logoutModal">
          <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
          Yêu cầu nghỉ học
          <span className="badge badge-danger ml-2">*</span>
        </a>
        <a className="dropdown-item waves-light"
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
