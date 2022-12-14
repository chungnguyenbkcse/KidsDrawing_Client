import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { IClassesParent } from "../../store/models/classes_parent.interface";
import { IArtAgeState, IArtLevelState, IArtTypeState, IClassesParentState, IStateType, IUserState } from "../../store/models/root.interface";
import "./ClassParentList.css"

export type classTeacherListProps = {
    onSelect?: (classTeacher: IClassesParent) => void;
    value?: string;
    children?: React.ReactNode;
};


export type IClassesParentX = {
    id: any;
    name: string;
    link_url: string;
    student_ids: number[];
    student_names: string[];
    url_image_course: string;
    teacher_name: string;
    teacher_id: number;
    course_id: number;
    schedule_section_next: string;
    semester_class_id: number;
    semester_class_name: string;
    user_register_teach_semester: number;
    security_code: string;
    total_section_studied: number;
    total_student: number;
    total_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_age_name: string;
}


function ClassDoingList1(props: classTeacherListProps): JSX.Element {
    const classes_parents: IClassesParentState = useSelector((state: IStateType) => state.classes_parents);
    const users: IUserState  = useSelector((state: IStateType) => state.users);
    const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const art_levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
    
    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<IClassesParent[]>([])
    useEffect(() => {
        let x = (classes_parents.classes_doing.length - classes_parents.classes_doing.length % 10) / 10;
        if (x === 0) {
            setElement(classes_parents.classes_doing)
        }
        else {
            setElement(classes_parents.classes_doing.slice(0, 10))
        }

        setTotalPage((x + 1))
    }, [classes_parents.classes_doing])

    function handlePagination(count: number) {
        console.log(count)
        if (count === totalPage) {
            setElement(classes_parents.classes_doing.slice(count * 10))
        }
        else {
            setElement(classes_parents.classes_doing.slice(count * 10, count * 10 + 10))
        }
    }


    const history = useHistory();
    const routeChange = (classes_parent: IClassesParentX) => {
        let path = '/student/classes-doing';
        localStorage.removeItem('teacher_id');
        localStorage.setItem('teacher_id', classes_parent.teacher_id.toString())
        localStorage.removeItem('student_names');
        localStorage.setItem('student_names', JSON.stringify(classes_parent.student_names))
        localStorage.removeItem('student_ids');
        localStorage.setItem('student_ids', JSON.stringify(classes_parent.student_ids))
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', classes_parent.id.toString());
        localStorage.removeItem('course_name');
        localStorage.setItem('course_name', classes_parent.course_name)
        history.push({
            pathname: path,
        });
    }


    const [filter, setFilter] = useState(0)
    const [filter1, setFilter1] = useState(0)
    const [filter2, setFilter2] = useState(0)
    const [filter3, setFilter3] = useState(0)


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function handleChange1(e: any) {
        setFilter1(e.target.value)
    }

    function handleChange2(e: any) {
        setFilter2(e.target.value)
    }

    function handleChange3(e: any) {
        setFilter3(e.target.value)
    }

    function handleFilter() {
        console.log(filter)
        console.log(filter1)
        console.log(filter2)

        if (filter3 == 0) {
            if (filter == 0 && filter1 == 0 && filter2 == 0) {
                let k = classes_parents.classes_doing;
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_age_id == filter1)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_type_id == filter)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_age_id == filter1)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_type_id == filter)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_type_id == filter && ele.art_age_id == filter1)
    
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
            if (filter == 0 && filter1 == 0 && filter2 == 0) {
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_age_id == filter1 && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_type_id == filter && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_type_id == filter && ele.art_age_id == filter1 && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_age_id == filter1 && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_type_id == filter && ele.student_id == filter3)
    
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
                let k = classes_parents.classes_doing.filter((ele, idx) => ele.art_level_id == filter2 && ele.art_type_id == filter && ele.art_age_id == filter1 && ele.student_id == filter3)
    
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
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-row justify-content-between align-items-center filters">
                            <h6 className="ml-3">{/* Có {element.filter((val) => {
                            if (props.value === ""){
                              return val;
                            }
                            else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
                              return val;
                            }
                            return null
                          }).length} kết quả */}</h6>
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
                                    <span className="ml-1 mr-1">Học sinh:</span>
                                    <select name="cars" id="cars"
                                        value={filter3}
                                        onChange={handleChange3}
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
                                    <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => handleFilter()}>Lọc&nbsp;<i className="fa fa-flask"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        function () {
                            var resArr: IClassesParentX[] = [];
                            element.filter(function (item) {
                                var i = resArr.findIndex(x => (x.course_id == item.course_id));
                                let numbers: number[] = [];
                                        numbers.push(item.student_id);
                                if (i <= -1) {
                                    let item_x: IClassesParentX = {
                                        id: item.id,
                                        name: item.name,
                                        link_url: item.link_url,
                                        student_ids: numbers,
                                        student_names: new Array(item.student_name),
                                        url_image_course: item.url_image_course,
                                        teacher_name: item.teacher_name,
                                        teacher_id: item.teacher_id,
                                        course_id: item.course_id,
                                        schedule_section_next: item.schedule_section_next,
                                        semester_class_id: item.semester_class_id,
                                        semester_class_name: item.semester_class_name,
                                        user_register_teach_semester: item.user_register_teach_semester,
                                        security_code: item.security_code,
                                        total_section_studied: item.total_section_studied,
                                        total_student: item.total_student,
                                        total_section: item.total_section,
                                        course_name: item.course_name,
                                        semester_name: item.semester_name,
                                        art_type_name: item.art_type_name,
                                        art_level_name: item.art_level_name,
                                        art_type_id: item.art_type_id,
                                        art_level_id: item.art_level_id,
                                        art_age_id: item.art_age_id,
                                        art_age_name: item.art_age_name
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
                                            <div className="d-flex align-items-center credits"><img src={ele.url_image_course} width="100%" alt="" /></div>
                                            <h5 className="mt-2">{ele.course_name}</h5><span className="badge badge-danger py-1 mb-2">{ele.art_type_name} &amp; {ele.art_age_name} &amp; {ele.art_level_name}</span>
                                            <span className="d-block">Học sinh:  </span>
                                            {ele.student_names.map((elex, idxx) => {
                                                    return(
                                                        <div className="d-block ml-2">
                                                            {elex}
                                                        </div>
                                                    )
                                            })}
                                            <span className="d-block mb-2">Đã học {ele.total_section_studied}/{ele.total_section} buổi.</span>
                                            <div
                                                className="d-flex justify-content-between stats">
                                                <div><i className="fa fa-calendar-o"></i><span className="ml-2"></span></div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <div className="profiles"><img className="rounded-circle" src="https://i.imgur.com/4nUVGjW.jpg" alt="" width="30" /><img className="rounded-circle" src=" https://i.imgur.com/GHCtqgp.jpg" alt="" width="30" /><img className="rounded-circle" src="https://i.imgur.com/UL0GS75.jpg" alt="" width="30" /></div><span className="ml-3">{ele.total_student}</span></div>
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
                                            handlePagination(ele)}}>{ele+1}</a></li>
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

export default ClassDoingList1;
