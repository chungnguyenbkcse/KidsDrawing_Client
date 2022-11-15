import React, { Fragment, useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { IStateType, IContestStudentState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IContestStudent } from "../../store/models/contest_student.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

function ContestStudentNotOpenNowList(props: lessonListProps): JSX.Element {
    const contest_students: IContestStudentState = useSelector((state: IStateType) => state.contest_students);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestStudent[]>([])
    
    const history = useHistory();
    const routeChange = (contest_student: IContestStudent) =>{ 
        localStorage.removeItem("contest_id")
        localStorage.setItem('contest_id', contest_student.id.toString())
        localStorage.removeItem("contest_name")
        localStorage.setItem('contest_name', contest_student.name)
        localStorage.removeItem("contest_description")
        localStorage.setItem('contest_description', contest_student.description)
        localStorage.removeItem("max_participant")
        localStorage.setItem('max_participant', contest_student.max_participant.toString())
        localStorage.removeItem("art_type_contest")
        localStorage.setItem('art_type_contest', contest_student.art_type_name)
        localStorage.removeItem("art_age_contest")
        localStorage.setItem('art_age_contest', contest_student.art_age_name)
        localStorage.removeItem("registration_time")
        localStorage.setItem('registration_time', contest_student.registration_time)
        localStorage.removeItem("start_time")
        localStorage.setItem('start_time', contest_student.start_time)
        localStorage.removeItem("end_time")
        localStorage.setItem('end_time', contest_student.end_time)
        let path = '/contests/detail-contest'; 
        history.push({
            pathname: path,
        });
    }

    useEffect(() => {
        let x = (contest_students.contest_not_open_now.length - contest_students.contest_not_open_now.length % 10) /10;
        if (x === 1) {
            setElement(contest_students.contest_not_open_now)
        }
        else {
            setElement(contest_students.contest_not_open_now.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [contest_students.contest_not_open_now])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(contest_students.contest_not_open_now.slice(count*10))
        }
        else {
            setElement(contest_students.contest_not_open_now.slice(count*10,count*10 + 10))
        }
    }

    const [filter, setFilter] = useState("0")


    function handleChange(e: any) {
        setFilter(e.target.value)
    }
    
    function handleFilter() { 
    }

    console.log(element)


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
                                        <option value="">--Thể loại--</option>
                                        <option value="0">Chì màu</option>
                                        <option value="1">Sơn dầu</option>
                                    </select>   
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter}
                                        onChange={handleChange}
                                    >
                                        <option value="">--Độ tuổi--</option>
                                        <option value="0">5-8 tuổi</option>
                                        <option value="1">10-12 tuổi</option>
                                    </select>  
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter}
                                        onChange={handleChange}
                                    >
                                        <option value="">--Bé--</option>
                                        <option value="0">Nguyen X</option>
                                        <option value="1">Nguyen Y</option>
                                    </select>                              
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => {handleFilter()}}>Lọc&nbsp;<i className="fa fa-flask"></i></button></div>
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
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} width="100%" alt="" /></div>
                                        <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span>
                                        <span className="d-block">Học sinh: {ele.student_name}</span>
                                        <span className="d-block">Ngày bắt đầu: {ele.start_time.replaceAll("T", " ")}</span>
                                        <span className="d-block">Ngày kết thúc đầu: {ele.end_time.replaceAll("T", " ")}</span>
                                        <span className="d-block">Số đăng kí tối đa: {ele.max_participant}</span>
                                        <span className="d-block mb-5">Ngày hết hạn đăng kí: {ele.registration_time.replaceAll("T", " ")}</span>
                                        <div
                                            className="d-flex justify-content-between stats">
                                                <div><i className="fa fa-calendar-o"></i><span className="ml-2"></span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">
                                                    {ele.total_register_contest}
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
            </div>
        </Fragment>
    );
}

export default ContestStudentNotOpenNowList;
