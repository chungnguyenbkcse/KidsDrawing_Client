import React, { ChangeEvent, Dispatch, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Editor from "../../common/components/Quill/EditorEditSection";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { postUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/PostUserRegisterTutorial";
import {  OnChangeModelNotFiled } from "../../common/types/Form.types";

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

    const [count, setCount] = useState(0);
    const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])

    var id_t = localStorage.getItem('description_tutorial_page_list');
    let list_description: any[] = []
    let initial_text = ""
    if (id_t !== null) {
        list_description = JSON.parse(id_t);
        initial_text = list_description.length !== 0 ? list_description[0].description: "";
    }

    const [checked, setChecked] = useState(false);

    let [textHtml, setTextHtml] = useState(initial_text);

    console.log(textHtml)

    function getValue(value: string) {
        setTextHtml(value);
        setChecked(true)
    }
    
    

    function hasFormValueChanged(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value)
    }

    function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
        setContentTutorialPage([])
        setTotalPage(model.value)
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
        if (x < totalPage){
            setTextHtml(list_description[x+1].description)
            setChecked(false)
            console.log("Count")
            console.log(x)
            setCount(y);
        }
    }

    console.log(count)

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


    var id_z = localStorage.getItem('tutorial_name');
    
    let tutorial_name = "";

    if (id_z !== null) {
        tutorial_name = id_z;
    }

    const [name, setName] = useState(tutorial_name);


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

        dispatch(postUserRegisterTutorial([...contentTutorialPage, contentPage], {
            section_id: section_id,
            creator_id: id,
            name: name,
            status: "Not approved now"
        }, idx))

        setTimeout(function () {
            routeHome();
        }, 2000); 
    }

    const history = useHistory();
    function routeHome() {
        let path = `/classes/section`;
        history.push(path);
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

    const [totalPage, setTotalPage] = useState(list_description.length);
    
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
                                                    value={totalPage}
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
                                            <Editor getValue={getValue} isCreate={checked} setValue={textHtml} />
                                            {
                                                function () {
                                                    if (count < totalPage - 1) {
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
