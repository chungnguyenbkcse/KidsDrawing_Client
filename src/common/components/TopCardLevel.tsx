import React, { PropsWithChildren, ReactElement } from "react";
import { ICardProperties } from "../types/TopCardLevel.types";

function TopCardLevel(props: PropsWithChildren<ICardProperties>): ReactElement {
    return (
        <div className="col-xl-12 col-md-12 mb-4">
            <div className={`card shadow h-100 py-2`} id="topcard-user">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-green text-uppercase mb-1">{props.title}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas fa-${props.icon} fa-2x text-gray-300`} id="icon-user"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardLevel;
