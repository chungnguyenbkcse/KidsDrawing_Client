import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SectionTemplateList from "./SectionTemplateList";
import TopCard from "../../common/components/TopCard";
import "./SectionTemplate.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISectionTemplateState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    clearSelectedSectionTemplate, setModificationStateSectionTemplate,
    changeSelectedSectionTemplate
} from "../../store/actions/section_template.action";
import { SectionTemplateModificationStatus, ISectionTemplate } from "../../store/models/section_template.interface";
import { getSectionTemplateByCourseId } from "../../common/service/SectionTemplate/GetSectionTemplateByCourseId";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getTutorialTemplate } from "../../common/service/TutorialTemplate/GetTutorialTemplate";
import { getTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/GetTutorialTemplatePage";
import { ToastContainer } from "react-toastify";

const SectionTemplate: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const SectionTemplates: ISectionTemplateState = useSelector((state: IStateType) => state.section_templates);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = SectionTemplates.sectionTemplates.length;
    const [searchTerm, setSearchTerm] = useState("");
    
    var id_x = localStorage.getItem('course_id');
    let course_id: number = 0;
    if (id_x != null){
        course_id = parseInt(id_x);
    }

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    dispatch(getSectionTemplateByCourseId(course_id)) 
                    dispatch(getTutorialTemplatePage())
                    dispatch(getTutorialTemplate())
                }
            }
            else {
                dispatch(getSectionTemplateByCourseId(course_id)) 
                dispatch(getTutorialTemplate())
                dispatch(getTutorialTemplatePage())
            }
        }
    }, [dispatch, access_token, refresh_token, course_id])

    useEffect(() => {
        dispatch(clearSelectedSectionTemplate());
        dispatch(updateCurrentPath("Buổi học", "Danh sách"));
    }, [path.area, dispatch]);

    function onSectionTemplateSelect(SectionTemplate: ISectionTemplate): void {
        dispatch(changeSelectedSectionTemplate(SectionTemplate));
        dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
    }



    return (
        <Fragment>
            <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Buổi học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ Buổi học" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                setSearchTerm(event.target.value)
                                console.log(searchTerm)
                            }}/>
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách buổi học</h6>
                        </div>
                        <div className="card-body">
                            <SectionTemplateList
                                onSelect={onSectionTemplateSelect} value={searchTerm}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    );
};

export default SectionTemplate;
