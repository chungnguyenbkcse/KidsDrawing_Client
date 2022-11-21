import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import ScoreContestList from "./ScoreContestList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import "./ResultGradeContestStudent.css"

const ResultGradeContestStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const max = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.min(a, b.score), 0);

    const top_score = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) =>  b.score - a.score).slice(0,3)
    const tail_score = user_grade_contest_submissions.userGradeContestSubmissions.sort((a, b) => b.score - a.score).slice(3, user_grade_contest_submissions.userGradeContestSubmissions.length)
    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
    }


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getStudentByParent(dispatch, id))
                    trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
                trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
            }
        }
        dispatch(updateCurrentPath("Cuoc thi", "Bảng xếp hạng"));
    }, [dispatch, access_token, refresh_token, contest_id, id]);


    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    return (
        promiseInProgress ?
            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
                        </div>
                    </div>
                </div>
            </div> : <Fragment>

<div className="row justify-content-center blue-seven-one">
    <div className="col-8 mt-3">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3ODUiIGhlaWdodD0iNzA2LjUiIHZpZXdCb3g9IjAgMCA3ODUgNzA2LjUiPgogIDxnIGlkPSJHcnVwb18yIiBkYXRhLW5hbWU9IkdydXBvIDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NDcgLTE0NS41KSI+CiAgICA8cmVjdCBpZD0iUmVjdMOhbmd1bG9fMSIgZGF0YS1uYW1lPSJSZWN0w6FuZ3VsbyAxIiB3aWR0aD0iOTgiIGhlaWdodD0iMTg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OTAuMzQ5IDUyMykiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJSZWN0w6FuZ3Vsb18yIiBkYXRhLW5hbWU9IlJlY3TDoW5ndWxvIDIiIGQ9Ik0xNS42ODYsMEgzODguMzE0QTE1LjY4NiwxNS42ODYsMCwwLDEsNDA0LDE1LjY4NlYyNDRBMjAyLDIwMiwwLDAsMSwyMDIsNDQ2aDBBMjAyLDIwMiwwLDAsMSwwLDI0NFYxNS42ODZBMTUuNjg2LDE1LjY4NiwwLDAsMSwxNS42ODYsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDczNy4zNDkgMTQ1LjUpIiBmaWxsPSIjZmZjMzM1Ii8+CiAgICA8cGF0aCBpZD0iVHJhemFkb18yIiBkYXRhLW5hbWU9IlRyYXphZG8gMiIgZD0iTTc2NSw0MTNoMGMtMTQuNTE5LDAtOTEuNzQ5LTEuNDUtMTU0LjE0OS02My44NTFBMjE3LjMxNCwyMTcuMzE0LDAsMCwxLDU0NywxOTVINzY1Wk03MzcsMjMwSDU5OUExMzgsMTM4LDAsMCwwLDczNywzNjhoMFoiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJUcmF6YWRvXzMiIGRhdGEtbmFtZT0iVHJhemFkbyAzIiBkPSJNMTExNCwxOTVoMjE4YzAsMTIwLjQtOTcuNiwyMTgtMjE4LDIxOGgwWm0yOCwxNzNoMGExMzgsMTM4LDAsMCwwLDEzOC0xMzhIMTE0MloiIGZpbGw9IiNmZmI0MmIiLz4KICAgIDxwYXRoIGlkPSJSZWN0w6FuZ3Vsb18zIiBkYXRhLW5hbWU9IlJlY3TDoW5ndWxvIDMiIGQ9Ik03MiwwSDE5M2E3Miw3MiwwLDAsMSw3Miw3MnYwYTAsMCwwLDAsMSwwLDBIMGEwLDAsMCwwLDEsMCwwdjBBNzIsNzIsMCwwLDEsNzIsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwNi44NDkgNzA4KSIgZmlsbD0iI2ZmYzMzNSIvPgogICAgPHBhdGggaWQ9IlJlY3TDoW5ndWxvXzQiIGRhdGEtbmFtZT0iUmVjdMOhbmd1bG8gNCIgZD0iTTcyLDBINDE3YTcyLDcyLDAsMCwxLDcyLDcydjBhMCwwLDAsMCwxLDAsMEgwYTAsMCwwLDAsMSwwLDB2MEE3Miw3MiwwLDAsMSw3MiwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjk0Ljg0OSA3ODApIiBmaWxsPSIjZmZiNDJiIi8+CiAgICA8cGF0aCBpZD0iVHJhemFkb180IiBkYXRhLW5hbWU9IlRyYXphZG8gNCIgZD0iTTExMDksNDE4cy0yNC41MTUsMTM0LTE0OCwxMzRaIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjYiLz4KICAgIDxnIGlkPSJMaXZlbGxvXzEwMCIgZGF0YS1uYW1lPSJMaXZlbGxvIDEwMCI+CiAgICAgIDxwYXRoIGlkPSJUcmF6YWRvXzUiIGRhdGEtbmFtZT0iVHJhemFkbyA1IiBkPSJNMTAxOC42LDMxNy42MTJhNi44ODYsNi44ODYsMCwwLDAtNi45OTUtNi43NzFjLS4yNDksMC0uNDkzLjAxNC0uNzM1LjAzNmwtNDguMzA2LTEuMTQtMTYuNS00My4wODFhNy4wNDcsNy4wNDcsMCwwLDAtMTMuNDMxLDBsLTE2LjUwNiw0My4wODEtNDguMywxLjE0Yy0uMjQyLS4wMjQtLjQ4OS0uMDM2LS43MzUtLjAzNmE2Ljg4MSw2Ljg4MSwwLDAsMC02Ljk5MSw2Ljc3MSw2LjcwOSw2LjcwOSwwLDAsMCwzLjIsNS42ODdsMzguNDc2LDI3LjItMTMuNzI5LDQyLjY3MmE2LjUxMSw2LjUxMSwwLDAsMC0uNzgzLDMuMSw2Ljg4NSw2Ljg4NSwwLDAsMCw2Ljk5NCw2Ljc3NCw3LjEsNy4xLDAsMCwwLDQuMzM5LTEuNDY4TDkzOS4zNTMsMzc1LjdsNDAuNzU4LDI1Ljg3N2E3LjEsNy4xLDAsMCwwLDQuMzM4LDEuNDY4LDYuODg1LDYuODg1LDAsMCwwLDYuOTkxLTYuNzc0LDYuNTM3LDYuNTM3LDAsMCwwLS43ODMtMy4xTDk3Ni45MywzNTAuNWwzOC40NzQtMjcuMmE2LjcyNiw2LjcyNiwwLDAsMCwzLjItNS42ODciIGZpbGw9IiNmZmYiLz4KICAgIDwvZz4KICAgIDxwYXRoIGlkPSJUcmF6YWRvXzYiIGRhdGEtbmFtZT0iVHJhemFkbyA2IiBkPSJNMTE1Ni44MjMsNjg3LjY1OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGZmZmU5IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMSIvPgogIDwvZz4KPC9zdmc+Cg=="
            className="w-18 mx-auto d-block" alt="Trofeo" />
    </div>

    <div className="col-12">
        <h3 className="white-text font-weight-bold text-center mb-4 mt-2">
            Bảng xếp hạng
        </h3>

        <div className="row justify-content-center mt-3">
            <div className="col-10 col-sm-10 col-md-10 col-lg-3 mb-4">
                <div className="white top-padding rounded-all">
                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo1B.png"
                        className="top-img-1 " alt="" />

                    <div className="avatar mx-auto flex-center">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" alt="avatar mx-auto white"
                            className="rounded-circle img-fluid " />
                    </div>

                    <h4 className="text-center green-seven-one-text mt-2">
                      <p className="text-top">{top_score.length > 0 ? top_score[0].student_name: ""}</p>
                    </h4>

                    <p className="text-muted mt-2 text-center">
                    {top_score.length > 0 ? top_score[0].score : ""}
                    </p>
                </div>
            </div>

            <div className="col-10 col-sm-10 col-md-10 col-lg-3 mb-4">
                <div className="white top-padding rounded-all">
                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo2B.png"
                        className="top-img" alt="" />

                    <div className="avatar mx-auto flex-center">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" alt="avatar mx-auto white"
                            className="rounded-circle img-fluid" />
                    </div>

                    <h4 className="text-center green-seven-one-text mt-2">
                        <p className="text-top"> {top_score.length > 0 ? top_score[1].student_name: ""}</p>
                    </h4>

                    <p className="text-muted mt-2 text-center">
                        {top_score.length > 0 ? top_score[1].score: ""}
                    </p>
                </div>
            </div>

            <div className="col-10 col-sm-10 col-md-10 col-lg-3">
                <div className="white top-padding rounded-all">
                    <img src="https://raw.githubusercontent.com/JackZeled0n/MDB-Help/master/MDB-Help/7%20x%201/images/Grupo3B.png"
                        className="top-img" alt="" />

                    <div className="avatar mx-auto flex-center">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg" alt="avatar mx-auto"
                            className="rounded-circle img-fluid" />
                    </div>

                    <h4 className="text-center green-seven-one-text mt-2">
                        <p className="text-top">{top_score.length > 0 ? top_score[2].student_name: ""}</p>
                    </h4>

                    <p className="text-muted mt-2 text-center">
                    {top_score.length > 0 ? top_score[2].score : ""}
                    </p>
                </div>
            </div>
        </div>
        <div className="col-12"></div>
    </div>

    <div className="col-lg-9 mt-3">
        <div className="table-responsive">
            <table className="table separate table-borderless">
                <thead className="green-seven-one white-text">
                    <tr>
                        <th scope="col" className="border-left table-text-size">#</th>
                        <th scope="col" className="table-text-size">Học sinh</th>
                        <th scope="col" className="border-right table-text-size">Số điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {
                                tail_score.map((ele, idx) => {
                                    return (
                                        <tr className="white green-seven-one-text">
                                            <th scope="row" className="border-left table-text-size align-middle">
                                                {idx + 3 + 1}
                                            </th>
                                            <td>
                                                <div className="avatar-table table-text-size mx-auto top-text-color">
                                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg"
                                                        alt="avatar mx-auto" className="rounded-circle img-fluid mr-3" />

                                                    {ele.student_name}
                                                </div>
                                            </td>
                                            <td className="border-right table-text-size align-middle top-text-color">
                                                {ele.score}
                                            </td>
                                        </tr>
                                    )
                                })
                    }
                </tbody>
            </table>
        </div>
    </div>

</div>

            </Fragment>
    );
};

export default ResultGradeContestStudent;
