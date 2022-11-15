import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IClassesParentState, IStateType } from "../../store/models/root.interface";
import "./ClassParentList.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesParent) => void;
    children?: React.ReactNode;
};


function ClassDoingList1(props: classTeacherListProps): JSX.Element {
    const classes_parents: IClassesParentState = useSelector((state: IStateType) => state.classes_parents);

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesParent[]>([])
    useEffect(() => {
        let x = (classes_parents.classes_doing.length - classes_parents.classes_doing.length % 10) /10;
        if (x === 1) {
            setElement(classes_parents.classes_doing)
        }
        else {
            setElement(classes_parents.classes_doing.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [classes_parents.classes_doing])

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(classes_parents.classes_doing.slice(count*10))
        }
        else {
            setElement(classes_parents.classes_doing.slice(count*10,count*10 + 10))
        }
    }
    

    const history = useHistory();
    const routeChange = (classes_parent: IClassesParent) => {
        let path = '/student/classes-doing';
        localStorage.removeItem('teacher_id');
        localStorage.setItem('teacher_id', classes_parent.teacher_id.toString())
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', classes_parent.student_id.toString())
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', classes_parent.id.toString());
        history.push({
            pathname: path,
        });
    }

    return (
        <Fragment>
            {
                classes_parents.classes_doing.map((contest, index) => {
                    if (contest !== undefined && contest !== null){
                        return (
                            <>
                                <div className="courses-container" key={`lesson_${contest.id}`} onClick={() => { routeChange(contest) }}>
                                    <div className="course">
                                        <div className="course-preview">
                                            <h6>Khóa học</h6>
                                            <h2>{contest.course_name}</h2>
                                            <a href="/#">Xem toàn bộ buổi <i className="fas fa-chevron-right"></i></a>
                                        </div>
                                        <div className="course-info">
                                            <div className="progress-container">
                                                <div className="progress"></div>
                                                <span className="progress-text">
                                                    {contest.total_section_studied}/{contest.total_section} Buổi
                                                </span>
                                            </div>
                                            <h2>{contest.student_name}</h2>
                                            <h6 className="mt-4">Giáo viên: {contest.teacher_name}</h6>
                                            <h6 className="mt-4">Lịch học buổi kế: {contest.schedule_section_next.replaceAll("T", " ")}</h6>
                                            <button className="btn-x" onClick={() => { routeChange(contest) }}>Chi tiết</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    return null
                    
                })
            }

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
                                        <li className="page-item"><a className="page-link" href="/" onClick={() => {handlePagination(ele)}}>{ele+1}</a></li>
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
        </Fragment>
    );
}

export default ClassDoingList1;
