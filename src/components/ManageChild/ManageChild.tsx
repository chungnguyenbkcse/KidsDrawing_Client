import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IClassesStudentState, IContestTeacherState, IMyClassState, IScheduleTimeClassState, IStateType, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageChild.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { IoMdAnalytics } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { ChartLine } from "../../common/components/CharLine";
import { getAllClassByStudent } from "../../common/service/MyClass/GetAllClassByStudent";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { getUserById } from "../../common/service/User/GetUserById";
import { getContestByStudent } from "../../common/service/Contest/GetContestByStudent";
import { getClassesStudent } from "../../common/service/ClassesStudent/GetClassesStudentByStudent";
import { getScheduleTimeByChild } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByStudent";
import TopCard from "../../common/components/TopCard";
import { Eventcalendar, setOptions, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext } from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});


type Options = {
    name: string;
    value: any;
}

const ManageChild: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const [checked, setChecked] = useState(true);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    const myclasses: IMyClassState = useSelector((state: IStateType) => state.myclasses);
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const numberApprovedCount: number = classes_students.classes_students.length;
    const numberNotApprovedNowCount: number = contest_teachers.contest_end.length + contest_teachers.contest_not_open_now.length + contest_teachers.contest_opening.length;
    var id_x = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
    }

    const [view, setView] = React.useState('month');


    const [calView, setCalView] = React.useState(
        {
            calendar: { labels: true }
        }
    );

    const changeView = (event: any) => {
        let calView: any;
        
        switch (event.target.value) {
            case 'year':
                calView = {
                    calendar: { type: 'year' }
                }
                break;
            case 'month':
                calView = {
                    calendar: { labels: true }
                }
                break;
            case 'week':
                calView = {
                    schedule: { type: 'week' }
                }
                break;
            case 'day':
                calView = {
                    schedule: { type: 'day' }
                }
                break;
            case 'agenda':
                calView = {
                    calendar: { type: 'week' },
                    agenda: { type: 'week' }
                }
                break;
        }

        setView(event.target.value);
        setCalView(calView);
    }
    
    const customWithNavButtons = () => {
        return <React.Fragment>
            <CalendarNav className="cal-header-nav" />
            <div className="cal-header-picker">
                <SegmentedGroup value={view} onChange={changeView}>
                    <SegmentedItem value="year">
                        Year
                    </SegmentedItem>
                    <SegmentedItem value="month">
                        Month
                    </SegmentedItem>
                    <SegmentedItem value="week">
                        Week
                    </SegmentedItem>
                    <SegmentedItem value="day">
                        Day
                    </SegmentedItem>
                    <SegmentedItem value="agenda">
                        Agenda
                    </SegmentedItem>
                </SegmentedGroup>
            </div>
            <CalendarPrev className="cal-header-prev" />
            <CalendarToday className="cal-header-today" />
            <CalendarNext className="cal-header-next" />
        </React.Fragment>;
    }

    console.log(classes_students)
    console.log(contest_teachers)

    const { promiseInProgress } = usePromiseTracker();

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
                    trackPromise(getUserById(dispatch, student_id))
                    trackPromise(getScheduleTimeByChild(dispatch, student_id))
                    trackPromise(getAllClassByStudent(dispatch, student_id))
                    trackPromise(getContestByStudent(dispatch, student_id))
                    trackPromise(getClassesStudent(dispatch, student_id))
                }
            }
            else {
                trackPromise(getUserById(dispatch, student_id))
                trackPromise(getScheduleTimeByChild(dispatch, student_id))
                trackPromise(getAllClassByStudent(dispatch, student_id))
                trackPromise(getContestByStudent(dispatch, student_id))
                trackPromise(getClassesStudent(dispatch, student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id]);

    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);
    const listOptions: Options[] = [
        {
            name: 'Lớp',
            value: 1
        },
        {
            name: 'Cuộc thi',
            value: 2
        },
    ];

    const listClasses: Options[] = [];
    myclasses.myClasses.map((ele, idx) => {
        let item: Options = {
            name: ele.name,
            value: ele.id
        };
        return listClasses.push(item);
    })

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setValue(model.value);
    }

    function hasFormValueChangedNotFiled1(model: OnChangeModelNotFiled): void {
        setValue1(model.value);
        getUserGradeExerciseByStudentAndClass(dispatch, value1, student_id)
    }

    let list_score_user_grade_exercise: number[] = [];
    let list_name_user_grade_exercise: string[] = [];
    user_grade_exercise_submission.user_grade_exercise_submissions.map((ele, idx) => {
        list_score_user_grade_exercise.push(ele.score)
        list_name_user_grade_exercise.push(ele.exercise_name)
        return ele
    })

    const labels = list_name_user_grade_exercise;
    const datax = {
        labels,
        datasets: [
            {
                label: 'Điểm kiểm tra',
                data: list_score_user_grade_exercise,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    let data: any[] = [];
    if (schedule_time_classes.schedule_time_classes.length > 0) {
        schedule_time_classes.schedule_time_classes.map((ele, idx) => {

            return data.push({
                // base properties
                title: ele.class_name,
                color: '#56ca70',
                start: ele.start_time,
                end: ele.end_time,
                // add any property you'd like
                busy: true,
                description: 'Weekly meeting with team',
                location: 'Office'
            })

        })
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
                <div className="row">
                    <TopCard title="KHÓA HỌC" text={`${numberApprovedCount}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                </div>
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Thông tin của bé</h3>
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="infor-student">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-4 col-xs-4">
                                            <i className={`far fa-user-circle fa-7x text-gray-300`} id="icon-user"></i>
                                        </div>
                                        <div className="col-xl-8 col-md-8 col-xs-8">
                                            <div className="row">
                                                <h2>{users.teachers.length > 0 ? users.teachers[0].firstName + " " + users.teachers[0].lastName : ""}</h2>
                                            </div>
                                            <div className="row">
                                                <p>@{users.teachers.length > 0 ? users.teachers[0].username : ""}</p>
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <i className={`fa fa-calendar fa-2x text-gray-300`} id="icon-calendar"></i>
                                                <div className="text-xs mb-1 ml-2">
                                                    <p className="birthday">Ngày sinh: {users.teachers.length > 0 ? users.teachers[0].dateOfBirth : ""}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row dropdown-content mr-2">
                                        <SelectKeyValueNotField
                                            value={value}
                                            id="input_total_page"
                                            onChange={hasFormValueChangedNotFiled}
                                            required={true}
                                            label=""
                                            options={listOptions}
                                        />
                                    </div>
                                    <div className="row tabbar-x" >
                                        <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                                            <IoMdAnalytics style={{
                                                color: checked ? "#F24E1E" : "#2F4F4F"
                                            }} />
                                            <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                                                if (checked === false) {
                                                    setChecked(true)
                                                }
                                            }} style={{
                                                color: checked ? "#F24E1E" : "#2F4F4F"
                                            }}>Thống kê</h6>
                                            <div style={{
                                                height: "5px",
                                                textAlign: "center",
                                                margin: "auto",
                                                width: "30%",
                                                backgroundColor: checked ? "#F24E1E" : "#ffffff"
                                            }}></div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                                            <FaHistory style={{
                                                color: !checked ? "#F24E1E" : "#2F4F4F"
                                            }} />
                                            <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                                                if (checked === true) {
                                                    setChecked(false)
                                                }
                                            }}
                                                style={{
                                                    color: checked ? "#2F4F4F" : "#F24E1E"
                                                }}>Lịch sử</h6>
                                            <div style={{
                                                height: "5px",
                                                textAlign: "center",
                                                margin: "auto",
                                                width: "30%",
                                                backgroundColor: checked ? "#ffffff" : "#F24E1E"
                                            }}></div>
                                        </div>
                                    </div>
                                    {
                                        function () {
                                            if (checked === true && value === 1) {
                                                return (
                                                    <>
                                                        <div className="row">
                                                            <SelectKeyValueNotField
                                                                value={value1}
                                                                id="input_classes"
                                                                onChange={hasFormValueChangedNotFiled1}
                                                                required={true}
                                                                label=""
                                                                options={listClasses}
                                                            />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xl-12 col-lg-12">
                                                                <div className="card mb-4">
                                                                    <div className="card-body chart-line">
                                                                        <ChartLine data={datax} />
                                                                    </div>
                                                                    <div className="row justify-content-center chart-line">
                                                                        <button
                                                                            className="btn btn-success btn-green"
                                                                            id="btn-into-class-student"
                                                                            onClick={() => { }}
                                                                        >
                                                                            Xem chi tiết
                                                                            <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                            else if (checked === true && value === 2) {
                                                return (
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12">
                                                            <div className="card mb-4">
                                                                <div className="card-body chart-line">
                                                                    <ChartLine data={datax} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            else if (checked === false && value === 1) {
                                                return classes_students.classes_students.map((ele, idx) => {
                                                    console.log(ele)
                                                    return (
                                                        <div className="row" key={idx}>
                                                            <div className="col-xl-12 col-lg-12">
                                                                <div className="card mb-4 card-course">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ele.name}</h5>
                                                                        <div className="row">
                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <img className="card-img-top" src={ele.link_url} alt="" />
                                                                            </div>

                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <div className="row">
                                                                                    <p><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{ele.art_type_name}</span></p>

                                                                                </div>
                                                                                <div className="row">
                                                                                    <p ><span className="header-card-course-teacher">Trình độ:</span> <span className="header-card-course-value-teacher">{ele.art_level_name}</span></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <div className="row">
                                                                                    <p><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{ele.art_age_name}</span></p>

                                                                                </div>
                                                                                <div className="row">
                                                                                    <p ><span className="header-card-course-teacher">Số buổi:</span> <span className="header-card-course-value-teacher">{ele.total_section}</span></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                            if (checked === false && value === 2) {
                                                return contest_teachers.contest_end.map((ele, idx) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-xl-12 col-lg-12" key={idx}>
                                                                <div className="card mb-4 card-contest-doing">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{ele.name}</h5>
                                                                        <div className="row">
                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <img className="card-img-top" src={ele.image_url} alt="" />
                                                                            </div>

                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <div className="row">
                                                                                    <p><span className="header-card-course-teacher">Thể loại:</span> <span className="header-card-course-value-teacher">{ele.art_type_name}</span></p>

                                                                                </div>
                                                                                <div className="row">
                                                                                    <p ><span className="header-card-course-teacher">Độ tuổi:</span> <span className="header-card-course-value-teacher">{ele.art_age_name}</span></p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-xl-4 col-md-4 col-xs-4">
                                                                                <div className="row">
                                                                                    <p><span className="header-card-course-teacher">Thời gian bắt đầu: {ele.registration_time}</span> <span className="header-card-course-value-teacher"></span></p>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                            }
                                        }()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-xs-6">
                        <h3 className=" mb-2" id="level-teacher">Lịch học của bé</h3>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <Eventcalendar
                                    renderHeader={customWithNavButtons}
                                    height={750}
                                    view={calView}
                                    data={data}
                                    cssClass="md-switching-view-cont"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
    );
};

export default ManageChild;
