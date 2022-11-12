import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IClassTeacher } from "../../store/models/class_teacher.interface";
import { IClassTeacherState, IStateType } from "../../store/models/root.interface";
import "./ClassParentList.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesParent) => void;
    children?: React.ReactNode;
};


function ClassDoingList1(props: classTeacherListProps): JSX.Element {
    const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);


    const history = useHistory();
    const routeChange = (class_teacher: IClassTeacher) => {
        let path = '/classes/detail';
        localStorage.removeItem("class_id");
        localStorage.setItem("class_id", class_teacher.id.toString())
        localStorage.removeItem('class_end');
        localStorage.setItem('class_end', 'false');
        history.push({
            pathname: path,
            state: { class_id: class_teacher.id }
        });
    }


    return (
        <Fragment>
            <div className="courses-container">
                <div className="course">
                    <div className="course-preview">
                        <h6>Course</h6>
                        <h2>JavaScript Fundamentals</h2>
                        <a href="#">View all chapters <i className="fas fa-chevron-right"></i></a>
                    </div>
                    <div className="course-info">
                        <div className="progress-container">
                            <div className="progress"></div>
                            <span className="progress-text">
                                6/9 Challenges
                            </span>
                        </div>
                        <h6>Chapter 4</h6>
                        <h2>Callbacks & Closures</h2>
                        <button className="btn">Continue</button>
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
                                Array.from(Array((10)).keys()).map((ele, idx) => {
                                    return (
                                        <li className="page-item"><a className="page-link" href="/" onClick={() => {}}>{ele+1}</a></li>
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
