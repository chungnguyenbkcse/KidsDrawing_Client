import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { ISemesterClassParentState, IStateType } from "../../store/models/root.interface";
import { ISemesterClassParent } from "../../store/models/semester_class_parent.interface";
import "./CourseNewTest.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
};

export interface ISemesterClassParentX {
    id: any;
    name: string;
    course_name: string;
    course_id: number;
    semester_class_id: number;
    start_date: string;
    registration_expiration_time: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    semester_id: number;
    status: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total_register: number;
    student_ids: number[];
    student_names: string[];
    schedule: string;
    registration_deadline: string;
}

function SemesterClassNewList(props: semesterListProps): JSX.Element {
    const semester_class_parent: ISemesterClassParentState = useSelector((state: IStateType) => state.semester_class_parent);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ISemesterClassParent[]>([])
    const [filter, setFilter] = useState("0")

    useEffect(() => {
        let x = (semester_class_parent.not_payed_now.length - (semester_class_parent.not_payed_now.length) % 10) / 10;
        if (x === 0) {
            setElement(semester_class_parent.not_payed_now)
        }
        else {
            setElement(semester_class_parent.not_payed_now.slice(0, 10))
        }

        setTotalPage((x + 1))
    }, [semester_class_parent.not_payed_now])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (filter === "0") {
            if (count === totalPage) {
                setElement(semester_class_parent.not_payed_now.slice(count * 10))
            }
            else {
                setElement(semester_class_parent.not_payed_now.slice(count * 10, count * 10 + 10))
            }
        }
        else if (filter === "1") {
            if (count === totalPage) {
                setElement(semester_class_parent.not_payed_now.slice(count * 10))
            }
            else {
                setElement(semester_class_parent.not_payed_now.slice(count * 10, count * 10 + 10))
            }
        }
        else if (filter === "2") {
            if (count === totalPage) {
                setElement(semester_class_parent.payed.slice(count * 10))
            }
            else {
                setElement(semester_class_parent.payed.slice(count * 10, count * 10 + 10))
            }
        }

    }

    const history = useHistory();
    const routeChange = (course: ISemesterClassParentX) => {
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
        localStorage.setItem('student_names', JSON.stringify(course.student_names))
        localStorage.removeItem('student_ids');
        console.log(course.student_ids)
        localStorage.setItem('student_ids', JSON.stringify(course.student_ids))
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
            let x = (semester_class_parent.not_payed_now.length - (semester_class_parent.not_payed_now.length) % 10) / 10;
            if (x === 0) {
                setElement(semester_class_parent.not_payed_now)
            }
            else {
                setElement(semester_class_parent.not_payed_now.slice(0, 10))
            }

            setTotalPage((x + 1))
        }
        else if (filter === "1") {
            let x = (semester_class_parent.not_payed_now.length - (semester_class_parent.not_payed_now.length) % 10) / 10;
            if (x === 0) {
                setElement(semester_class_parent.payed)
            }
            else {
                setElement(semester_class_parent.payed.slice(0, 10))
            }

            setTotalPage((x + 1))
        }
        else if (filter === "2") {
            let x = (semester_class_parent.not_payed_now.length - (semester_class_parent.not_payed_now.length) % 10) / 10;
            if (x === 0) {
                setElement(semester_class_parent.not_payed_now)
            }
            else {
                setElement(semester_class_parent.not_payed_now.slice(0, 10))
            }

            setTotalPage((x + 1))
        }
    }

    console.log(filter)


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row mt-1">
                {
                        function () {
                            var resArr: ISemesterClassParentX[] = [];
                            element.filter(function (item) {
                                var i = resArr.findIndex(x => (x.id == item.id));
                                if (i <= -1) {
                                    if (item.status !== "Not register") {
                                        let numbers: number[] = [];
                                        numbers.push(item.student_id);
                                        let item_x: ISemesterClassParentX = {
                                            id: item.id,
                                            name: item.name,
                                            course_name: item.course_name,
                                            course_id: item.course_id,
                                            semester_class_id: item.semester_class_id,
                                            start_date: item.start_date,
                                            registration_expiration_time: item.registration_expiration_time,
                                            description: item.description,
                                            max_participant: item.max_participant,
                                            num_of_section: item.num_of_section,
                                            price: item.price,
                                            semester_name: item.semester_name,
                                            semester_id: item.semester_id,
                                            status: item.status,
                                            image_url: item.image_url,
                                            art_type_name: item.art_type_name,
                                            art_level_name: item.art_level_name,
                                            art_age_name: item.art_age_name,
                                            total_register: item.total_register,
                                            schedule: item.schedule,
                                            registration_deadline: item.registration_deadline,
                                            student_ids: numbers,
                                            student_names: new Array(item.student_name)
                                        }
                                        return resArr.push(item_x);
                                    }
                                    else {
                                        let item_x: ISemesterClassParentX = {
                                            id: item.id,
                                            name: item.name,
                                            course_name: item.course_name,
                                            course_id: item.course_id,
                                            semester_class_id: item.semester_class_id,
                                            start_date: item.start_date,
                                            registration_expiration_time: item.registration_expiration_time,
                                            description: item.description,
                                            max_participant: item.max_participant,
                                            num_of_section: item.num_of_section,
                                            price: item.price,
                                            semester_name: item.semester_name,
                                            semester_id: item.semester_id,
                                            status: item.status,
                                            image_url: item.image_url,
                                            art_type_name: item.art_type_name,
                                            art_level_name: item.art_level_name,
                                            art_age_name: item.art_age_name,
                                            total_register: item.total_register,
                                            schedule: item.schedule,
                                            registration_deadline: item.registration_deadline,
                                            student_ids: [],
                                            student_names: []
                                        }
                                        return resArr.push(item_x);
                                    }
                                }
                                else {
                                    let x = resArr[i];
                                    if (x !== undefined) {
                                        if (item.status !== "Not register") {
                                            let xy: number[] = x.student_ids;     
                                            xy.push(item.student_id);  
                                            let yz: string[] = x.student_names;     
                                            yz.push(item.student_name); 
                                            x.student_ids = xy;
                                            x.student_names = yz; 
                                        }                        
                                    }
                                    return resArr
                                }
                            });
                            console.log(resArr.length)
                            return resArr.filter((val) => {
                                if (props.value === "") {
                                    return val;
                                }
                                else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                    return val;
                                }
                                return null
                            }).map((ele, index) => {
                                return (
                                    <div className="col-md-4" onClick={() => { routeChange(ele) }}>
                                        <div className="p-card bg-white p-2 rounded px-3 product-x">
                                            <div className="d-flex align-items-center credits"><img src={ele.image_url} className="image-cardx" width="100%" alt="" /></div>
                                            <h5 className="mt-2" style={{color: "#3A7CFB"}}>{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span>
                                            
                                            <span className="d-block">
                                                    <span className="title-card">
                                                    Số tài khoản con đăng kí:  
                                                    </span>
                                                    <span className="status-register pl-2">
                                                        {ele.student_ids.length}
                                                    </span>               
                                            </span>

                                            <span className="schedule-x">
                                                <span className="title-card">
                                                    Lịch học: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.schedule}
                                                </span>               
                                            </span>

                                            <span className="d-block">
                                                <span className="title-card">
                                                    Đăng kí: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.total_register}/{ele.max_participant}
                                                </span>               
                                            </span>

                                            <span className="d-block">
                                                <span className="title-card">
                                                    Ngày bắt đầu đăng kí: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.registration_deadline.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>

                                            <span className="d-block mb-2">
                                                <span className="title-card">
                                                    Ngày hết hạn đăng kí: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.registration_expiration_time.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>
                                            
                                            
                        
                                            <div
                                            className="d-flex justify-content-between stats">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2"></span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3 content-card">
                                                {ele.total_register} 
                                                </span></div>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        }()
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

export default SemesterClassNewList;
