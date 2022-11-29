import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { ICourseTeacherNew } from "../../store/models/course_teacher_new.interface";
import { IArtAgeState, IArtLevelState, IArtTypeState, ICourseTeacherNewState, IStateType } from "../../store/models/root.interface";
import "./CourseTeacherList.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
  };

function CourseTeacherList(props: semesterListProps): JSX.Element {
    const course_teachers: ICourseTeacherNewState = useSelector((state: IStateType) => state.course_teacher_new);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const art_levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
    
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ICourseTeacherNew[]>([])
    const history = useHistory();
    const routeChange = (course: ICourseTeacherNew) =>{ 
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.id.toString())
        let path = '/courses/semester-classes'; 
        history.push({
            pathname: path
        });
    }

    useEffect(() => {
        let x = (course_teachers.courses.length - course_teachers.courses.length % 6) /6;
        if (x === 0) {
            setElement(course_teachers.courses)
        }
        else {
            setElement(course_teachers.courses.slice(0,6))
        }
        
         setTotalPage((x+1))
    }, [course_teachers.courses])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(course_teachers.courses.slice(count*6))
        }
        else {
            setElement(course_teachers.courses.slice(count*6,count*6 + 6))
        }
    }

    const [filter, setFilter] = useState(0)
    const [filter1, setFilter1] = useState(0)
    const [filter2, setFilter2] = useState(0)


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleChange1(e: any) {
        setFilter1(e.target.value)
    }

    function handleChange2(e: any) {
        setFilter2(e.target.value)
    }

    console.log(element)

    function handleFilter() {
        console.log(filter)
        console.log(filter1)
        console.log(filter2)

        if (filter == 0 && filter1 == 0 && filter2 == 0) {
            let k = course_teachers.courses;
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter == 0 && filter1 == 0 && filter2 != 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_level_id == filter2)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter == 0 && filter1 != 0 && filter2 == 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_age_id == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 == 0 && filter2 == 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_type_id == filter)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 != 0 && filter2 == 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_type_id == filter && ele.art_age_id == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }

        else if (filter == 0 && filter1 != 0 && filter2 != 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_level_id == filter2 && ele.art_age_id == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }

        else if (filter != 0 && filter1 == 0 && filter2 != 0) {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_level_id == filter2 && ele.art_type_id == filter)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else {
            let k = course_teachers.courses.filter((ele, idx) =>  ele.art_level_id == filter2 && ele.art_type_id == filter && ele.art_age_id  == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
    }


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters mt-2">
                            <h6 className="ml-3">Có {element.filter((val) => {
                            if (props.value === ""){
                              return val;
                            }
                            else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
                              return val;
                            }
                            return null
                          }).length} kết quả</h6>
                            <div className="right-sort">
                                <div className="sort-by mr-3">
                                    <span className="ml-1 mr-1">Thể loại:</span>
                                    <select name="cars" id="cars"
                                        value={filter}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Choose...</option>
                                        {
                                            art_types.artTypes.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select> 
                                    <span className="ml-1 mr-1">Độ tuổi:</span>  
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter1}
                                        onChange={handleChange1}
                                    >
                                        <option value={0} selected>Choose</option>
                                        {
                                            art_ages.artAges.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className="ml-1 mr-1">Cấp độ:</span>
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter2}
                                        onChange={handleChange2}
                                    >
                                        <option value={0} selected>Choose</option>
                                        {
                                            art_levels.artLevels.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
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
                            if (props.value === ""){
                              return val;
                            }
                            else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
                              return val;
                            }
                            return null
                          }).map((ele, index) => {
                            return (
                                <div className="col-md-4" onClick={() => {routeChange(ele)}}>
                                    <div className="p-card bg-white p-2 rounded px-3 product-x">
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} width="100%" alt=""/></div>
                                        <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name} &amp; {ele.art_level_name}</span><span className="d-block mb-5">Hiện tại khóa học mở {ele.total} lớp.</span>
                                        <div
                                            className="d-flex justify-content-between stats">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2"></span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">{ele.total_registed}</span></div>
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
                            <a className="page-link" aria-label="Previous" href="javascript:void(0);" onClick={(e) => e.preventDefault()}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                            {
                                Array.from(Array((totalPage)).keys()).map((ele, idx) => {
                                    return (
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);" onClick={(e) => {
                                            e.preventDefault()
                                            handlePagination(ele)}}>{ele+1}</a></li>
                                    )
                                })
                            }
                            <li className="page-item">
                                <a className="page-link" aria-label="Next" href="javascript:void(0);" onClick={(e) => e.preventDefault()}>
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

export default CourseTeacherList;
