import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IClassesParentState, IStateType, IUserState } from "../../store/models/root.interface";
import "./ClassParentList.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesParent) => void;
    value?: string;
    children?: React.ReactNode;
};

function ClassDoneList1(props: classTeacherListProps): JSX.Element {
    const classes_parents: IClassesParentState = useSelector((state: IStateType) => state.classes_parents);
    const users: IUserState = useSelector((state: IStateType) => state.users);

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesParent[]>([])
    useEffect(() => {
        let x = (classes_parents.classes_done.length - classes_parents.classes_done.length % 10) / 10;
        if (x === 0) {
            setElement(classes_parents.classes_done)
        }
        else {
            setElement(classes_parents.classes_done.slice(0, 10))
        }

        setTotalPage((x + 1))
    }, [classes_parents.classes_done])

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(classes_parents.classes_done.slice(count * 10))
        }
        else {
            setElement(classes_parents.classes_done.slice(count * 10, count * 10 + 10))
        }
    }

    const history = useHistory();
    const routeChange = (classes_parent: IClassesParent) => {
        let path = '/student/class';
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

    const [filter, setFilter] = useState(1)

    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleFilter() {
        console.log(filter)

        let k = classes_parents.classes_done.filter((ele, idx) =>
            ele.student_id == filter
        )

        let x = (k.length - (k.length) % 10) / 10;
        if (x === 0) {
            setElement(k)
        }
        else {
            setElement(k.slice(0, 10))
        }
        setTotalPage((x + 1))
    }


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters">
                            <h6 className="ml-3">Có {element.filter((val) => {
                                if (props.value === "") {
                                    return val;
                                }
                                else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                    return val;
                                }
                                return null
                            }).length} kết quả</h6>
                            <div className="right-sort">
                                <div className="sort-by mr-3">
                                    <span className="mr-1">Lọc theo:</span>
                                    <select name="cars" id="cars"
                                        value={filter}
                                        onChange={handleChange}
                                    >
                                        {
                                            users.students.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.username}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => handleFilter()}>Lọc&nbsp;<i className="fa fa-flask"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    {
                        element.filter((val) => {
                            if (props.value === "") {
                                return val;
                            }
                            else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                return val;
                            }
                            return null
                        }).map((ele, index) => {
                            return (
                                <div className="courses-container" key={`lesson_${ele.id}`}>
                                    <div className="course">
                                        <div className="course-preview">
                                            <h6>Khóa học</h6>
                                            <h2>{ele.course_name}</h2>
                                            <a href="/#">Xem toàn bộ buổi <i className="fas fa-chevron-right"></i></a>
                                        </div>
                                        <div className="course-info">
                                            <div className="progress-container">
                                                <div className="progress"></div>
                                                <span className="progress-text">
                                                    {ele.total_section}/{ele.total_section} Buổi
                                                </span>
                                            </div>
                                            <h2>{ele.student_name}</h2>
                                            <h6>Giáo viên: {ele.teacher_name}</h6>
                                            <button className="btn-x" onClick={() => { routeChange(ele) }}>Chi tiết</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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
                                        <li className="page-item"><a className="page-link" href="/" onClick={(e) => { 
                                        e.preventDefault()
                                        handlePagination(ele) }}>{ele + 1}</a></li>
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
            </div>


        </Fragment>
    );
}

export default ClassDoneList1;
