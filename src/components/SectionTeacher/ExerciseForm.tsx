import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Editor } from "../../common/components/Quill/EditorSection";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import TextInput from "../../common/components/TextInput";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { logout } from "../../store/actions/account.actions";
import { ISectionState, IStateType, ITutorialPageState, IUserState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

type Options = {
    name: string;
    value: any;
}

const ExerciseForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const TutorialPages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);

    const [count, setCount] = useState(1);

    const [textHtml, setTextHtml] = useState<string>("")
    function getValue(value: string) {
        setTextHtml(value);
    }

    const { promiseInProgress } = usePromiseTracker();

    function setChangeCount() {
        let x = count;
        let y = x + 1;
        if (x < TutorialPages.tutorialPages.length){
            console.log("Count")
            setCount(y);
        }
        console.log(count)
    }

    function setChangeCountBack() {
        let x = count;
        let y = x -1;
        if (x > 1){
            setCount(y);
        }
    }


    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
    }

    var id_y = localStorage.getItem('section_id');
    
    let section_id = 0;

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
                    trackPromise(getSectionById(dispatch, section_id))
                    trackPromise(getTutorialPageBySection(dispatch, section_id))
                }
            }
            else {
                trackPromise(getSectionById(dispatch, section_id))
                trackPromise(getTutorialPageBySection(dispatch, section_id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/class/exercise-student'; 
        history.push({
            pathname: path,
        });
    }

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
        promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> : <Fragment>
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
                                                <TextInput id="input_name"
                                                    value={sections.sections.length > 0 ? sections.sections[0].name : ""}
                                                    field="name"
                                                    onChange={() => {}}
                                                    required={true}
                                                    maxLength={2000}
                                                    label="Tên"
                                                    placeholder="" 
                                                />
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <div className="col-xl-6 col-md-6 col-xs-6">
                                                <SelectKeyValue
                                                    id="input_teaching_form"
                                                    field="teaching_form"
                                                    label="Hình thức dạy"
                                                    options={listTeachingForm}
                                                    required={true}
                                                    onChange={() => {}}
                                                    value={sections.sections.length > 0 ? sections.sections[0].teach_form : 0}
                                                />
                                            </div>
                                            <div className="col-xl-6 col-md-6 col-xs-6">
                                                <SelectKeyValueNotField
                                                    value={TutorialPages.tutorialPages.length}
                                                    id="input_total_page"
                                                    onChange={() => {}}
                                                    required={true}
                                                    label="Số trang"
                                                    options={listTotalPage}
                                                />
                                            </div>
                                        </div>

                                        <div className="row no-gutters">
                                            <label>Nội dung trang</label>
                                            <Editor getValue={getValue} isCreate="{textHtml}" setValue={TutorialPages.tutorialPages.length === 0 ? "" : TutorialPages.tutorialPages[count-1].description} />
                                            {
                                                function () {
                                                    if (count < TutorialPages.tutorialPages.length) {
                                                        if (count === 1){
                                                            return (
                                                                <button className={`btn btn-success left-margin`} onClick={() => {setChangeCount()}}>Trang tiếp</button>
                                                            )
                                                        }
                                                        else if (count > 1){
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

export default ExerciseForm;
