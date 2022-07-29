import { Route, Redirect, RouteProps } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import Login from "../../components/Account/Login";


export function AccountRoute({ children, ...rest }: RouteProps): JSX.Element {

    useSelector((state: IStateType) => state.account);

    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('username') ? (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                ) : <Login />
            }
        />
    );
}