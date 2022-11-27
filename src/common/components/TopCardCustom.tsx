import React, { PropsWithChildren, ReactElement } from "react";
import { ICardProperties } from "../types/TopCard.types";

function TopCardCustom(props: PropsWithChildren<ICardProperties>): ReactElement {
    return (
        <div className="col-xl-6 col-md-6 mb-4">
            <div className={`card border-left-${props.class} shadow h-100 py-2`} id="topcard-teacher">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-green text-uppercase mb-1">{props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.text}</div>
                        </div>
                        <div className="col-auto">
                            <i className={`fas fa-${props.icon} fa-2x text-gray-300`} id="icon-teacher"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopCardCustom;
