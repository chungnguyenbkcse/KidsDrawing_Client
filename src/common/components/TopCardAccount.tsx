import React, { PropsWithChildren, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ICardProperties } from "../types/ICardAccountChild.types";

function TopCardAccount(props: PropsWithChildren<ICardProperties>): ReactElement {
    const history = useHistory();
    const routeChange = (student_id: number) =>{ 
        let path = '/students/detail'; 
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', student_id.toString())
        history.push({
            pathname: path
        });
    }

    return (
        <div className="col-xl-12 col-md-12 mb-4" onClick={() => {
            routeChange(props.student_id)}}
        >
            <div className={`card shadow h-100 py-2`} id="topcard-account">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col-xl-8 col-md-8">
                            <div className="row no-gutters align-items-center">
                                <div className="text-xs font-weight-bold text-green text-uppercase mb-1">
                                    <p className="fullname">{props.fullname}</p>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <div className="text-xs mb-1">
                                    <p className="username">@{props.username}</p>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <i className={`fa fa-calendar fa-2x text-gray-300`} id="icon-calendar"></i>
                                <div className="text-xs mb-1 ml-2">
                                    <p className="birthday">Ngày sinh: {props.birthday}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4">
                            <i className={`far fa-user-circle fa-7x text-gray-300`} id="icon-user"></i>
                        </div>             
                    </div>                
                </div>
            </div>
        </div>
    );
}


export default TopCardAccount;
