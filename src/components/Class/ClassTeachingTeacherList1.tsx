import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IClassTeacher } from "../../store/models/class_teacher.interface";
import { IClassTeacherState, IStateType } from "../../store/models/root.interface";
import "./ClassTeachingTeacherList1.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassTeacher) => void;
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
                        <button className="btn-x">Continue</button>
                    </div>
                </div>
            </div>

            <div className="social-panel-container">
                <div className="social-panel">
                    <p>Created with <i className="fa fa-heart"></i> by
                        <a target="_blank" href="https://florin-pop.com">Florin Pop</a></p>
                    <button className="close-btn"><i className="fas fa-times"></i></button>
                    <h4>Get in touch on</h4>
                    <ul>
                        <li>
                            <a href="https://www.patreon.com/florinpop17" target="_blank">
                                <i className="fab fa-discord"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/florinpop1705" target="_blank">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/florinpop17" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://facebook.com/florinpop17" target="_blank">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/florinpop17" target="_blank">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <button className="floating-btn">
                Get in Touch
            </button>

            <div className="floating-text">
                Part of <a href="https://florin-pop.com/blog/2019/09/100-days-100-projects" target="_blank">#100Days100Projects</a>
            </div>
        </Fragment>
    );
}

export default ClassDoingList1;
