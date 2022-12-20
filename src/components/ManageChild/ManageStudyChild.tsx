import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { OnChangeModelNotFiled } from "../../common/types/Form.types";
import { IClassesStudent } from "../../store/models/classes_student.interface";
import { IContestTeacher } from "../../store/models/contest_teacher.interface";
import { IClassesStudentState, IContestSubmissionState, IContestSubmissionTeacherState, IContestTeacherState, IFinalScoreChildState, IStateType, IUserGradeContestSubmissionState, IUserState } from "../../store/models/root.interface";

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
    const contest_submisson: IContestSubmissionTeacherState = useSelector((state: IStateType) => state.contest_submission_teacher);
    const final_score_childs: IFinalScoreChildState = useSelector((state: IStateType) => state.final_score_childs);

    console.log(contest_submisson.contest_submission_grade)
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
            list_score_final.push(ele.final_score)
            list_name_final.push(ele.course_name)
            return ele
        }
        return null
    })

    let list_score_user_grade_contest: number[] = [];
    let list_name_user_grade_contest: string[] = [];
    console.log(contest_submisson.contest_submission_grade)
    contest_submisson.contest_submission_grade.map((ele, idx) => {
        if (ele !== undefined && ele !== null ){
            if (ele.score != undefined && ele.score != null && ele.contest_name != null && ele.contest_name != undefined) {
                list_score_user_grade_contest.push(ele.score)
                list_name_user_grade_contest.push(ele.contest_name)
                return ele
            }
            
        }
        return null
    })

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
