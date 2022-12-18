import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionState, ITutorialPageState, IRootPageStateType, ILessonState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISection } from "../../store/models/section.interface";
import TextInput from "../../common/components/TextInput";
import { OnChangeModel } from "../../common/types/Form.types";
import Editor from "../../common/components/Quill/EditorEditSection";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { addTutorialPage, editTutorialPage, removeTutorialPage } from "../../store/actions/tutorial_page.action";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { postTutorial } from "../../common/service/Tutorial/PostTutorial";
import { postTutorialPageToast } from "../../common/service/TutorialPage/PostTutorialPageToast";
import { postTutorialPage } from "../../common/service/TutorialPage/PostTutorialPage";
import { deleteTutorialPageBySection } from "../../common/service/TutorialPage/DeleteTutorialPageBySection";
import { setModificationState } from "../../store/actions/lesson.action";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import Popup from "reactjs-popup";

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
    id: any;
    section_id: number;
    number: number;
    description: string;
}

function EditSectionTeacher(props: SectionListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);
    const tutorial_pages: ITutorialPageState | null = useSelector((state: IStateType) => state.tutorial_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    console.log(tutorial_pages.tutorialPages)
    let section: ISection | null = sections.selectedSection;

    const [checked, setChecked] = useState(false);
    const [popup, setPopup] = useState(false);

    var id_x = localStorage.getItem('section_id');
    let section_id: number = 0;
    if (id_x !== null) {
        section_id = parseInt(id_x)
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

    console.log(list_description)

    var id_h = localStorage.getItem('section_name');
    let section_name: string = "";
    if (id_h !== null) {
        section_name = id_h
    }

    var id_k = localStorage.getItem('id');
    let id: number = 0;
    if (id_k !== null) {
        id = parseInt(id_k);
    }


    var id_kk = localStorage.getItem('is_tutorial_page');
    let is_tutorial_page = "";
    if (id_kk !== null) {
        is_tutorial_page = (id_kk);
    }

    const { promiseInProgress } = usePromiseTracker();




    const history = useHistory();
    function routeHome() {
        let path = `/classes/section`;
        history.push(path);
    }

    let [textHtml, setTextHtml] = useState(list_description.length !== 0 ? list_description[0].description: "");

    if (!section) {
        section = { id: 0, total_exercise_not_submit: 0,  name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "", teacher_name: "" };
    }

    console.log(tutorial_pages.tutorialPages)
    if (tutorial_pages.tutorialPages.length === 0) {
        section = { id: 0, total_exercise_not_submit: 0,  name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "", teacher_name: "" };
    }


    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch]);


    const [formState, setFormState] = useState({
        name: { error: "", value: section_name},
        number: { error: "", value: section.number },
        teach_form: { error: "", value: section.teach_form },
        class_id: { error: "", value: section.class_id },
        recording: { error: "", value: section.recording },
        message: { error: "", value: section.message }
    });

    const [totalPage, setTotalPage] = useState(list_description.length);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentPageOld, setCurrentPageOld] = useState<number>(1)

    const [checkCreateNew, setCheckCreateNew] = useState(false);
    const [checkAfterCreate, setCheckAfterCreate] = useState(false);
    const [checkEndCreate, setCheckEndCreate] = useState(false);

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();     
    }

    function saveForm(): void {
        if (section) {
            if (checkCreateNew === true || (currentPage === totalPage && checkAfterCreate === false)) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }

            else {
                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                    position: toast.POSITION.TOP_CENTER
                });
                /* let contentPage: PageContent = {
                    page: currentPage,
                    content: value
                }*/
    
                if (tutorial_pages !== null) {
                    if (tutorial_pages.tutorialPages.length > 0) {
                        let total = tutorial_pages.tutorialPages.length;
                        if (is_tutorial_page == "not") {
                            tutorial_pages.tutorialPages.map((value, index) => {
                                if (index === total - 1){
                                    setTimeout(function () {
                                        routeHome();
                                    }, 1000); 
                                    return dispatch(postTutorialPageToast({
                                        section_id: section_id,
                                        description: value.description,
                                        number: value.number
                                    }, idx))
                                }
                                return dispatch(postTutorialPage({
                                    section_id: section_id,
                                    description: value.description,
                                    number: value.number
                                }))
                            })
                        
                        }
                        else {
                            deleteTutorialPageBySection(dispatch, section_id, tutorial_pages.tutorialPages, routeHome, idx)
                        }
                    }
                }
            }
        }
    }


    function handleNextPage() {  
        if (tutorial_pages !== null) {
            if (checkCreateNew === true || (currentPage === totalPage && checkAfterCreate === false)) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else {
                if (checkAfterCreate === true) {
                    let x = currentPage + 1;
                    setCurrentPageOld(x-1)
                    setCurrentPage(x)
                    console.log(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number))
                    setTextHtml(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[x-1] !== undefined ? tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[x-1].description : "")
                    setChecked(false)
                    setValue("")
                    setCheckAfterCreate(false);
                }
                else {
                    let x = currentPage + 1;
                    setCurrentPage(x)
                    console.log(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number))
                    setTextHtml(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[x-1] !== undefined ? tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[x-1].description : "")
                    setChecked(false)
                    setValue("")
                }
            }
        }     
    }

    function handleBackPage () {
        console.log(checkCreateNew)
        console.log(currentPage)
        console.log(totalPage)
        if (tutorial_pages !== null) {
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else if (checkCreateNew === true  && currentPage == totalPage) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else {
                let x = currentPage - 1;
                setCurrentPageOld(x-1)
                setCurrentPage(x)
                console.log(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number))
                setTextHtml(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[x-1].description)
                setChecked(false)
                setValue("")
            }
        }     
    }


    function handleRemove() {
        dispatch(setModificationState(LessonModificationStatus.Remove))
        setPopup(true)
    }

    console.log('CurrentPage', currentPage);
    console.log('OldPage', currentPageOld)



    function handleNewPage() {
        if (currentPage === totalPage && checkEndCreate === false) {
            toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: true,
            });
        }else{
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else if (checkCreateNew === true  && currentPage == totalPage) {
                toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            }
            else {
                let x = currentPage + 1;
                setCurrentPageOld(x-1)
                setCurrentPage(x)
                setCheckCreateNew(true)
                let y = totalPage + 1;
                setTotalPage(y)
                console.log(currentPage - 1)
                setChecked(false)
                setTextHtml("")
                setValue("")
            }
        }
    }

    const [value, setValue] = useState("")
    console.log('value', value)

    function getValue(value: any){
        setValue(value);
        setChecked(true)
    }

    function handleSave(){
        if (currentPage === totalPage) {
            setCheckEndCreate(true)
        }
        if (tutorial_pages !== null){
            const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            const k = currentPage;

            if (checkCreateNew === true) {
                if (k - 1 === tutorial_pages.tutorialPages.length) {
                    console.log('yyy')
                    dispatch(addTutorialPage({
                        description: value,
                        section_id: section_id,
                        number: tutorial_pages.tutorialPages.length,
                        id: (tutorial_pages.tutorialPages.length + 1).toString()
                    }))
                }
                else {
                    console.log('xxx')
                    tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                        if (ele.number === k -1) {
                            console.log('1')
                            dispatch(editTutorialPage({
                                description: ele.description,
                                section_id: section_id,
                                number: ele.number + 1,
                                id: ele.id
                            }))
                            dispatch(addTutorialPage({
                                description: value,
                                section_id: section_id,
                                number: ele.number,
                                id: (tutorial_pages.tutorialPages.length + 1).toString()
                            }))
                        }
                        else if (ele.number > k - 1) {
                            console.log('2')
                            if (ele.number < tutorial_pages.tutorialPages.length - 1) {
                                dispatch(editTutorialPage({
                                    description: ele.description,
                                    section_id: section_id,
                                    number: ele.number + 1,
                                    id: ele.id
                                }))
                            }
                            else {
                                dispatch(editTutorialPage({
                                    description: ele.description,
                                    section_id: section_id,
                                    number: ele.number + 1,
                                    id: ele.id
                                }))
                            }
                        }
                        return 1
                    })

                    /* dispatch(addTutorialPage({
                        description: value,
                        name: formState.name.value,
                        section_id: section_id,
                        number: k - 1,
                        id: (tutorial_pages.tutorialPages.length + 1).toString()
                    })) */
                }
                setCheckCreateNew(false)
            }
            else {
                if (k < tutorial_pages.tutorialPages.length + 1) {
                    dispatch(editTutorialPage({
                        description: value,
                        section_id: section_id,
                        number: k-1,
                        id: tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)[k-1].id
                    }))
                   console.log({
                        description: value,
                        name: section_name,
                        section_id: section_id,
                        number: k-1
                   })
                }
                else {
                    dispatch(addTutorialPage({
                        description: value,
                        section_id: section_id,
                        number: tutorial_pages.tutorialPages.length,
                        id: (tutorial_pages.tutorialPages.length + 1).toString()
                    }))
    
                    console.log({
                        description: value,
                        name: section_name,
                        section_id: section_id,
                        number: tutorial_pages.tutorialPages.length
                   })
                }
            }
            console.log(tutorial_pages.tutorialPages)
            setCheckAfterCreate(true)

            toast.update(idx, { render: "Điều chỉnh thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
        }
    }

    
    return (
        promiseInProgress ?
      <div className="loader"></div> :<Fragment>
            <ToastContainer />
            {
                function () {
                    if ((lessons.modificationState === LessonModificationStatus.Remove)) {
                        return (
                            <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (tutorial_pages !== null){
                                                    if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                                                        toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                                                            position: toast.POSITION.TOP_CENTER,
                                                            autoClose: 1000,
                                                        });
                                                    }
                                                    else if (checkCreateNew === true  && currentPage !== totalPage) {
                                                        toast.warning("Vui lòng lưu bước trước khi thực hiện!", {
                                                            position: toast.POSITION.TOP_CENTER,
                                                            autoClose: 1000,
                                                        });
                                                    }
                                                    else {
                                                        const k = currentPage;
                                                        let x = totalPage - 1;
                                                        setTotalPage(x)
                                        
                                                        setCurrentPageOld(k-2)
                                            
                                                        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                            position: toast.POSITION.TOP_CENTER
                                                        });
                                                        if (k === tutorial_pages.tutorialPages.length) {
                                                            let y = k - 1;
                                                            setCurrentPage(y)
                                                            dispatch(removeTutorialPage(tutorial_pages.tutorialPages[k-1].id))
                                                            handleBackPage()
                                                        }
                                                        else {
                                                            tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                                                                if (k -1 === ele.number) {
                                                                    dispatch(removeTutorialPage(ele.id));
                                                                }
                                                                else if (ele.number > k - 1 ) {
                                                                    dispatch(editTutorialPage({
                                                                        id: ele.id,
                                                                        description: ele.description,
                                                                        section_id: section_id,
                                                                        number: ele.number - 1
                                                                    }))
                                                                }
                                                                return 2
                                                            })
                                                            handleBackPage()
                                                        }
                                                        toast.update(idx, { render: "Xóa bước thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                                                    }
                                                }
                                                setPopup(false);
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        )
                    }
                }()
            }
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Buổi {section_number}</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            
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
                                                <div className="col-xl-5 col-md-5 col-xs-5">
                                                    <button type="button" className="btn btn-info right-margin" onClick={handleSave}>Lưu tạm</button>
                                                    <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                                                </div>
                                                <div className="col-xl-7 col-md-7 col-xs-7">
                                                    <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                </div>
                                            </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row">
                                                    <div className="col-xl-5 col-md-5 col-xs-5">
                                                        <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                                        <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
                                                        <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                                                    </div>
                                                    <div className="col-xl-7 col-md-7 col-xs-7">
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
                                        if (totalPage == 1) {
                                            return (
                                                <div className="row">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                
                                                    <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
                                                    <button type="button" className={`btn btn-primary left-margin ml-2 step-continue`} onClick={saveForm}>Hoàn thành</button>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                </div>
                                            </div>
                                            )
                                        }
                                        else {
                                            if (tutorial_pages.tutorialPages.length == totalPage) {
                                                return (
                                                    <div className="row">
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                        <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                                            <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
                                                            <button type="button" className={`btn btn-primary left-margin ml-2 step-continue`} onClick={saveForm}>Hoàn thành</button>
                                                        </div>
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <button type="button" className="btn btn-error right-margin add-step btn-remove ml-2" onClick={handleRemove}>Xóa bước</button>
                                                            <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div className="row">
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                        <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                                            <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
                                                            <button type="button" className={`btn btn-primary left-margin ml-2 step-continue`} onClick={saveForm}>Hoàn thành</button>
                                                        </div>
                                                        <div className="col-xl-6 col-md-6 col-xs-6">
                                                            <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            
                                        }
                                        
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
