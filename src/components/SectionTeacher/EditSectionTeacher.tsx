import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionState, ITutorialPageState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISection } from "../../store/models/section.interface";
import TextInput from "../../common/components/TextInput";
import { addSection } from "../../store/actions/section.action";
import { OnChangeModel, ISectionFormState } from "../../common/types/Form.types";
import Editor from "../../common/components/Quill/EditorEditSection";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getTutorialPageByTutorialId } from "../../common/service/TutorialPage/GetTutorialPageByTutorialId";
import { postUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/PostUserRegisterTutorial";


export type SectionListProps = {
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

type TutorialPage = {
    id: number;
    tutorial_id: number;
    name: string;
    number: number;
    description: string;
}

function EditSectionTeacher(props: SectionListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);
    const tutorial_pages: ITutorialPageState | null = useSelector((state: IStateType) => state.tutorial_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    //console.log(sections.sections)
    let section: ISection | null = sections.selectedSection;

    const [checked, setChecked] = useState(false);

    var id_x = localStorage.getItem('section_id');
    let section_id: number = 0;
    if (id_x !== null) {
        section_id = parseInt(id_x)
    }

    var id_h = localStorage.getItem('id');
    let id: number = 0;
    if (id_h !== null) {
        id = parseInt(id_h)
    }

    var id_y = localStorage.getItem('section_number');
    let section_number: number = 0;
    if (id_y !== null) {
        section_number = parseInt(id_y)
    }

    var id_z = localStorage.getItem('description_tutorial_page_list');
    let list_description: TutorialPage[] = []
    let initial_text = ""
    if (id_z !== null) {
        list_description = JSON.parse(id_z);
        initial_text = list_description.length !== 0 ? list_description[0].description: "";
    }


    var id_t = localStorage.getItem('tutorial_id');
    let tutorial_id: number = 0;
    if (id_t !== null) {
        tutorial_id = parseInt(id_t)
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
                    dispatch(getTutorialPageByTutorialId(tutorial_id))      
                }
            }
            else {
                dispatch(getTutorialPageByTutorialId(tutorial_id)) 
            }
        }
    }, [dispatch, access_token, refresh_token, tutorial_id])

    const history = useHistory();
    function routeHome() {
        let path = `/classes/section`;
        history.push(path);
    }

    let [textHtml, setTextHtml] = useState(initial_text);

    if (!section) {
        section = { id: 0, name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "" };
    }

    console.log(tutorial_pages.tutorialPages)
    if (tutorial_pages.tutorialPages.length === 0) {
        section = { id: 0, name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "" };
    }


    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch]);


    const [formState, setFormState] = useState({
        name: { error: "", value: section.name },
        number: { error: "", value: section.number },
        teach_form: { error: "", value: section.teach_form },
        class_id: { error: "", value: section.class_id },
        recording: { error: "", value: section.recording },
        message: { error: "", value: section.message }
    });
    const [totalPage, setTotalPage] = useState(list_description.length);
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        let saveUserFn: Function = addSection;
        console.log(contentTutorialPage)
        //console.log(saveUserFn)
        saveForm(formState, saveUserFn, contentTutorialPage);
    }

    function saveForm(formState: ISectionFormState, saveFn: Function, contentTutorialPages: PageContent[]): void {
        if (section) {
            const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            let contentPage: PageContent = {
                page: currentPage,
                content: value
            }

            dispatch(postUserRegisterTutorial([...contentTutorialPage, contentPage], {
                section_id: section_id,
                creator_id: id,
                name: formState.name.value,
                status: "Not approved now"
            }, idx, routeHome))
        }
    }


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
        console.log(currentPage)
        if (currentPage <= contentTutorialPage.length) {
            console.log(`curent-page: ${currentPage}`)
            console.log(currentPage)
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
        console.log(currentPage)
        setTextHtml(list_description[currentPage-2].description)
        setChecked(false)
        setValue("")
    }

    function handleNewPage() {
        const x = totalPage + 1;
        const y = currentPage;
        setTotalPage(x);
        setTextHtml("")
        console.log(y)
        let list_x: TutorialPage[] = list_description;
        let isCheck = false;
        list_description.map((ele, idx) => {
            console.log(y)
            if (ele.number === y) {
                isCheck = true;
                list_x.splice(idx + 1, 0, {
                    id: 0,
                    tutorial_id: ele.tutorial_id,
                    name: ele.name,
                    number: ele.number + 1,
                    description: ""
                })
                list_x.map((element, index) => {
                    if (index > idx + 1) {
                        list_x.splice(index, 1, {
                            id: element.id,
                            tutorial_id: element.tutorial_id,
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
                tutorial_id: list_x[0].tutorial_id,
                name: list_x[0].name,
                number: list_x.length + 1,
                description: ""
            })
        }

        console.log(x)
        console.log(list_x)

        localStorage.removeItem('description_tutorial_page_list');
        localStorage.setItem('description_tutorial_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
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
        let list_x: TutorialPage[] = list_description;
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
                            tutorial_id: element.tutorial_id,
                            name: element.name,
                            number: element.number - 1,
                            description: element.description
                        })
                    }
                    return 0
                })
            }
            else if (ele.number === y && idx === list_description.length - 1) {
                console.log('remove')
                list_x.splice(idx, 1);
            }
            return 0
        })

        if (isCheck1 === true) {
            console.log('next')
            localStorage.removeItem('description_tutorial_page_list');
            localStorage.setItem('description_tutorial_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
            handleNextPage1()
        }
        else {
            console.log('back')
            localStorage.removeItem('description_tutorial_page_list');
            localStorage.setItem('description_tutorial_page_list', JSON.stringify(list_x.sort((a, b) => a.number - b.number)))
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

export default EditSectionTeacher;
