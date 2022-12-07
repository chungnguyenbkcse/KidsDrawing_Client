import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionState, IUserRegisterTutorialPageState, IRootPageStateType } from "../../store/models/root.interface";
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
import { getTutorialPageByTutorialId } from "../../common/service/TutorialPage/GetTutorialPageByTutorialId";
import { postUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/PostUserRegisterTutorial";
import { addUserRegisterTutorialPage, editUserRegisterTutorialPage, removeUserRegisterTutorialPage } from "../../store/actions/user_register_tutorial_page.action";
import { getUserRegisterTutorialPage } from "../../common/service/UserRegisterTutorialPage/GetUserRegisterTutorialPageByUserRegisterTutorialId";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { deleteUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/DeleteUserRegisterTutorial";
import { deleteUserRegisterTutorial1 } from "../../common/service/UserRegisterTutorial/DeleteUserRegisterTutorial1";


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
    user_register_tutorial_id: number;
    name: string;
    number: number;
    description: string;
}

function EditSectionTeacher1(props: SectionListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);
    const user_register_tutorial_pages: IUserRegisterTutorialPageState | null = useSelector((state: IStateType) => state.user_register_tutorial_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    console.log(user_register_tutorial_pages.user_register_tutorial_pages)
    let section: ISection | null = sections.selectedSection;

    const [checked, setChecked] = useState(false);

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



    var id_t = localStorage.getItem('user_register_tutorial_id');
    let user_register_tutorial_id: number = 0;
    if (id_t !== null) {
        user_register_tutorial_id = parseInt(id_t)
    }

    var id_h = localStorage.getItem('user_register_tutorial_name');
    let user_register_tutorial_name: string = "";
    if (id_h !== null) {
        user_register_tutorial_name = id_h
    }

    var id_k = localStorage.getItem('id');
    let id: number = 0;
    if (id_k !== null) {
        id = parseInt(id_k);
    }

    const { promiseInProgress } = usePromiseTracker();

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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getUserRegisterTutorialPage(dispatch, user_register_tutorial_id))      
                }
            }
            else {
                trackPromise(getUserRegisterTutorialPage(dispatch, user_register_tutorial_id)) 
            }
        }
    }, [dispatch, access_token, refresh_token, user_register_tutorial_id])

    const history = useHistory();
    function routeHome() {
        let path = `/classes/section`;
        history.push(path);
    }

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [textHtml, setTextHtml] = useState("");

    useEffect(() => {
        if (user_register_tutorial_pages.user_register_tutorial_pages.length > 0) {
            setTextHtml(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[currentPage-1].description)
        }
    }, [user_register_tutorial_pages])

    if (!section) {
        section = { id: 0, total_exercise_not_submit: 0, name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "", teacher_name: "" };
    }

    console.log(user_register_tutorial_pages.user_register_tutorial_pages)
    if (user_register_tutorial_pages.user_register_tutorial_pages.length === 0) {
        section = { id: 0, total_exercise_not_submit: 0, name: "", number: 0,  class_id: 0, teach_form: false, recording: "", message: "", teacher_name: "" };
    }


    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
    }, [path.area, dispatch]);


    const [formState, setFormState] = useState({
        name: { error: "", value: user_register_tutorial_name},
        number: { error: "", value: section.number },
        teach_form: { error: "", value: section.teach_form },
        class_id: { error: "", value: section.class_id },
        recording: { error: "", value: section.recording },
        message: { error: "", value: section.message }
    });

    console.log(user_register_tutorial_pages.user_register_tutorial_pages)

    const [totalPage, setTotalPage] = useState(user_register_tutorial_pages.user_register_tutorial_pages.length);
    useEffect(() => {
        setTotalPage(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number).length > 0 ? user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number).length : 0)
    }, [user_register_tutorial_pages])
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
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
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
                if (user_register_tutorial_pages !== null) {
                    dispatch(deleteUserRegisterTutorial1(user_register_tutorial_id, idx))
                    dispatch(postUserRegisterTutorial(user_register_tutorial_pages.user_register_tutorial_pages, {
                        section_id: section_id,
                        creator_id: id,
                        name: formState.name.value,
                        status: "Not approve now"
                    }, idx, routeHome))
                }
            }
        }
    }


    function handleNextPage() {  
        if (user_register_tutorial_pages !== null) {
            if (checkCreateNew === true || (currentPage === totalPage && checkAfterCreate === false)) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
                });
            }
            else {
                if (checkAfterCreate === true) {
                    let x = currentPage + 1;
                    setCurrentPageOld(x-1)
                    setCurrentPage(x)
                    console.log(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number))
                    setTextHtml(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[x-1] !== undefined ? user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[x-1].description : "")
                    setChecked(false)
                    setValue("")
                    setCheckAfterCreate(false);
                }
                else {
                    let x = currentPage + 1;
                    setCurrentPage(x)
                    console.log(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number))
                    setTextHtml(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[x-1] !== undefined ? user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[x-1].description : "")
                    setChecked(false)
                    setValue("")
                }
            }
        }     
    }

    function handleBackPage () {
        if (user_register_tutorial_pages !== null) {
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
                });
            }
            else {
                let x = currentPage - 1;
                setCurrentPageOld(x-1)
                setCurrentPage(x)
                console.log(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number))
                setTextHtml(user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[x-1].description)
                setChecked(false)
                setValue("")
            }
        }     
    }


    function handleRemove() {
        if (user_register_tutorial_pages !== null){
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
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
                if (k === user_register_tutorial_pages.user_register_tutorial_pages.length) {
                    let y = k - 1;
                    setCurrentPage(y)
                    dispatch(removeUserRegisterTutorialPage(user_register_tutorial_pages.user_register_tutorial_pages[k-1].id))
                    handleBackPage()
                }
                else {
                    user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                        if (k -1 === ele.number) {
                            dispatch(removeUserRegisterTutorialPage(ele.id));
                        }
                        else if (ele.number > k - 1 ) {
                            dispatch(editUserRegisterTutorialPage({
                                id: ele.id,
                                description: ele.description,
                                name: ele.name,
                                user_register_tutorial_id: user_register_tutorial_id,
                                number: ele.number - 1
                            }))
                        }
                        return 2
                    })
                    handleBackPage()
                }
                toast.update(idx, { render: "Xóa bước thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }
    }

    console.log('CurrentPage', currentPage);
    console.log('OldPage', currentPageOld)



    function handleNewPage() {
        if (totalPage === totalPage && checkEndCreate === false) {
            toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: true,
            });
        }else {
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: true,
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
        if (user_register_tutorial_pages !== null){
            const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            const k = currentPage;

            if (checkCreateNew === true) {
                if (k - 1 === user_register_tutorial_pages.user_register_tutorial_pages.length) {
                    console.log('yyy')
                    dispatch(addUserRegisterTutorialPage({
                        description: value,
                        name: formState.name.value,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: user_register_tutorial_pages.user_register_tutorial_pages.length,
                        id: (user_register_tutorial_pages.user_register_tutorial_pages.length + 1).toString()
                    }))
                }
                else {
                    console.log('xxx')
                    user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                        if (ele.number === k -1) {
                            console.log('1')
                            dispatch(editUserRegisterTutorialPage({
                                description: ele.description,
                                name: ele.name,
                                user_register_tutorial_id: user_register_tutorial_id,
                                number: ele.number + 1,
                                id: ele.id
                            }))
                            dispatch(addUserRegisterTutorialPage({
                                description: value,
                                name: formState.name.value,
                                user_register_tutorial_id: user_register_tutorial_id,
                                number: ele.number,
                                id: (user_register_tutorial_pages.user_register_tutorial_pages.length + 1).toString()
                            }))
                        }
                        else if (ele.number > k - 1) {
                            console.log('2')
                            if (ele.number < user_register_tutorial_pages.user_register_tutorial_pages.length - 1) {
                                dispatch(editUserRegisterTutorialPage({
                                    description: ele.description,
                                    name: ele.name,
                                    user_register_tutorial_id: user_register_tutorial_id,
                                    number: ele.number + 1,
                                    id: ele.id
                                }))
                            }
                            else {
                                dispatch(editUserRegisterTutorialPage({
                                    description: ele.description,
                                    name: ele.name,
                                    user_register_tutorial_id: user_register_tutorial_id,
                                    number: ele.number + 1,
                                    id: ele.id
                                }))
                            }
                        }
                        return 1
                    })

                    /* dispatch(addUserRegisterTutorialPage({
                        description: value,
                        name: formState.name.value,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: k - 1,
                        id: (user_register_tutorial_pages.user_register_tutorial_pages.length + 1).toString()
                    })) */
                }
                setCheckCreateNew(false)
            }
            else {
                if (k < user_register_tutorial_pages.user_register_tutorial_pages.length + 1) {
                    dispatch(editUserRegisterTutorialPage({
                        description: value,
                        name: user_register_tutorial_name,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: k-1,
                        id: user_register_tutorial_pages.user_register_tutorial_pages.sort((a, b) => a.number - b.number)[k-1].id
                    }))
                   console.log({
                        description: value,
                        name: user_register_tutorial_name,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: k-1
                   })
                }
                else {
                    dispatch(addUserRegisterTutorialPage({
                        description: value,
                        name: formState.name.value,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: user_register_tutorial_pages.user_register_tutorial_pages.length,
                        id: (user_register_tutorial_pages.user_register_tutorial_pages.length + 1).toString()
                    }))
    
                    console.log({
                        description: value,
                        name: user_register_tutorial_name,
                        user_register_tutorial_id: user_register_tutorial_id,
                        number: user_register_tutorial_pages.user_register_tutorial_pages.length
                   })
                }
            }
            console.log(user_register_tutorial_pages.user_register_tutorial_pages)
            setCheckAfterCreate(true)

            toast.update(idx, { render: "Điều chỉnh thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    }

    
    return (
        promiseInProgress ? <div className="loader"></div> : <Fragment>
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
                                                    <button type="button" className="btn btn-info right-margin" onClick={handleSave}>Lưu tạm</button>
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
                                                        <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
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
                                                    <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu tạm</button>
                                                    <button type="button" className={`btn btn-primary left-margin ml-2 step-continue`} onClick={saveForm}>Hoàn thành</button>
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
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

export default EditSectionTeacher1;
