import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { IContestParentNew } from "../../store/models/contest_parent_new.interface";
import { IArtAgeState, IArtTypeState, IContestParentNewState, IStateType } from "../../store/models/root.interface";
import "./CourseNewTest.css"

export type semesterListProps = {
    value?: string;
    children?: React.ReactNode;
};

export type IContestParentNewX = {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    total_register_contest: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    creator_id: number;
    art_type_id: number;
    art_age_id: number;
    art_type_name: string;
    art_age_name: string;
    create_time: string;
    update_time: string;
    student_names: string[];
    student_ids: number[];
}

function ContestNewListTest(props: semesterListProps): JSX.Element {
    const contest_parent_news: IContestParentNewState = useSelector((state: IStateType) => state.contest_parent_new);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestParentNew[]>([])

    const history = useHistory();
    const routeChange = (contest: IContestParentNewX) =>{ 
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
        localStorage.removeItem('student_names');
        localStorage.setItem('student_names', JSON.stringify(contest.student_names))
        localStorage.removeItem('student_ids');
        console.log(contest.student_ids)
        localStorage.setItem('student_ids', JSON.stringify(contest.student_ids))
        let path = '/contests/register'; 
        history.push({
            pathname: path,
            state: { description: contest.description, id: contest.id}
        });
    }

    console.log(element)

    useEffect(() => {
        let x = (contest_parent_news.contests.length - contest_parent_news.contests.length % 10) /10;
        if (x === 0) {
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
        if (filter == 0 && filter1 == 0) {
            let k = contest_parent_news.contests;

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        
        else if (filter == 0 && filter1 != 0 ) {
            let k = contest_parent_news.contests.filter((ele, idx) => ele.art_age_id == filter1)

            let x = (k.length - (k.length) % 6) / 6;
            if (x === 0) {
                setElement(k)
            }
            else {
                setElement(k.slice(0, 6))
            }
            setTotalPage((x + 1))
        }
        else if (filter != 0 && filter1 == 0 ) {
            let k = contest_parent_news.contests.filter((ele, idx) => ele.art_type_id == filter)

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
            let k = contest_parent_news.contests.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1)

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
                            <h6 className="ml-3">{/* Có {element.filter((val) => {
                                if (props.value === "") {
                                    return val;
                                }
                                else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
                                    return val;
                                }
                                return null
                            }).length} kết quả */}</h6>
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
                        function () {
                            var resArr: IContestParentNewX[] = [];
                            element.filter(function (item) {
                                var i = resArr.findIndex(x => (x.id == item.id));
                                if (i <= -1) {
                                    if (item.student_id !== null && item.student_name !== null) {
                                        let numbers: number[] = [];
                                        numbers.push(item.student_id);
                                        let item_x: IContestParentNewX = {
                                            id: item.id,
                                            name: item.name,
                                            description: item.description,
                                            max_participant: item.max_participant,
                                            total_register_contest: item.total_register_contest,
                                            registration_time: item.registration_time,
                                            image_url: item.image_url,
                                            start_time: item.start_time,
                                            end_time: item.end_time,
                                            is_enabled: item.is_enabled,
                                            art_type_name: item.art_type_name,
                                            art_age_name: item.art_age_name,
                                            art_type_id: item.art_type_id,
                                            art_age_id: item.art_age_id,
                                            student_ids: numbers,
                                            student_names: new Array(item.student_name),
                                            creator_id: item.creator_id,
                                            create_time: item.create_time,
                                            update_time: item.update_time
                                        }
                                        return resArr.push(item_x);
                                    }
                                    else {
                                        let item_x: IContestParentNewX = {
                                            id: item.id,
                                            name: item.name,
                                            description: item.description,
                                            max_participant: item.max_participant,
                                            total_register_contest: item.total_register_contest,
                                            registration_time: item.registration_time,
                                            image_url: item.image_url,
                                            start_time: item.start_time,
                                            end_time: item.end_time,
                                            is_enabled: item.is_enabled,
                                            art_type_name: item.art_type_name,
                                            art_age_name: item.art_age_name,
                                            art_type_id: item.art_type_id,
                                            art_age_id: item.art_age_id,
                                            student_ids: [],
                                            student_names: [],
                                            creator_id: item.creator_id,
                                            create_time: item.create_time,
                                            update_time: item.update_time
                                        }
                                        return resArr.push(item_x);
                                    }
                                }
                                else {
                                    let x = resArr[i];
                                    if (x !== undefined) {
                                        if (item.student_id !== null && item.student_name !== null) {
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
                                            <h5 className="mt-2">{ele.name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name}</span>
                                            {
                                                ele.student_ids.length > 0 ? <span className="d-block">Học sinh đã đăng kí:  {ele.student_names.map((elex, idxx) => {
                                                    if (idxx === ele.student_names.length - 1) {
                                                        return elex
                                                    }
                                                    return " " + elex + ","
                                                })}</span> : ""
                                            }
                                            
                                            <span className="d-block">Ngày bắt đầu: {ele.start_time.replaceAll("T", " ").substring(0,16)}</span>
                                            <span className="d-block">Ngày kết thúc: {ele.end_time.replaceAll("T", " ").substring(0,16)}</span>
                                            <span className="d-block">Số đăng kí tối đa: {ele.max_participant}</span>
                                            <span className="d-block mb-5">Ngày hết hạn đăng kí: {ele.registration_time.replaceAll("T", " ").substring(0,16)}</span>
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

export default ContestNewListTest;
