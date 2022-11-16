import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesStudent } from "../../store/models/classes_student.interface";
import { IClassesStudentState, IStateType } from "../../store/models/root.interface";
import "./ClassStudentList.css"

export type classTeacherListProps = {
  onSelect?: (classTeacher: IClassesStudent) => void;
  value?: string;
  children?: React.ReactNode;
};

function ClassDoneList1(props: classTeacherListProps): JSX.Element {
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesStudent[]>([])
    useEffect(() => {
        let x = (classes_students.classes_done.length - classes_students.classes_done.length % 10) /10;
        if (x === 1) {
            setElement(classes_students.classes_done)
        }
        else {
            setElement(classes_students.classes_done.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [classes_students.classes_done])

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(classes_students.classes_done.slice(count*10))
        }
        else {
            setElement(classes_students.classes_done.slice(count*10,count*10 + 10))
        }
    }

    const history = useHistory();
    const routeChange = (classes_student: IClassesStudent) => {
      let path = '/classes/review'; 
      localStorage.removeItem('teacher_id');
      localStorage.setItem('teacher_id', classes_student.teacher_id.toString())
      localStorage.removeItem('student_id');
      localStorage.setItem('student_id', classes_student.student_id.toString())
      localStorage.removeItem('class_id');
      localStorage.setItem('class_id', classes_student.id.toString());
      localStorage.removeItem('course_name');
      localStorage.setItem('course_name', classes_student.course_name)
      localStorage.removeItem('user_register_join_semester_id')
      localStorage.setItem('user_register_join_semester_id', classes_student.user_register_join_semester_id.toString())
      history.push({
          pathname: path,
      });
    }

  return (
    <Fragment>
        {
            classes_students.classes_done.map((contest, index) => {
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
                                            {contest.total_section}/{contest.total_section} Buổi
                                        </span>
                                    </div>
                                    <h2>{contest.student_name}</h2>
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
                    </>
                )
            })
        }
    </Fragment>
);
}

export default ClassDoneList1;
