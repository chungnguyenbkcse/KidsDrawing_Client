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
import { toast, ToastContainer } from "react-toastify";
import { putTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PutTutorialTemplatePage";
import { postTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PostTutorialTemplatePage";
import { putTutorialTemplate } from "../../common/service/TutorialTemplate/PutTutorialTemplate";
import { getTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/GetTutorialTemplatePage";
import { useHistory } from "react-router-dom";


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
    //console.log(section_templates.sectionTemplates)
    let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;

    var id_x = localStorage.getItem('section_template_id');
    let section_template_id: number = 0;
    if (id_x !== null) {
        section_template_id = parseInt(id_x)
    }

    var id_y = localStorage.getItem('section_number');
    let section_number: number = 0;
    if (id_y !== null) {
        section_number = parseInt(id_y)
    }

    var id_z = localStorage.getItem('description_tutorial_template_page_list');
    let list_description: any[] = []
    if (id_z !== null) {
        list_description = JSON.parse(id_z);
    }

    const history = useHistory();
    function routeHome() {
        let path = `/courses/section-template`;
        history.push(path);
    }

    let [textHtml, setTextHtml] = useState(list_description[0].description);

    if (!section_template) {
        section_template = { id: 0, name: "", description: "", creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }

    console.log(tutorial_template_pages.tutorialTemplatePages)
    if (tutorial_template_pages.tutorialTemplatePages.length === 0) {
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
    const [totalPage, setTotalPage] = useState(list_description.length);
    const [index, setIndex] = useState(1);
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setTotalPage(model.value)
        setContentTutorialPage([])
    }

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        let saveUserFn: Function = addSectionTemplate;
        console.log(contentTutorialPage)
        //console.log(saveUserFn)
        saveForm(formState, saveUserFn, contentTutorialPage);
    }

    function saveForm(formState: ISectionTemplateFormState, saveFn: Function, contentTutorialPages: PageContent[]): void {
        if (section_template) {
            const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            let contentPage: PageContent = {
                page: currentPage,
                content: value
            }

            dispatch(putTutorialTemplate(list_description[0].tutorial_template_id, {
                name: formState.name.value,
                description: "",
                section_template_id: section_template_id
            }))

            let lst: PageContent[] = [...contentTutorialPage, contentPage] ;
            lst.map((ele, index) => {
                if (index < list_description.length){
                    dispatch(putTutorialTemplatePage(list_description[index].id, {
                        description: ele.content,
                        name: list_description[index].name,
                        tutorial_template_id: list_description[0].tutorial_template_id,
                        number: ele.page
                    }))
                }
                else {
                    dispatch(postTutorialTemplatePage({
                        description: ele.content,
                        name: formState.name.value,
                        tutorial_template_id: list_description[0].tutorial_template_id,
                        number: ele.page
                    }))
                }
                return null
            })
            
            toast.update(idx, { render: "Chỉnh giáo án thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch(getTutorialTemplatePage())
            dispatch(clearSelectedSectionTemplate());
            dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
            setTimeout(function () {
                routeHome();
            }, 2000); 
        }
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
            content: value
        }
        setIndex(index + 1)
        console.log(index)
        setContentTutorialPage([...contentTutorialPage, contentPage])
        if (currentPage < totalPage) {
            let x = currentPage + 1;
            setCurrentPage(x)
        }
        if (currentPage < list_description.length) {
            setTextHtml(list_description[index].description)
        }
        else {
            setTextHtml("")
        }
        
        setValue("")
    }

    const [value, setValue] = useState("")

    function getValue(value: any){
        setValue(value);
    }
    
    return (
        <Fragment>
            <ToastContainer />
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Buổi {section_number}</h6>
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
                                        value={totalPage}
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
                                <Editor getValue={getValue} setValue={textHtml} />
                            </div>
                            {
                                function () {
                                    if (currentPage < totalPage) {
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
                                    if (currentPage === totalPage) {
                                        return (
                                            <button type="submit" className={`btn btn-primary left-margin`}>Hoàn thành</button>
                                        )
                                    }
                                }()
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SectionTemplateForm;
