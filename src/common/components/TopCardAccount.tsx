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
        <div className="col-md-8 col-xd-8 col-xs-8 mx-auto" onClick={() => {
            routeChange(props.student_id)}}
        >
            <div className={`card shadow`} id="topcard-account">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col-xl-4 col-md-4">
                            <i className={`far fa-user-circle fa-7x text-gray-300`} id="icon-user"></i>
                        </div> 
                        <div className="col-xl-8 col-md-8">
                        <div className="row no-gutters align-items-center">
                                        <div className="text-xs font-weight-bold text-green text-uppercase ">
                                            <p className="fullname">{props.fullname}</p>
                                        </div>
                                    </div>
                            <div className="row">
                                <div className="col-xl-4 col-md-4">
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs ">
                                            <p className="birthday">Email: {props.email}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Ngày sinh: {props.birthday}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Giới tính: {props.sex}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md 4">
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs ">
                                            <p className="birthday">Khóa học đang học: </p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Cuộc thi tham gia:</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Số buổi nghỉ: </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>            
                    </div>                
                </div>
            </div>
        </div>
    );
}


export default TopCardAccount;
