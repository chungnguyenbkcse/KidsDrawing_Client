import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IStateType } from "../../store/models/root.interface";

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const username: string = useSelector((state: IStateType) => state.account.username);
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
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{username}</span>
        <img className="img-profile rounded-circle" alt=""
          src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a className="dropdown-item"
        onClick={() =>{}}
        href="# " 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Chỉnh thông tin các nhân
        </a>
        <a className="dropdown-item"
        onClick={() => {
          localStorage.removeItem('access_token') // Authorization
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('username')
          localStorage.removeItem('role_privilege')
          localStorage.removeItem('id')
          localStorage.removeItem('contest_id')
          localStorage.removeItem('schedule_id')
          dispatch(logout())
        }}
        href="/aut" 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
};

export default TopMenuAccount;
