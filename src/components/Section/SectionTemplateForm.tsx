import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionTemplateState, ITutorialTemplateState, ITutorialTemplatePageState, IRootPageStateType, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import TextInput from "../../common/components/TextInput";
import { editSectionTemplate, clearSelectedSectionTemplate, setModificationStateSectionTemplate, addSectionTemplate } from "../../store/actions/section_template.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, ISectionTemplateFormState, OnChangeModelNotFiled } from "../../common/types/Form.types";
import { postSectionTemplate } from "../../common/service/SectionTemplate/PostSectionTemplate";
import { putSectionTemplate } from "../../common/service/SectionTemplate/PutSectionTemplate";
import Editor from "../../common/components/Quill/EditorSection";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { ICourse } from "../../store/models/course.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getTutorialTemplateBySectionTemplate } from "../../common/service/TutorialTemplate/GetTutorialTemplateBySectionTemplate";
import { useLocation } from "react-router-dom";

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

type TutorialSectionTemplate = {
    number: number;
    name: string;
    teaching_form: boolean;
    tutorial: PageContent[];
}

function SectionTemplateForm(props: SectionTemplateListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const section_templates: ISectionTemplateState | null = useSelector((state: IStateType) => state.section_templates);
    const tutorial_template_pages: ITutorialTemplatePageState | null = useSelector((state: IStateType) => state.tutorial_template_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    console.log(section_templates.sectionTemplates)
    let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;
    console.log(section_template)
    if (!section_template) {
        section_template = { id: 0, name: "", description: "", creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }
    let course_id = (section_template !== null ? section_template.id : 0)
    console.log(course_id)
    console.log(tutorial_template_pages.tutorialTemplatePages)

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch, course_id]);


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
    const [totalPage, setTotalPage] = useState(0);
    const [contentTutorialSection, setContentTutorialSection] = useState<TutorialSectionTemplate[]>([])
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [numberSection, setNumberSection] = useState<number>(1)

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

    useEffect(() => {
        dispatch(getTutorialTemplateBySectionTemplate(course_id))
    }, [currentPage, dispatch])

    const [textValue, setTextValue] = useState<string>("")
    useEffect(() => {
        if (tutorial_template_pages.tutorialTemplatePages.length > 0 && currentPage < tutorial_template_pages.tutorialTemplatePages.length){
            setTextValue(tutorial_template_pages.tutorialTemplatePages[currentPage-1].description)
            console.log(currentPage)
        }
    }, [currentPage, tutorial_template_pages, dispatch])

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        let saveUserFn: Function = addSectionTemplate;
        //console.log(contentTutorialSection)
        //console.log(saveUserFn)
        saveForm(formState, saveUserFn, contentTutorialSection);
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

    function saveForm(formState: ISectionTemplateFormState, saveFn: Function, contentTutorialSections: TutorialSectionTemplate[]): void {
        if (section_template) {
            dispatch(saveFn({
                ...section_template,
                name: formState.name.value,
                description: formState.description.value,
                number: formState.number.value,
                teaching_form: formState.teaching_form.value,
                course_id: formState.course_id.value,
                creator_id: formState.creator_id.value
            }));

            if (saveFn === addSectionTemplate && section_template !== null) {
                console.log("hello")
                let course_id = (section_template !== null ? section_template.id : 0)
                contentTutorialSections.map((contentSection) => {
                    return dispatch(postSectionTemplate(contentSection.tutorial, {
                        name: contentSection.name,
                        number: contentSection.number,
                        description: "",
                        teaching_form: contentSection.teaching_form,
                        course_id: course_id,
                        creator_id: localStorage.getItem('id')
                    }))
                })
            }

            dispatch(addNotification("Giáo trình ", `${formState.name.value} chỉnh bởi bạn`));
            dispatch(clearSelectedSectionTemplate());
            dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
        }
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
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


    const listTeachingForm: Options[] = [
        {
            "name": "Dạy thông qua Jitsi",
            "value": true
        },
        {
            "name": "Tự đọc giáo trình",
            "value": false
        }
    ]

    function handleNextPage() {
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

    function handleSaveTutorialTemplate() {
        let contentPage: PageContent = {
            page: currentPage,
            content: textHtml
        }
        let contentSection: TutorialSectionTemplate = {
            number: numberSection,
            name: formState.name.value,
            teaching_form: formState.teaching_form.value,
            tutorial: [...contentTutorialPage, contentPage]
        }
        setContentTutorialSection([...contentTutorialSection, contentSection])
    }

    function handleBackSection() {
        setNumberSection(numberSection - 1)
        setTextHtml("")
    }

    function handleNextSection() {
        setNumberSection(numberSection + 1)
        if (totalPage === 1) {
            let contentPage: PageContent = {
                page: currentPage,
                content: textHtml
            }
            let contentSection: TutorialSectionTemplate = {
                number: numberSection,
                name: formState.name.value,
                teaching_form: formState.teaching_form.value,
                tutorial: [...contentTutorialPage, contentPage]
            }
            setContentTutorialSection([...contentTutorialSection, contentSection])
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
                        <h6 className="m-0 font-weight-bold text-green">Buổi {numberSection}</h6>
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
                                        label="Tiêu đề buổi học"
                                        placeholder="" />
                                </div>
                                <div className="form-group col-md-6">
                                    <SelectKeyValue
                                        id="input_teaching_form"
                                        field="teaching_form"
                                        label="Hình thức dạy"
                                        options={listTeachingForm}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.teaching_form.value}
                                    />
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
                                <Editor getValue={getValue} isCreate={textHtml} setValue={textValue} />
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-info right-margin" onClick={handleNextPage}>Trang tiếp theo</button>
                            </div>
                            <button type="button" className="btn btn-info right-margin" onClick={handleSaveTutorialTemplate}>Lưu</button>
                            <button type="submit" className={`btn btn-primary left-margin ${getDisabledClass()}`}>Hoàn thành</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SectionTemplateForm;
