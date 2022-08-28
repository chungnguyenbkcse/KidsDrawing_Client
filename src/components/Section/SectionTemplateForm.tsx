import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionTemplateState, ITutorialTemplatePageState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import TextInput from "../../common/components/TextInput";
import { clearSelectedSectionTemplate, setModificationStateSectionTemplate, addSectionTemplate } from "../../store/actions/section_template.action";
import { OnChangeModel, ISectionTemplateFormState, OnChangeModelNotFiled } from "../../common/types/Form.types";
import Editor from "../../common/components/Quill/EditorSectionTemplate";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { updateCurrentPath } from "../../store/actions/root.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";

export type SectionTemplateListProps = {
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}

type PageContent = {
    page: number;
    content: string;
}

function SectionTemplateForm(props: SectionTemplateListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const section_templates: ISectionTemplateState | null = useSelector((state: IStateType) => state.section_templates);
    const tutorial_template_pages: ITutorialTemplatePageState | null = useSelector((state: IStateType) => state.tutorial_template_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    console.log(section_templates.sectionTemplates)
    let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;
    
    var id_x = localStorage.getItem('section_template_id');
    let section_template_id: number = 0;
    if (id_x !== null) {
        section_template_id = parseInt(id_x)
    }
    
    if (!section_template) {
        section_template = { id: 0, name: "", description: "", creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }

    console.log(tutorial_template_pages.tutorialTemplatePages)
    //console.log(tutorial_template_pages.tutorialTemplatePages[0].description)
    if (tutorial_template_pages.tutorialTemplatePages.length === 0){
        section_template = { id: 0, name: "", description: "", creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch]);


    const [formState, setFormState] = useState({
        name: { error: "", value: section_template.name },
        description: { error: "", value: section_template.description },
        number: { error: "", value: section_template.number },
        teaching_form: { error: "", value: section_template.teaching_form },
        course_id: { error: "", value: section_template.course_id },
        creator_id: { error: "", value: section_template.creator_id },
        create_time: { error: "", value: section_template.create_time },
        update_time: { error: "", value: section_template.update_time }
    });
    const [totalPage, setTotalPage] = useState(tutorial_template_pages.tutorialTemplatePages.length);
    const [index, setIndex] = useState(0);
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setTotalPage(model.value)
        setContentTutorialPage([])
    }

    useEffect(() => {
        if (totalPage > 0) {
            setCurrentPage(1)
        }
        else {
            setCurrentPage(0)
        }
    }, [totalPage])

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        let saveUserFn: Function = addSectionTemplate;
        console.log(contentTutorialPage)
        //console.log(saveUserFn)
        saveForm(formState, saveUserFn, contentTutorialPage);
    }

    const [textHtml, setTextHtml] = useState<string>("")
    function getValue(value: string) {
        setTextHtml(value);
    }

    //useEffect(() => {
    //    if (tutorial_template_pages.tutorialTemplatePages.length > 0){
    //        setTextValue(tutorial_template_pages.tutorialTemplatePages[currentPage].description)
    //    }
    //}, [tutorial_template_pages, currentPage, textHtml])

    function saveForm(formState: ISectionTemplateFormState, saveFn: Function, contentTutorialPages: PageContent[]): void {
        if (section_template) {

            dispatch(clearSelectedSectionTemplate());
            dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
        }
    }


    function isFormInvalid(): boolean {
        return (currentPage === totalPage) as boolean;
    }

    const listTotalPage: Options[] = [
        {
            "name": "1 trang",
            "value": 1
        },
        {
            "name": "2 trang",
            "value": 2
        },
        {
            "name": "3 trang",
            "value": 3
        },
        {
            "name": "4 trang",
            "value": 4
        }
    ];

    function handleNextPage() {
        let contentPage: PageContent = {
            page: currentPage,
            content: textHtml
        }
        setIndex(index + 1)
        setContentTutorialPage([...contentTutorialPage, contentPage])
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
        setTextHtml("")
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
                    dispatch(getTutorialPageBySection(section_template_id))
                }
            }
            else {
                dispatch(getTutorialPageBySection(section_template_id))
            }
        }
    }, [dispatch, section_template_id, access_token, refresh_token])

    function handleSaveTutorialTemplate() {
        let contentPage: PageContent = {
            page: currentPage,
            content: textHtml
        }
        setContentTutorialPage([...contentTutorialPage, contentPage])
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
        setTextHtml("")
    }

    useEffect(() => {
        if (tutorial_template_pages.tutorialTemplatePages.length !== 0) {
            setTotalPage(tutorial_template_pages.tutorialTemplatePages.length)
        }
    }, [tutorial_template_pages])
    return (
        <Fragment>
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Buổi</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextInput id="input_name"
                                        value={formState.name.value}
                                        field="name"
                                        onChange={hasFormValueChanged}
                                        required={true}
                                        maxLength={2000}
                                        label="Tên giáo trình"
                                        placeholder="" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <SelectKeyValueNotField
                                        value={tutorial_template_pages.tutorialTemplatePages.length !== 0 ? tutorial_template_pages.tutorialTemplatePages.length : totalPage}
                                        id="input_total_page"
                                        onChange={hasFormValueChangedNotFiled}
                                        required={true}
                                        label="Số trang"
                                        options={listTotalPage}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Nội dung trang {currentPage}</label>
                                <Editor getValue={getValue} isCreate={textHtml} setValue={tutorial_template_pages.tutorialTemplatePages.length === 0 ? "" : tutorial_template_pages.tutorialTemplatePages.sort((a,b) => a.number - b.number)[index].description} />
                            </div>
                            {
                                function () {
                                    if (currentPage < totalPage){
                                        return (
                                            <div className="form-group">
                                                <button type="button" className="btn btn-info right-margin" onClick={handleNextPage}>Trang tiếp theo</button>
                                            </div>
                                        )
                                    }
                                }()
                            }
                            {
                                function () {
                                    if (totalPage > 0){
                                        return (
                                            <button type="button" className="btn btn-info right-margin" onClick={handleSaveTutorialTemplate}>Lưu</button>
                                        )
                                    }
                                }
                            }
                            <button type="submit" className={`btn btn-primary left-margin`}>Hoàn thành</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SectionTemplateForm;
