import React, { useState, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../common/service/User/GetUserById";
import { putStatusUser } from "../../common/service/User/UpdateStatusUser";
import { logout } from "../../store/actions/account.actions";
import { trackPromise } from "react-promise-tracker";
import { IStateType, IUserState } from "../../store/models/root.interface";

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const username: string | null = localStorage.getItem('username');
  const id = localStorage.getItem('id')
  const users: IUserState = useSelector((state: IStateType) => state.users);
  useEffect(() => {
    trackPromise(getUserById(dispatch, id))
  }, [dispatch, id])
  const [isShow, setShow] = useState(false);

  console.log(users.teachers)
  let profile_image = ""
  if (users.teachers.length > 0 ){
    localStorage.setItem('profile_image', users.teachers[0].profile_image_url)
  }

  var id_x = localStorage.getItem('profile_image');
  if (id_x !== null) {
    profile_image = id_x;
  }

  return (

    <li className="nav-item dropdown no-arrow">
      <p className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{username}</span>
        <img className="img-profile rounded-circle" alt=""
          src={profile_image !== null ? profile_image :  "https://source.unsplash.com/QAB-WJcbgJk/60x60"} />
      </p>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a className="dropdown-item"
        onClick={() =>{}}
        href="/account" 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Chỉnh thông tin các nhân
        </a>
        <a className="dropdown-item"
        onClick={() =>{}}
        href="/change-password" 
        data-toggle="modal"
        data-target="#change-password">
          <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
          Thay đổi mật khẩu
        </a>
        <p className="dropdown-item logout-btn"
        onClick={() => {
          let id = localStorage.getItem('id');
          localStorage.clear();
          dispatch(logout())
          dispatch(putStatusUser(id, {
            status: null
          }))
        }}
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </p>
      </div>
    </li>
  );
};

export default TopMenuAccount;
