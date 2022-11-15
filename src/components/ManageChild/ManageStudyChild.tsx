import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { IClassesStudent } from "../../store/models/classes_student.interface";
import { IContestStudent } from "../../store/models/contest_student.interface";
import { IContestTeacher } from "../../store/models/contest_teacher.interface";
import { IClassesStudentState, IContestTeacherState, IStateType, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesStudent) => void;
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}

function ManageStudyChild(props: classTeacherListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const [checked, setChecked] = useState<Boolean>(true);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);

    var id_x = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
    }

    const [value, setValue] = useState<number>(0);
    const [value1, setValue1] = useState<number>(0);
    console.log(checked)
    console.log(value)
    const listOptions: Options[] = [
        {
            name: 'Khóa học',
            value: 1
        },
        {
            name: 'Cuộc thi',
            value: 2
        },
    ];

    const listClasses: Options[] = [];
    classes_students.classes_doing.map((ele, idx) => {
        if (ele !== undefined && ele !== null ){
            let item: Options = {
                name: ele.name,
                value: ele.id
            };
            return listClasses.push(item);
        }
        return null
    })

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setValue(model.value);
    }

    function hasFormValueChangedNotFiled1(model: OnChangeModelNotFiled): void {
        setValue1(model.value);
        console.log(model.value)
        console.log(student_id);
        getUserGradeExerciseByStudentAndClass(dispatch, model.value, student_id)
    }

    let list_score_user_grade_exercise: number[] = [];
    let list_name_user_grade_exercise: string[] = [];
    user_grade_exercise_submission.user_grade_exercise_submissions.map((ele, idx) => {
        if (ele !== undefined && ele !== null ){
            list_score_user_grade_exercise.push(ele.score)
            list_name_user_grade_exercise.push(ele.exercise_name)
            return ele
        }
        return null
    })

    console.log(user_grade_exercise_submission.user_grade_exercise_submissions)

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesStudent[]>([])
    useEffect(() => {
        let x = (classes_students.classes_done.length - classes_students.classes_done.length % 10) / 10;
        if (x === 1) {
            setElement(classes_students.classes_done)
        }
        else {
            setElement(classes_students.classes_done.slice(0, 10))
        }

        setTotalPage((x + 1))
    }, [classes_students.classes_done])

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(classes_students.classes_done.slice(count * 10))
        }
        else {
            setElement(classes_students.classes_done.slice(count * 10, count * 10 + 10))
        }
    }

    const [totalPage1, setTotalPage1] = useState(0)
    const [element1, setElement1] = useState<IContestTeacher[]>([])
    useEffect(() => {
        let x = (contest_teachers.contest_end.length - contest_teachers.contest_end.length % 10) / 10;
        if (x === 1) {
            setElement1(contest_teachers.contest_end)
        }
        else {
            setElement1(contest_teachers.contest_end.slice(0, 10))
        }

        setTotalPage((x + 1))
    }, [contest_teachers.contest_end])

    function handlePagination1(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement1(contest_teachers.contest_end.slice(count * 10))
        }
        else {
            setElement1(contest_teachers.contest_end.slice(count * 10, count * 10 + 10))
        }
    }
    const history = useHistory();
    const routeChange = (classes_student: IClassesStudent) => {
        let path = '/student/class';
        localStorage.removeItem('teacher_id');
        localStorage.setItem('teacher_id', classes_student.teacher_id.toString())
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', classes_student.student_id.toString())
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', classes_student.id.toString());
        history.push({
            pathname: path,
        });
    }

    const routeChange1 = (contest: IContestTeacher) => {
        let path = '/contest/result-grade';
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', contest.id.toString())
        localStorage.removeItem('contest_name')
        localStorage.setItem('contest_name', contest.name)
        history.push({
            pathname: path
        });
    }


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

    function onChangeRoute2() {
        let path = '/class/exercise-student';
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', value1.toString());
        history.push({
            pathname: path,
        });
    }



    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Thông tin của bé</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="infor-student">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-xs-6 text-center">
                                       <div className="row">
                                            <h6 className="ml-4">Loại hình: </h6>
                                       </div>
                                        <SelectKeyValueNotField
                                            value={value}
                                            id="input_total_page"
                                            inputClass="select_type_study"
                                            onChange={hasFormValueChangedNotFiled}
                                            required={true}
                                            label=" "
                                            options={listOptions}
                                        />
                                    </div>
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
                                        console.log(checked)
                                        console.log(typeof (value))
                                        if (checked === true && value.toString() === "1") {
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
                                                                        onClick={() => { onChangeRoute2() }}
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

                                        else if (checked === true && value.toString() === "2") {
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

                                        else if (checked === false && value.toString() === "1") {
                                            return element.map((contest, index) => {
                                                if (index === element.length - 1) {
                                                    return (
                                                        <>
                                                            <div className="courses-container courses-container-xx" key={`lesson_${contest.id}`}>
                                                                <div className="course">
                                                                    <div className="course-preview">
                                                                        <h6>Khóa học</h6>
                                                                        <h5>{contest.course_name}</h5>
                                                                        <a href="/#">Xem toàn bộ buổi <i className="fas fa-chevron-right"></i></a>
                                                                    </div>
                                                                    <div className="course-info">
                                                                        <h3>{contest.student_name}</h3>
                                                                        <h6>Giáo viên: {contest.teacher_name}</h6>
                                                                        <button className="btn-x" onClick={() => { routeChange(contest) }}>Chi tiết</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end text-right mt-2">
                                                                <nav>
                                                                    <ul className="pagination">
                                                                        <li className="page-item">
                                                                            <a className="page-link" aria-label="Previous" href="/" onClick={(e) => e.preventDefault()}>
                                                                                <span aria-hidden="true">&laquo;</span>
                                                                            </a>
                                                                        </li>
                                                                        {
                                                                            Array.from(Array((totalPage)).keys()).map((ele, idx) => {
                                                                                return (
                                                                                    <li className="page-item"><a className="page-link" href="/" onClick={() => { handlePagination(ele) }}>{ele + 1}</a></li>
                                                                                )
                                                                            })
                                                                        }
                                                                        <li className="page-item">
                                                                            <a className="page-link" aria-label="Next" href="/" onClick={(e) => e.preventDefault()}>
                                                                                <span aria-hidden="true">&raquo;</span>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </nav>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                return (
                                                    <>
                                                        <div className="courses-container courses-container-xx" key={`lesson_${contest.id}`}>
                                                            <div className="course">
                                                                <div className="course-preview">
                                                                    <h6>Khóa học</h6>
                                                                    <h5>{contest.course_name}</h5>
                                                                    <a href="/#">Xem toàn bộ buổi <i className="fas fa-chevron-right"></i></a>
                                                                </div>
                                                                <div className="course-info">
                                                                    <h3>{contest.student_name}</h3>
                                                                    <h6>Giáo viên: {contest.teacher_name}</h6>
                                                                    <button className="btn-x" onClick={() => { routeChange(contest) }}>Chi tiết</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }


                                        if (checked === false && value.toString() === "2") {
                                            return element1.map((contest, index) => {
                                                if (index === element1.length - 1) {
                                                    return (
                                                        <>
                                                            <div className="courses-container courses-container-xx" key={`lesson_${contest.id}`}>
                                                                <div className="course">
                                                                    <div className="course-preview">
                                                                        <h6>Cuộc thi</h6>
                                                                        <h5>{contest.name}</h5>
                                                                        <a href="/#">Xem miêu tả <i className="fas fa-chevron-right"></i></a>
                                                                    </div>
                                                                    <div className="course-info">
                                                                        <h6 className="pd-2">Thể loại: {contest.art_type_name}</h6>
                                                                        <h6 className="pd-2">Độ tuổi: {contest.art_age_name}</h6>
                                                                        <h6 className="pd-2">Thời gian: {contest.start_time.replaceAll("T", " ")} đến {contest.end_time.replaceAll("T", " ")}</h6>
                                                                        <h6 className="pd-2">Số học sinh tham gia: {contest.total_register_contest}</h6>
                                                                        <h6 className="pd-2">Số bài nộp: {contest.total_contest_submission}</h6>
                                                                        <h6>Số bài đã chấm: {contest.total_contest_submission_graded}</h6>
                                                                        <button className="btn-x" onClick={() => { routeChange1(contest) }}>Kết quả</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-end text-right mt-2">
                                                                <nav>
                                                                    <ul className="pagination">
                                                                        <li className="page-item">
                                                                            <a className="page-link" aria-label="Previous" href="/" onClick={(e) => e.preventDefault()}>
                                                                                <span aria-hidden="true">&laquo;</span>
                                                                            </a>
                                                                        </li>
                                                                        {
                                                                            Array.from(Array((totalPage1)).keys()).map((ele, idx) => {
                                                                                return (
                                                                                    <li className="page-item"><a className="page-link" href="/" onClick={() => { handlePagination1(ele) }}>{ele + 1}</a></li>
                                                                                )
                                                                            })
                                                                        }
                                                                        <li className="page-item">
                                                                            <a className="page-link" aria-label="Next" href="/" onClick={(e) => e.preventDefault()}>
                                                                                <span aria-hidden="true">&raquo;</span>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </nav>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                return (
                                                    <>
                                                        <div className="courses-container courses-container-xx" key={`lesson_${contest.id}`}>
                                                            <div className="course">
                                                                <div className="course-preview">
                                                                    <h6>Cuộc thi</h6>
                                                                    <h5>{contest.name}</h5>
                                                                    <a href="/#">Xem miêu tả <i className="fas fa-chevron-right"></i></a>
                                                                </div>
                                                                <div className="course-info">
                                                                    <h6 className="pd-2">Thể loại: {contest.art_type_name}</h6>
                                                                    <h6 className="pd-2">Độ tuổi: {contest.art_age_name}</h6>
                                                                    <h6 className="pd-2">Thời gian: {contest.start_time.replaceAll("T", " ")} đến {contest.end_time.replaceAll("T", " ")}</h6>
                                                                    <h6 className="pd-2">Số học sinh tham gia: {contest.total_register_contest}</h6>
                                                                    <h6 className="pd-2">Số bài nộp: {contest.total_contest_submission}</h6>
                                                                    <h6 className="pd-2">Số bài đã chấm: {contest.total_contest_submission_graded}</h6>
                                                                    <button className="btn-x" onClick={() => { routeChange1(contest) }}>Kết quả</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })

                                        }
                                    }()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ManageStudyChild;
