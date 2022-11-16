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
import { IClassesStudentState, IContestTeacherState, IFinalScoreChildState, IStateType, IUserGradeContestSubmissionState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";

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
    
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const user_grade_contest_submisson: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const final_score_childs: IFinalScoreChildState = useSelector((state: IStateType) => state.final_score_childs);

    var id_x = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
    }

    const [value, setValue] = useState<number>(1);
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

    let list_score_final: number[] = [];
    let list_name_final: string[] = [];
    final_score_childs.final_score_childs.map((ele, idx) => {
        if (ele !== undefined && ele !== null ){
            list_score_final.push(ele.final_score * 10)
            list_name_final.push(ele.course_name)
            return ele
        }
        return null
    })

    let list_score_user_grade_contest: number[] = [];
    let list_name_user_grade_contest: string[] = [];
    console.log(user_grade_contest_submisson.userGradeContestSubmissions)
    user_grade_contest_submisson.userGradeContestSubmissions.map((ele, idx) => {
        if (ele !== undefined && ele !== null ){
            list_score_user_grade_contest.push(ele.score)
            list_name_user_grade_contest.push(ele.contest_name)
            return ele
        }
        return null
    })

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesStudent[]>([])
    useEffect(() => {
        let x = (classes_students.classes_done.length - classes_students.classes_done.length % 10) / 10;
        if (x === 0) {
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
        if (x === 0) {
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


    const labels = list_name_final;
    const datax = {
        labels: labels,
        datasets: [
            {
                label: 'Điểm tổng kết các khóa',
                data: list_score_final,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const labels_c = list_name_user_grade_contest;
    const datax_c = {
        labels: labels_c,
        datasets: [
            {
                label: 'Điểm thi',
                data: list_score_user_grade_contest,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    console.log(datax_c)

    console.log(list_score_user_grade_contest)

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
                    <h3 className=" mb-2" id="level-teacher">Thống kê học tập của bé</h3>
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
                                
                                {
                                    function () {
                                        console.log(checked)
                                        console.log(typeof (value))
                                        if (value.toString() === "1") {
                                            return (
                                                <>
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12">
                                                            <div className="card mb-4">
                                                                <div className="card-body chart-line">
                                                                    <ChartLine data={datax} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                        else if (value.toString() === "2") {
                                            return (
                                                <div className="row">
                                                    <div className="col-xl-12 col-lg-12">
                                                        <div className="card mb-4">
                                                            <div className="card-body chart-line">
                                                                <ChartLine data={datax_c} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
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
