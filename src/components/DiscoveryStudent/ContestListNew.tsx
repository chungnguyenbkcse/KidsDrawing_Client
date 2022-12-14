import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { IContestStudent } from "../../store/models/contest_student.interface";
import { IArtAgeState, IArtTypeState, IContestStudentState, IStateType } from "../../store/models/root.interface";
import "./CourseListNew.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
  };

function ContestNewListTest(props: semesterListProps): JSX.Element {
    const contest_student: IContestStudentState = useSelector((state: IStateType) => state.contest_students);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestStudent[]>([])

    const history = useHistory();
    const routeChange = (contest: IContestStudent) =>{ 
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
        
        localStorage.removeItem('start_time');
        localStorage.setItem('start_time', contest.start_time.toString())
        localStorage.removeItem('end_time');
        localStorage.setItem('end_time', contest.end_time.toString())
        localStorage.removeItem('max_participant');
        localStorage.setItem('max_participant', contest.max_participant.toString())
        localStorage.removeItem('status');
        localStorage.setItem('status', contest.status.toString())
        let path = '/contests/register'; 
        history.push({
            pathname: path,
            state: { description: contest.description, id: contest.id}
        });
    }

    useEffect(() => {
        let x = (contest_student.contest_new.length - contest_student.contest_new.length % 10) /10;
        if (x === 0) {
            setElement(contest_student.contest_new)
        }
        else {
            setElement(contest_student.contest_new.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [contest_student.contest_new])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(contest_student.contest_new.slice(count*10))
        }
        else {
            setElement(contest_student.contest_new.slice(count*10,count*10 + 10))
        }
    }

    const [filter, setFilter] = useState(0)
    const [filter1, setFilter1] = useState(0)


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleChange1(e: any) {
        setFilter1(e.target.value)
    }


    console.log(element)

    function handleFilter() {
        console.log(filter)
        console.log(filter1)

        if (filter == 0 && filter1 == 0) {
            let k = contest_student.contest_new;
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter == 0 && filter1 != 0) {
            let k = contest_student.contest_new.filter((ele, idx) =>  ele.art_age_id == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 == 0) {
            let k = contest_student.contest_new.filter((ele, idx) =>  ele.art_type_id == filter)
    
            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 != 0 ) {
            let k = contest_student.contest_new.filter((ele, idx) =>  ele.art_type_id == filter && ele.art_age_id == filter1)
    
            let x = (k.length - (k.length) % 6) / 6;
            console.log('x',x)
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
    }

    console.log(element)


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
                                        <option value={0}>Choose...</option>
                                        {
                                            art_types.artTypes.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </select>   
                                    <select name="cars" id="cars" className="pl-2"
                                        value={filter1}
                                        onChange={handleChange1}
                                    >
                                        <option value={0}>Choose...</option>
                                        {
                                            art_ages.artAges.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                )
                                            })
                                        }
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
                                        <div className="d-flex align-items-center credits"><img src={ele.image_url} className="image-cardx" width="100%" alt="" /></div>
                                        <h5 className="mt-2" style={{color: "#3A7CFB"}}>{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span>
                                        <span className="d-block">
                                                <span className="title-card">
                                                    Ngày bắt đầu: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.start_time.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>

                                            <span className="d-block">
                                                <span className="title-card">
                                                    Ngày kết thúc: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.end_time.replaceAll("T", " ").substring(0,16)}
                                                </span>               
                                            </span>

                                            <span className="d-block">
                                                <span className="title-card">
                                                    Đã đăng kí: 
                                                </span>
                                                <span className="content-card">
                                                    {ele.total_register_contest}/{ele.max_participant}
                                                </span>               
                                            </span>
                                        
                                            {
                                                function() {
                                                    if (ele.status == "Registed") {
                                                        return (
                                                            <span className="d-block">
                                                                <span className="title-card">
                                                                Trạng thái:  
                                                                </span>
                                                                <span className="status-register pl-2">
                                                                    Đã đăng kí
                                                                </span>               
                                                            </span>
                                                        );
                                                    }
                                                    else {
                                                        return (
                                                            <span className="d-block">
                                                                <span className="title-card">
                                                                Trạng thái:  
                                                                </span>
                                                                <span className="status-register pl-2">
                                                                    Chưa đăng kí
                                                                </span>               
                                                            </span>
                                                        );
                                                    }
                                                }()
                                            }
                                        <div
                                            className="d-flex justify-content-between stats">
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div>{ele.total_register_contest}<span className="ml-3">
                                                    
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

export default ContestNewListTest;
