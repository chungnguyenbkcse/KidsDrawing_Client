import React, { Fragment, Dispatch, useState, useEffect } from "react";
import SectionTemplateList from "./SectionTemplateList";
import SectionTemplateForm from "./SectionTemplateForm";
import TopCard from "../../common/components/TopCard";
import "./SectionTemplate.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ISectionTemplateState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeSectionTemplate, clearSelectedSectionTemplate, setModificationStateSectionTemplate,
    changeSelectedSectionTemplate
} from "../../store/actions/section_template.action";
import { addNotification } from "../../store/actions/notifications.action";
import { SectionTemplateModificationStatus, ISectionTemplate } from "../../store/models/section_template.interface";
import { getSectionTemplate } from "../../common/service/SectionTemplate/GetSectionTemplate";
import { deleteSectionTemplate } from "../../common/service/SectionTemplate/DeleteSectionTemplate";
import { useLocation } from "react-router-dom";
import { getSectionTemplateByCourseId } from "../../common/service/SectionTemplate/GetSectionTemplateByCourseId";
import { getTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/GetTutorialTemplatePage";

const SectionTemplate: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const SectionTemplates: ISectionTemplateState = useSelector((state: IStateType) => state.section_templates);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = SectionTemplates.sectionTemplates.length;
    const [popup, setPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    var id_x = localStorage.getItem('course_id');
    let course_id: number = 0;
    if (id_x != null){
        course_id = parseInt(id_x);
    }

    useEffect(() => {
        dispatch(getSectionTemplateByCourseId(course_id)) 
    }, [dispatch])

    useEffect(() => {
        dispatch(clearSelectedSectionTemplate());
        dispatch(updateCurrentPath("Buổi học", "Danh sách"));
    }, [path.area, dispatch]);

    function onSectionTemplateSelect(SectionTemplate: ISectionTemplate): void {
        dispatch(changeSelectedSectionTemplate(SectionTemplate));
        onSectionTemplateRemove();
        dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
    }

    function onSectionTemplateRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    console.log(SectionTemplates.sectionTemplates)


    return (
        <Fragment>
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
