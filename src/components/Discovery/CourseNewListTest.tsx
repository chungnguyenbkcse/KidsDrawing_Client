import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { ICourseParentNew } from "../../store/models/course_parent_new.interface";
import { ICourseParentNewState, IStateType } from "../../store/models/root.interface";
import "./CourseNewTest.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
  };

function CourseNewList(props: semesterListProps): JSX.Element {
    const course_parent_news: ICourseParentNewState = useSelector((state: IStateType) => state.course_parent_news);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ICourseParentNew[]>([])
    const history = useHistory();
    const routeChange = (course: ICourseParentNew) =>{ 
        localStorage.removeItem('course_id');
        localStorage.setItem('course_id', course.id.toString())
        let path = '/courses/semester-classes'; 
        history.push({
            pathname: path
        });
    }

    useEffect(() => {
        let x = (course_parent_news.courses.length - course_parent_news.courses.length % 10) /10;
        if (x === 1) {
            setElement(course_parent_news.courses)
        }
        else {
            setElement(course_parent_news.courses.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [course_parent_news.courses])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(course_parent_news.courses.slice(count*10))
        }
        else {
            setElement(course_parent_news.courses.slice(count*10,count*10 + 10))
        }
    }

    const [filter, setFilter] = useState("0")


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    console.log(element)


    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters">
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
                                        <option value="">--Cấp độ--</option>
                                        <option value="0">Cơ bản</option>
                                        <option value="1">Nâng cao</option>
                                    </select>                                 
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button">Lọc&nbsp;<i className="fa fa-flask"></i></button></div>
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
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Giá: {ele.price} VND</span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">12</span></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">1 credits</span></div>
                            <h5 className="mt-2">Be social - Sell your stock directly on instagram</h5><span className="badge badge-danger py-1 mb-2">Marketing &amp; Sales</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div
                                className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">1 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">12</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">2 credits</span></div>
                            <h5 className="mt-2">Increase confidence with trustpilot reviews</h5><span className="badge badge-primary py-1 mb-2">integrations</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">2 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/KcxKRBm.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/DukIAef.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">16</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">1 credits</span></div>
                            <h5 className="mt-2">Be social - Sell your stock directly on instagram</h5><span className="badge badge-danger py-1 mb-2">Marketing &amp; Sales</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">1 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">12</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">2 credits</span></div>
                            <h5 className="mt-2">Increase confidence with trustpilot reviews</h5><span className="badge badge-primary py-1 mb-2">integrations</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">2 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/KcxKRBm.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/DukIAef.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">16</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">1 credits</span></div>
                            <h5 className="mt-2">Be social - Sell your stock directly on instagram</h5><span className="badge badge-danger py-1 mb-2">Marketing &amp; Sales</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">1 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">12</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-card bg-white p-2 rounded px-3">
                            <div className="d-flex align-items-center credits"><img src="https://i.imgur.com/hlz6G90.png" width="16px" /><span className="text-black-50 ml-2">2 credits</span></div>
                            <h5 className="mt-2">Increase confidence with trustpilot reviews</h5><span className="badge badge-primary py-1 mb-2">integrations</span><span className="d-block mb-5">Some kind of short descriptions can go here to better recommend tasks.</span>
                            <div className="d-flex justify-content-between stats">
                                <div><i className="fa fa-calendar-o"></i><span className="ml-2">2 days ago</span></div>
                                <div className="d-flex flex-row align-items-center">
                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/KcxKRBm.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/DukIAef.jpg" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" width="30" /></div><span className="ml-3">16</span></div>
                            </div>
                        </div>
                    </div> */}
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
            </div>


        </Fragment>
    );
}

export default CourseNewList;
