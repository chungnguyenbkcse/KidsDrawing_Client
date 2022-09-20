import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionTemplateState, ITutorialTemplatePageState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import TextInput from "../../common/components/TextInput";
import { clearSelectedSectionTemplate, setModificationStateSectionTemplate, addSectionTemplate } from "../../store/actions/section_template.action";
import { OnChangeModel, ISectionTemplateFormState, OnChangeModelNotFiled } from "../../common/types/Form.types";
import Editor from "../../common/components/Quill/EditorEditSection";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { toast, ToastContainer } from "react-toastify";
import { putTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PutTutorialTemplatePage";
import { postTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PostTutorialTemplatePage";
import { putTutorialTemplate } from "../../common/service/TutorialTemplate/PutTutorialTemplate";
import { getTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/GetTutorialTemplatePage";
import { useHistory } from "react-router-dom";
import { deleteTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/DeleteTutorialTemplatePage";
import { trackPromise } from "react-promise-tracker";
import SelectKeyValueNotField2 from "../../common/components/SeclectKeyValueNotField2";
import "./SectionTemplate.css"


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

type TutorialPageTemplate = {
    id: number;
    tutorial_template_id: number;
    name: string;
    number: number;
    description: string;
}

function SectionTemplateForm(props: SectionTemplateListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const section_templates: ISectionTemplateState | null = useSelector((state: IStateType) => state.section_templates);
    const tutorial_template_pages: ITutorialTemplatePageState | null = useSelector((state: IStateType) => state.tutorial_template_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    //console.log(section_templates.sectionTemplates)
    let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;

    const [checked, setChecked] = useState(false);

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
    let list_description: TutorialPageTemplate[] = []
    let initial_text = ""
    if (id_z !== null) {
        list_description = JSON.parse(id_z);
        initial_text = list_description.length !== 0 ? list_description[0].description: "";
    }


    var id_t = localStorage.getItem('tutorial_template_id');
    let tutorial_template_id: number = 0;
    if (id_t !== null) {
        tutorial_template_id = parseInt(id_t)
    }

    const history = useHistory();
    function routeHome() {
        let path = `/courses/section-template`;
        history.push(path);
    }

    let [textHtml, setTextHtml] = useState(initial_text);

    if (!section_template) {
        section_template = { id: 0, name: "",  creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }

    console.log(tutorial_template_pages.tutorialTemplatePages)
    if (tutorial_template_pages.tutorialTemplatePages.length === 0) {
        section_template = { id: 0, name: "",  creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
    }


    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch]);


    const [formState, setFormState] = useState({
        name: { error: "", value: section_template.name },
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

            dispatch(putTutorialTemplate(tutorial_template_id, {
                name: formState.name.value,
                section_template_id: section_template_id
            }))

            let lst: PageContent[] = [...contentTutorialPage, contentPage] ;

            console.log(totalPage)

            if (totalPage < list_description.length) {
                list_description.map((ele, index) => {
                    if (totalPage > index){
                        dispatch(putTutorialTemplatePage(ele.id, {
                            description: lst[index].content,
                            name: ele.name,
                            tutorial_template_id: ele.tutorial_template_id,
                            number: lst[index].page
                        }))
                    }
                    else {
                        dispatch(deleteTutorialTemplatePage(ele.id))
                    }
                    return null
                })
            }
            else {
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
                            tutorial_template_id: tutorial_template_id,
                            number: ele.page
                        }))
                    }
                    return null
                })
            }
            
            toast.update(idx, { render: "Chỉnh giáo án thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            trackPromise(getTutorialTemplatePage(dispatch))
            dispatch(clearSelectedSectionTemplate());
            dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
            setTimeout(function () {
                routeHome();
            }, 2000); 
        }
    }

    console.log(contentTutorialPage)

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

        let check = false;
        contentTutorialPage.map((ele, idx) => {
            if (ele.page === contentPage.page) {
                ele = contentPage
                check = true;
            }
            return 0
        })

        if (check === false) {
            setContentTutorialPage([...contentTutorialPage, contentPage])
        }
        else {
            setContentTutorialPage(contentTutorialPage)
        }
        
        setIndex(index + 1)
        console.log(index)
        if (currentPage < totalPage) {
            let x = currentPage + 1;
            setCurrentPage(x)
        }
        else {
            let x = currentPage + 1;
            setCurrentPage(x)
        }
        if (currentPage < list_description.length) {
            console.log(currentPage - 1)
            setTextHtml(list_description[currentPage].description)
            setChecked(false)
        }
        else {
            setTextHtml("")
        }
        
        setValue("")
    }

    function handleNextPage1() {

        setTextHtml(list_description[currentPage-1].description)
        setChecked(false)
        setValue("")
    }

    console.log('Result: ', contentTutorialPage)

    console.log(`currentPage: ${currentPage}`)

    const [value, setValue] = useState("")
    console.log('value', value)

    function getValue(value: any){
        setValue(value);
        setChecked(true)
    }

    function handleBackPage () {
        let contentPage: PageContent = {
            page: currentPage - 1,
            content: value
        }

        let check = false;
        contentTutorialPage.map((ele, idx) => {
            if (ele.page === contentPage.page) {
                ele = contentPage
                check = true;
            }
            return 0
        })

        if (check === false) {
            setContentTutorialPage([...contentTutorialPage, contentPage])
        }
        else {
            setContentTutorialPage(contentTutorialPage)
        }

        if (currentPage - 1 > 0) {
            let x = currentPage - 1;
            setCurrentPage(x)
        }
        if (currentPage < list_description.length) {
            console.log(`curent-page: ${currentPage}`)
            setIndex(index - 1)
            setTextHtml(contentTutorialPage[currentPage - 2].content)
            console.log(textHtml)
            setChecked(false)
        }
        else {
            setTextHtml("")
        }
        
        setValue("")

    }

    function handleBackPage1 () {
        let x = currentPage - 1;
        setCurrentPage(x)
        setTextHtml(list_description[currentPage-2].description)
        setValue("")
    }

    function handleNewPage() {
        const x = totalPage + 1;
        const y = currentPage;
        setTotalPage(x);
        setTextHtml("")
        console.log(y)
        let list_x: TutorialPageTemplate[] = list_description;
        let isCheck = false;
        list_description.map((ele, idx) => {
            console.log(y)
            if (ele.number === y) {
                isCheck = true;
                list_x.splice(idx + 1, 0, {
                    id: 0,
                    tutorial_template_id: ele.tutorial_template_id,
                    name: ele.name,
                    number: ele.number + 1,
                    description: ""
                })
                list_x.map((element, index) => {
                    if (index > idx + 1) {
                        list_x.splice(index, 1, {
                            id: element.id,
                            tutorial_template_id: element.tutorial_template_id,
                            name: element.name,
                            number: element.number + 1,
                            description: element.description
                        })
                    }
                    return 0
                })
            }
            return 0
        })

        if (isCheck === false) {
            list_x.push({
                id: 0,
                tutorial_template_id: list_x[0].tutorial_template_id,
                name: list_x[0].name,
                number: list_x.length + 1,
                description: ""
            })
        }

        console.log(x)
        console.log(list_x)

        localStorage.removeItem('description_tutorial_template_page_list');
        localStorage.setItem('description_tutorial_template_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
        handleNextPage()
        console.log(currentPage)
        console.log(totalPage)
    }

    function handleRemove() {
        const x = totalPage - 1;
        const y = currentPage;
        setTotalPage(x);
        setTextHtml("")
        console.log(y)
        let isCheck1: Boolean = false;
        let list_x: TutorialPageTemplate[] = list_description;
        list_description.map((ele, idx) => {
            console.log(y)
            if (ele.number === y && idx !== list_description.length - 1) {
                isCheck1 = true;
                list_x.splice(idx, 1)
                console.log(list_x)
                list_x.map((element, index) => {
                    if (element.number > ele.number) {
                        list_x.splice(index, 1, {
                            id: element.id,
                            tutorial_template_id: element.tutorial_template_id,
                            name: element.name,
                            number: element.number - 1,
                            description: element.description
                        })
                    }
                    return 0
                })
            }
            else if (ele.number === y && idx === list_description.length - 1) {
                list_x.splice(idx, 1);
            }
            return 0
        })

        if (isCheck1 === true) {
            console.log('next')
            localStorage.removeItem('description_tutorial_template_page_list');
            localStorage.setItem('description_tutorial_template_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
            handleNextPage1()
        }
        else {
            console.log('back')
            localStorage.removeItem('description_tutorial_template_page_list');
            localStorage.setItem('description_tutorial_template_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
            handleBackPage1()
        }

        console.log(x)
        console.log(list_x)
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
                                <div className={`form-group col-md-6`}>
                                    <SelectKeyValueNotField2
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
                                <label>Nội dung bước {currentPage} / {totalPage}</label>
                                <Editor getValue={getValue} isCreate={checked} setValue={textHtml} />
                            </div>
                            {
                                function () {
                                    if (currentPage < totalPage) {
                                        if (currentPage === 1) {
                                            return (
                                                <div className="row">
                                                <div className="col-xl-4 col-md-4 col-xs-4">
                                                    <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                                                </div>
                                                <div className="col-xl-8 col-md-8 col-xs-8">
                                                    <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                </div>
                                            </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row">
                                                    <div className="col-xl-4 col-md-4 col-xs-4">
                                                        <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                                        <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                                                    </div>
                                                    <div className="col-xl-8 col-md-8 col-xs-8">
                                                        <button type="button" className="btn btn-error right-margin add-step btn-remove ml-2" onClick={handleRemove}>Xóa bước</button>
                                                        <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }()
                            }
                            {
                                function () {
                                    if (currentPage === totalPage) {
                                        return (
                                            <div className="row">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                                    <button type="submit" className={`btn btn-primary left-margin ml-2`}>Hoàn thành</button>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                <button type="button" className="btn btn-error right-margin add-step btn-remove ml-2" onClick={handleRemove}>Xóa bước</button>
                                                    <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                </div>
                                            </div>
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
