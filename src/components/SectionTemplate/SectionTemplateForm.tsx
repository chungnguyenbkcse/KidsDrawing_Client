import React, { useState, FormEvent, Dispatch, Fragment, useEffect, ChangeEvent } from "react";
import { IStateType, ISectionTemplateState, ITutorialTemplatePageState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate } from "../../store/models/section_template.interface";
import TextInput from "../../common/components/TextInput";
import { OnChangeModel } from "../../common/types/Form.types";
import Editor from "../../common/components/Quill/EditorEditSection";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { toast, ToastContainer } from "react-toastify";
import { putTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PutTutorialTemplatePage";
import { postTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/PostTutorialTemplatePage";


import { deleteTutorialTemplatePage } from "../../common/service/TutorialTemplatePage/DeleteTutorialTemplatePage";
import "./SectionTemplate.css"
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getTutorialTemplatePageByTutorialTemplateId } from "../../common/service/TutorialTemplatePage/GetTutorialTemplatePageByTutorialTemplateId";
import { postTutorialTemplatePage1 } from "../../common/service/TutorialTemplatePage/PostTutorialTemplatePage1";
import { putTutorialTemplatePage1 } from "../../common/service/TutorialTemplatePage/PutTutorialTemplatePage1";
import { postSectionTemplate } from "../../common/service/SectionTemplate/PostSectionTemplate";
import { putSectionTemplate } from "../../common/service/SectionTemplate/PutSectionTemplate";
import { getSectionTemplate } from "../../common/service/SectionTemplate/GetSectionTemplate";


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
    id: string;
    tutorial_template_id: string;
    name: string;
    number: number;
    description: string;
}

function SectionTemplateForm(props: SectionTemplateListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const section_templates: ISectionTemplateState | null = useSelector((state: IStateType) => state.section_templates);
    const tutorial_template_pages: ITutorialTemplatePageState | null = useSelector((state: IStateType) => state.tutorial_template_pages);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    console.log(tutorial_template_pages.tutorialTemplatePages)
    let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;

    const [checked, setChecked] = useState(false);

    var id_x = localStorage.getItem('section_template_id');
    let section_template_id: string = "";
    if (id_x !== null) {
        section_template_id = id_x
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
        initial_text = list_description.length !== 0 ? list_description[0].description : "";
    }


    var id_t = localStorage.getItem('tutorial_template_id');
    let tutorial_template_id: string = "";
    if (id_t !== null) {
        tutorial_template_id = id_t
    }

    var id_h = localStorage.getItem('tutorial_name');
    let tutorial_name: string = "";
    if (id_h !== null) {
        tutorial_name = id_h
    }

    var id_k = localStorage.getItem('teaching_form');
    let teaching_form: string = "";
    if (id_k !== null) {
        teaching_form = id_k
    }


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
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
                    dispatch(getTutorialTemplatePageByTutorialTemplateId(tutorial_template_id))
                }
            }
            else {
                dispatch(getTutorialTemplatePageByTutorialTemplateId(tutorial_template_id))
            }
        }
    }, [dispatch, access_token, refresh_token, tutorial_template_id])

    let [textHtml, setTextHtml] = useState(initial_text);

    if (!section_template) {
        section_template = { id: "", name: "", creator_id: "", course_id: "", number: 0, teaching_form: false, create_time: "", update_time: "" };
    }

    console.log(tutorial_template_pages.tutorialTemplatePages)
    if (tutorial_template_pages.tutorialTemplatePages.length === 0) {
        section_template = { id: "", name: "", creator_id: "", course_id: "", number: 0, teaching_form: false, create_time: "", update_time: "" };
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
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [value, setValue] = useState("")

    const [checkCreateNew, setCheckCreateNew] = useState(false);
    const [checkAfterCreate, setCheckAfterCreate] = useState(false);

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    //console.log(totalPage)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        handleSave()
    }

    function handleRemove() {
        if (tutorial_template_pages !== null) {
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            else {
                const k = currentPage;
                let x = totalPage - 1;
                setTotalPage(x)

                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                    position: toast.POSITION.TOP_CENTER
                });
                if (k === tutorial_template_pages.tutorialTemplatePages.length) {
                    let y = k - 1;
                    setCurrentPage(y)
                    dispatch(deleteTutorialTemplatePage(tutorial_template_pages.tutorialTemplatePages[k - 1].id))
                    handleBackPage()
                }
                else {
                    tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                        if (k - 1 === ele.number) {
                            dispatch(deleteTutorialTemplatePage(ele.id));
                        }
                        else if (ele.number > k - 1) {
                            dispatch(putTutorialTemplatePage1(ele.id, {
                                description: ele.description,
                                name: ele.name,
                                tutorial_template_id: tutorial_template_id,
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

    function handleSave() {
        if (tutorial_template_pages !== null) {
            const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });
            const k = currentPage;

            dispatch(putSectionTemplate(section_template_id, {
                name: formState.name.value,
                teaching_form: value2 === "true" ? true : false,
                number: section_number,
                creator_id: localStorage.getItem('id'),
                course_id: localStorage.getItem('course_id')
            }))

            if (checkCreateNew === true) {
                if (k - 1 === tutorial_template_pages.tutorialTemplatePages.length) {
                    dispatch(postTutorialTemplatePage1({
                        description: value,
                        name: formState.name.value,
                        tutorial_template_id: tutorial_template_id,
                        number: tutorial_template_pages.tutorialTemplatePages.length
                    }, idx))
                }
                else {
                    tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number).map((ele, idx) => {
                        if (ele.number === k - 1) {
                            console.log('1')
                            dispatch(putTutorialTemplatePage1(ele.id, {
                                description: ele.description,
                                name: ele.name,
                                tutorial_template_id: tutorial_template_id,
                                number: ele.number + 1
                            }))
                            dispatch(postTutorialTemplatePage1({
                                description: value,
                                name: formState.name.value,
                                tutorial_template_id: tutorial_template_id,
                                number: ele.number
                            }, idx))
                        }
                        else if (ele.number > k - 1) {
                            if (ele.number < tutorial_template_pages.tutorialTemplatePages.length - 1) {
                                console.log('2')
                                dispatch(putTutorialTemplatePage1(ele.id, {
                                    description: ele.description,
                                    name: ele.name,
                                    tutorial_template_id: tutorial_template_id,
                                    number: ele.number + 1
                                }))
                            }
                            else {
                                dispatch(putTutorialTemplatePage(ele.id, {
                                    description: ele.description,
                                    name: ele.name,
                                    tutorial_template_id: tutorial_template_id,
                                    number: ele.number + 1
                                }, idx))
                            }
                        }
                        return 1
                    })

                    /* dispatch(postTutorialTemplatePage({
                        description: value,
                        name: formState.name.value,
                        tutorial_template_id: tutorial_template_id,
                        number: k - 1
                    })) */
                }
                setCheckCreateNew(false)
            }
            else {
                if (k < tutorial_template_pages.tutorialTemplatePages.length + 1) {
                    dispatch(putTutorialTemplatePage(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[k - 1].id, {
                        description: value,
                        name: tutorial_name,
                        tutorial_template_id: tutorial_template_id,
                        number: k - 1
                    }, idx))
                    console.log({
                        description: value,
                        name: tutorial_name,
                        tutorial_template_id: tutorial_template_id,
                        number: k - 1
                    })
                }
                else {
                    dispatch(postTutorialTemplatePage1({
                        description: value,
                        name: formState.name.value,
                        tutorial_template_id: tutorial_template_id,
                        number: tutorial_template_pages.tutorialTemplatePages.length
                    }, idx))

                    console.log({
                        description: value,
                        name: tutorial_name,
                        tutorial_template_id: tutorial_template_id,
                        number: tutorial_template_pages.tutorialTemplatePages.length
                    })
                }
            }
            setCheckAfterCreate(true)

            toast.update(idx, { render: "Điều chỉnh thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }
    }


    function handleNextPage() {
        if (tutorial_template_pages !== null) {
            if (checkCreateNew === true || (currentPage === totalPage && checkAfterCreate === false)) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            else {
                if (checkAfterCreate === true) {
                    let x = currentPage + 1;
                    setCurrentPage(x)
                    console.log(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number))
                    setTextHtml(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[x - 1] !== undefined ? tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[x - 1].description : "")
                    setChecked(false)
                    setValue("")
                    setCheckAfterCreate(false);
                }
                else {
                    let x = currentPage + 1;
                    setCurrentPage(x)
                    console.log(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number))
                    setTextHtml(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[x - 1] !== undefined ? tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[x - 1].description : "")
                    setChecked(false)
                    setValue("")
                }
            }
        }
    }



    function getValue(value: any) {
        setValue(value);
        setChecked(true)
    }

    console.log(checkCreateNew)
    console.log(checkAfterCreate)
    function handleBackPage() {
        if (tutorial_template_pages !== null) {
            if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            else if (checkCreateNew === true  && currentPage !== totalPage) {
                toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            else {
                let x = currentPage - 1;
                setCurrentPage(x)
                console.log(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number))
                setTextHtml(tutorial_template_pages.tutorialTemplatePages.sort((a, b) => a.number - b.number)[x - 1].description)
                setChecked(false)
                setValue("")
            }
        }
    }



    function handleNewPage() {
        if (checkCreateNew === true  && currentPage === totalPage && checkAfterCreate === false) {
            toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        else if (checkCreateNew === true  && currentPage !== totalPage) {
            toast.warning("Vui lòng lưu bước trước khi chuyển bước!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        else {
            let x = currentPage + 1;
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
    const listTeachingForm: Options[] = [
        {
            "name": "Dạy thông qua Jitsi",
            "value": "true"
        },
        {
            "name": "Tự đọc giáo trình",
            "value": "false"
        }
    ]

    const [error2, setError2] = useState("");
    const [htmlClass2, setHtmlClass2] = useState("");
    const [value2, setValue2] = useState(teaching_form);


    function onValueChanged2(event: ChangeEvent<HTMLSelectElement>): void {
        let [error2, validClass2, elementValue2] = ["", "", event.target.value];

        [error2, validClass2] = (!elementValue2) ?
            ["Value has to be selected", "is-invalid"] : ["", "is-valid"];

        setError2(error2);
        setHtmlClass2(validClass2);
        setValue2(elementValue2);
    }


    const getOptions2: (JSX.Element | null)[] = listTeachingForm.map((option: any, index: number) => {
        return (
            <option key={index} value={option.value}>{option.name}</option>
        )
    });


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
                                <div className="form-group col-md-6">
                                    <label htmlFor={`input_teaching_form`}>Hình thức dạy</label>
                                    <select
                                        value={value2}
                                        id={`input_teaching_form`}
                                        className={`form-control  ${htmlClass2}`}
                                        onChange={onValueChanged2}>
                                        <option value={0}>Choose...</option>
                                        {getOptions2}
                                    </select>

                                    {error2 ?
                                        <div className="invalid-feedback">
                                            {error2}
                                        </div> : null
                                    }
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
                                                        <button type="button" className="btn btn-info right-margin" onClick={handleSave}>Lưu</button>
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
                                                        <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSave}>Lưu</button>
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
                                        if (totalPage === 1) {
                                            return (
                                                <div className="row">
                                                    <div className="col-xl-6 col-md-6 col-xs-6">
                                                        <button type="submit" className={`btn btn-primary left-margin ml-2`}>Hoàn thành</button>
                                                    </div>
                                                    <div className="col-xl-6 col-md-6 col-xs-6">
                                                        <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {

                                        }
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