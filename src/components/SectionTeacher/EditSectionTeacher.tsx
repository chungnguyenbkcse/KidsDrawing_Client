import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { ChangeEvent, Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ChartLine } from "../../common/components/CharLine";
import Editor from "../../common/components/Quill/EditorSectionTemplate";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import TextInput from "../../common/components/TextInput";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { postTutorial } from "../../common/service/Tutorial/PostTutorial";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { OnChangeModel, OnChangeModelNotFiled } from "../../common/types/Form.types";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { ISectionState, IStateType, ITutorialPageState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";

type Options = {
    name: string;
    value: any;
}

type PageContent = {
    page: number;
    content: string;
}

const EditSectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const tutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);

    const [count, setCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
    const [totalPage, setTotalPage] = useState(tutorialPages.tutorialPages.length);

    const [textHtml, setTextHtml] = useState<string>("")
    function getValue(value: string) {
        setTextHtml(value);
    }
    

    let tutorial_name = "";
    if (tutorialPages.tutorialPages.length > 0){
        tutorial_name = tutorialPages.tutorialPages[0].name
    }

    const [name, setName] = useState(tutorial_name);

    function hasFormValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value)
    }

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setTotalPage(model.value)
        setContentTutorialPage([])
    }


    function setChangeCount() {
        let contentPage: PageContent = {
            page: count + 1,
            content: textHtml
        }
        setContentTutorialPage([...contentTutorialPage, contentPage])
        setTextHtml("")
        let x = count;
        let y = x + 1;
        if (x < tutorialPages.tutorialPages.length){
            console.log("Count")
            setCount(y);
        }
    }

    console.log(`total: ${contentTutorialPage.length}`)

    contentTutorialPage.map((ele, idx) => {
        console.log(`Page: ${ele.page}`)
        console.log(`Content: ${ele.content}`)
    })

    function setChangeCountBack() {
        let x = count;
        let y = x -1;
        if (x > 1){
            setCount(y);
        }
    }


    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 1;

    if (id_y !== null) {
        section_id = parseInt(id_y);
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
                    dispatch(clearSelectedTeacherRegisterQuatification());
                    dispatch(getSectionById(section_id))
                    dispatch(getTutorialPageBySection(section_id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getSectionById(section_id))
                dispatch(getTutorialPageBySection(section_id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    const history = useHistory();
    const routeChange = () =>{ 
        const idx = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        let contentPage: PageContent = {
            page: count + 1,
            content: textHtml
        }
        setContentTutorialPage([...contentTutorialPage, contentPage])
        setTextHtml("")

        console.log([...contentTutorialPage, contentPage].length)

        dispatch(postTutorial([...contentTutorialPage, contentPage], {
            section_id: section_id,
            creator_id: id,
            name: name,
            description: ""
        }, idx))
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
    
    return (
        <Fragment>
            <ToastContainer />
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Chỉnh giáo án</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <div className="col-xl-12 col-md-12 col-xs-12">
                                            <div>
                                                <label htmlFor="name">Tên giáo trình</label>
                                                <input
                                                    value={name}
                                                    type="text"
                                                    onChange={hasFormValueChanged}
                                                    className={`form-control name`}
                                                    id={`id_name`}
                                                    placeholder="" />
                                            </div>
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-xl-6 col-md-6 col-xs-6">
                                                <SelectKeyValueNotField
                                                    value={tutorialPages.tutorialPages.length}
                                                    id="input_total_page"
                                                    onChange={hasFormValueChangedNotFiled}
                                                    required={true}
                                                    label="Số trang"
                                                    options={listTotalPage}
                                                />
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <label>Nội dung trang {count + 1}</label>
                                            <Editor getValue={getValue} isCreate={textHtml} setValue={tutorialPages.tutorialPages.length === 0 ? "" : tutorialPages.tutorialPages[count].description} />
                                            {
                                                function () {
                                                    if (count < tutorialPages.tutorialPages.length - 1) {
                                                        if (count === 0){
                                                            return (
                                                                <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                            )
                                                        }
                                                        else if (count > 0){
                                                            return (
                                                                <> 
                                                                    <button className={`btn btn-warning left-margin`} onClick={() => {setChangeCountBack()}}>Trở về</button>
                                                                    <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    }
                                                    else {
                                                        return (
                                                            <button className={`btn btn-success left-margin`} onClick={() => {routeChange()}}>Gửi</button>
                                                        )
                                                    }
                                                }()
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default EditSectionTeacher;
