import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { ISemesterClassStudentState, IStateType } from "../../store/models/root.interface";
import { ISemesterClassStudent } from "../../store/models/semester_class_student.interface";
import "./CourseListNew.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
};

function SemesterClassListNew(props: semesterListProps): JSX.Element {
    const semester_class_student: ISemesterClassStudentState = useSelector((state: IStateType) => state.semester_class_student);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ISemesterClassStudent[]>([])
    const [filter, setFilter] = useState("0")

    console.log(semester_class_student.payed)

    useEffect(() => {
        let x = (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length - (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length) % 6) / 6;
        if (x === 0) {
            setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed))
        }
        else {
            setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(0, 6))
        }

        setTotalPage((x + 1))
    }, [semester_class_student.not_payed, semester_class_student.not_payed_now, semester_class_student.payed])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (filter === "0") {
            if (count === totalPage) {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(count * 6))
            }
            else {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(count * 6, count * 6 + 6))
            }
        }
        else if (filter === "1") {
            if (count === totalPage) {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(count * 6))
            }
            else {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(count * 6, count * 6 + 6))
            }
        }
        else if (filter === "2") {
            if (count === totalPage) {
                setElement(semester_class_student.payed.slice(count * 6))
            }
            else {
                setElement(semester_class_student.payed.slice(count * 6, count * 6 + 6))
            }
        }

    }

    const history = useHistory();
    const routeChange = (course: ISemesterClassStudent) => {
        localStorage.removeItem('description_course');
        localStorage.setItem('description_course', course.description);
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.course_id.toString())
        localStorage.removeItem('course_name');
        localStorage.setItem('course_name', course.course_name)
        localStorage.removeItem('art_age_name');
        localStorage.setItem('art_age_name', course.art_age_name.toString())
        localStorage.removeItem('art_type_name');
        localStorage.setItem('art_type_name', course.art_type_name.toString())
        localStorage.removeItem('num_of_section');
        localStorage.setItem('num_of_section', course.num_of_section.toString())
        localStorage.removeItem('schedule');
        localStorage.setItem('schedule', course.schedule.toString())
        localStorage.removeItem('art_level_name');
        localStorage.setItem('art_level_name', course.art_level_name.toString())
        localStorage.removeItem('semester_class_name');
        localStorage.setItem('semester_class_name', course.name.toString())
        localStorage.removeItem('price');
        localStorage.setItem('price', course.price.toString())
        localStorage.removeItem('semester_class_id');
        localStorage.setItem('semester_class_id', course.id.toString())
        localStorage.removeItem('url_image');
        localStorage.setItem('url_image', course.image_url.toString())
        localStorage.removeItem('status');
        localStorage.setItem('status', course.status.toString())
        let path = '/semester-class/detail';
        history.push({
            pathname: path
        });
    }

    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleFilter() {
        if (filter === "0") {
            let x = (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length - (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length) % 6) / 6;
            if (x === 0) {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed))
            }
            else {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(0, 6))
            }

            setTotalPage((x + 1))
        }
        else if (filter === "1") {
            let x = (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length - (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length) % 6) / 6;
            if (x === 0) {
                setElement(semester_class_student.payed)
            }
            else {
                setElement(semester_class_student.payed.slice(0, 6))
            }

            setTotalPage((x + 1))
        }
        else if (filter === "2") {
            let x = (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length - (semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).length) % 6) / 6;
            if (x === 0) {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed))
            }
            else {
                setElement(semester_class_student.not_payed.concat(semester_class_student.not_payed_now).concat(semester_class_student.payed).slice(0, 6))
            }

            setTotalPage((x + 1))
        }
    }

    console.log(filter)


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters mt-2">
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
                                        <option value="0">Chưa đăng kí</option>
                                        <option value="1">Đã đăng kí</option>
                                        <option value="2">Chưa thanh toán</option>
                                    </select>
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => { handleFilter() }}>Lọc&nbsp;<i className="fa fa-flask"></i></button></div>
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
                            if (ele === undefined) {
                                return null
                            }
                            return (
                                <div className="col-md-4" onClick={() => { routeChange(ele) }}>
                                    <div className="p-card bg-white p-2 rounded px-3 product-x">
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} className="image-cardx" width="100%" alt="" /></div>
                                        <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name} &amp; {ele.art_level_name}</span>
                                        <span className="d-block schedule-x">Lịch học: {ele.schedule}</span>
                                        <span className="d-block">Số đăng kí tối đa: {ele.max_participant}</span>
                                        <span className="d-block">Ngày bắt đầu đăng kí: {ele.registration_deadline.replaceAll("T", " ").substring(0,16)}</span>
                                        <span className="d-block">Ngày hết hạn đăng kí: {ele.registration_expiration_time.replaceAll("T", " ").substring(0,16)}</span>
                                        <span className="d-block mb-5">Trạng thái: 
                                            {
                                                function() {
                                                    if (ele.status == "Registed") {
                                                        return "Đã đăng kí";
                                                    }
                                                    else {
                                                        return "Chưa đăng kí";
                                                    }
                                                }()
                                            }
                                        </span>
                                        <div
                                            className="d-flex justify-content-between stats">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Giá: {ele.price} VND</span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">
                                                {ele.total_register} 
                                                </span></div>
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

export default SemesterClassListNew;
