import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { IContestParentNew } from "../../store/models/contest_parent_new.interface";
import { IContestParentNewState, IStateType } from "../../store/models/root.interface";
import "./CourseNewTest.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
  };

function ContestNewListTest(props: semesterListProps): JSX.Element {
    const contest_parent_news: IContestParentNewState = useSelector((state: IStateType) => state.contest_parent_new);
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestParentNew[]>([])

    const history = useHistory();
    const routeChange = (contest: IContestParentNew) =>{ 
        localStorage.removeItem('description_contest');
        localStorage.setItem('description_contest', contest.description);
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', contest.id.toString())
        localStorage.removeItem('contest_name');
        localStorage.setItem('contest_name', contest.name)
        localStorage.removeItem('art_age_name');
        localStorage.setItem('art_age_name', contest.art_age_name.toString())
        localStorage.removeItem('art_type_name');
        localStorage.setItem('art_type_name', contest.art_type_name.toString())
        localStorage.removeItem('registration_time');
        localStorage.setItem('registration_time', contest.registration_time.toString())
        localStorage.removeItem('start_time');
        localStorage.setItem('start_time', contest.start_time.toString())
        localStorage.removeItem('end_time');
        localStorage.setItem('end_time', contest.end_time.toString())
        localStorage.removeItem('max_participant');
        localStorage.setItem('max_participant', contest.max_participant.toString())
        let path = '/contests/register'; 
        history.push({
            pathname: path,
            state: { description: contest.description, id: contest.id}
        });
    }

    useEffect(() => {
        let x = (contest_parent_news.contests.length - contest_parent_news.contests.length % 10) /10;
        if (x === 1) {
            setElement(contest_parent_news.contests)
        }
        else {
            setElement(contest_parent_news.contests.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [contest_parent_news.contests])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(contest_parent_news.contests.slice(count*10))
        }
        else {
            setElement(contest_parent_news.contests.slice(count*10,count*10 + 10))
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
                                        <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span><span className="d-block mb-5">Hiện tại số đăng kí {ele.student_registered_id.length} học sinh.</span>
                                        <div
                                            className="d-flex justify-content-between stats">
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Ngày đăng kí: {ele.registration_time.replaceAll("T", " ")}</span></div>
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Ngày bắt đầu thi: {ele.start_time.replaceAll("T", " ")}</span></div>
                                            <div><i className="fa fa-calendar-o"></i><span className="ml-2">Ngày kết thúc: {ele.end_time.replaceAll("T", " ")}</span></div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">{ele.student_registered_id.length}</span></div>
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

export default ContestNewListTest;
