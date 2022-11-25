import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestParentState, IArtTypeState, IArtAgeState, IUserState } from "../../store/models/root.interface";
import { ILesson } from "../../store/models/lesson.interface";
import { useHistory } from "react-router-dom";
import { IContestParent } from "../../store/models/contest_parent.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type lessonListProps = {
    onSelect?: (lesson: ILesson) => void;
    value?: string;
    children?: React.ReactNode;
};

export type IContestParentX = {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    total_register_contest: number;
    total_contest_submission: number;
    total_contest_submission_graded: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    art_type_name: string;
    status: string;
    art_age_name: string;
    art_type_id: number;
    art_age_id: number;
    student_ids: number[];
    student_names: string[];
    creator_id: number;
    create_time: string;
    update_time: string;
}

function ContestParentEndList(props: lessonListProps): JSX.Element {
    const contest_parents: IContestParentState = useSelector((state: IStateType) => state.contest_parents);
    const users: IUserState  = useSelector((state: IStateType) => state.users);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IContestParent[]>([])
    
    const history = useHistory();

    const routeChange = (contest: IContestParentX) => {
        let path = '/contest/result-grade';
        localStorage.removeItem('contest_id');
        localStorage.setItem('contest_id', contest.id.toString())
        localStorage.removeItem('contest_name')
        localStorage.setItem('contest_name', contest.name)
        history.push({
            pathname: path
        });
    }

    useEffect(() => {
        let x = (contest_parents.contest_end.length - contest_parents.contest_end.length % 10) /10;
        if (x === 0) {
            setElement(contest_parents.contest_end)
        }
        else {
            setElement(contest_parents.contest_end.slice(0,10))
        }
        
         setTotalPage((x+1))
    }, [contest_parents.contest_end])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(contest_parents.contest_end.slice(count*10))
        }
        else {
            setElement(contest_parents.contest_end.slice(count*10,count*10 + 10))
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
    
    function handleFilter() {
        if (filter2 == 0) {
            if (filter == 0 && filter1 == 0) {
                let k = contest_parents.contest_end;
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_age_id == filter1)
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_type_id == filter)
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1)
    
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
        else {
            if (filter == 0 && filter1 == 0) {
                let k = contest_parents.contest_end.filter((ele, idx) => ele.student_id == filter2);
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_age_id == filter1 && ele.student_id == filter2)
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_type_id == filter && ele.student_id == filter2)
    
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
                let k = contest_parents.contest_end.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1 && ele.student_id == filter2)
    
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
                                    <span className="mr-1">Thể loại:</span>
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
                                    <span className="mr-1">Độ tuổi:</span>
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
                                    <span className="mr-1">Học sinh:</span>
                                    <select name="cars" id="cars"
                                        value={filter2}
                                        onChange={handleChange2}
                                    >
                                        <option value={0} selected>Choose</option>
                                        {
                                            users.students.map((ele, idx) => {
                                                return (
                                                    <option value={ele.id}>{ele.username}</option>
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
                            var resArr: IContestParentX[] = [];
                            element.filter(function (item) {
                                var i = resArr.findIndex(x => (x.id == item.id));
                                if (i <= -1) {
                                    let item_x: IContestParentX = {
                                        id: item.id,
                                        name: item.name,
                                        description: item.description,
                                        max_participant: item.max_participant,
                                        total_register_contest: item.total_register_contest,
                                        total_contest_submission: item.total_contest_submission,
                                        total_contest_submission_graded: item.total_contest_submission_graded,
                                        registration_time: item.registration_time,
                                        image_url: item.image_url,
                                        start_time: item.start_time,
                                        end_time: item.end_time,
                                        is_enabled: item.is_enabled,
                                        art_type_name: item.art_type_name,
                                        status: item.status,
                                        art_age_name: item.art_age_name,
                                        art_type_id: item.art_type_id,
                                        art_age_id: item.art_age_id,
                                        student_ids: new Array(item.student_id),
                                        student_names: new Array(item.student_name),
                                        creator_id: item.creator_id,
                                        create_time: item.create_time,
                                        update_time: item.update_time
                                    }
                                    resArr.push(item_x);
                                }
                                else {
                                    let x = resArr[i];
                                    if (x !== undefined) {
                                        let xy: number[] = x.student_ids;     
                                        xy.push(item.student_id);  
                                        let yz: string[] = x.student_names;     
                                        yz.push(item.student_name); 
                                        x.student_ids = xy;
                                        x.student_names = yz;                         
                                    }
                                }
                                return null;
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
                                            <span className="d-block">Học sinh:  {ele.student_names.map((elex, idxx) => {
                                                if (idxx === ele.student_names.length - 1) {
                                                    return elex
                                                }
                                                return " " + elex + ","
                                            })}</span>
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

export default ContestParentEndList;
