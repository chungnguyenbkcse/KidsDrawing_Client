import { Route, RouteProps } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { Redirect } from "react-router-dom";


export function PrivateRoute({ children, ...rest }: RouteProps): JSX.Element {

    useSelector((state: IStateType) => state.account);

    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('username') ? (
                    children
                ) : <Redirect
                to={{
                    pathname: "/auth"
                }}
            />
            }
        />
    );
}