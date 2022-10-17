import React, { useState, Dispatch, Fragment, useEffect, ChangeEvent } from "react";
import { IStateType, IRootPageStateType, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import Editor from "../../common/components/Quill/EditorSectionTemplate";
import { ICourse } from "../../store/models/course.interface";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel } from "../../common/types/Form.types";
import { postTutorialTemplatePage1 } from "../../common/service/TutorialTemplatePage/PostTutorialTemplatePage1";
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

const LessonPlan: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  let course: ICourse | null = courses.selectedCourse;

  var id_x = localStorage.getItem('number_of_sum');
  let number_of_sum: number = 0;
  if (id_x !== null) {
    number_of_sum = parseInt(id_x)
  }


  if (!course) {
    course = { id: "", name: "", description: "", max_participant: 0, num_of_section: 0, price: 0, image_url: "", is_enabled: false, creator_id: "", art_age_id: "", art_level_id: "", art_type_id: "", create_time: "", update_time: "", art_age_name: "", art_level_name: "", art_type_name: "", checked_tutoral: false };
  }

  var course_id = localStorage.getItem('course_id');

  var id_t = localStorage.getItem('tutorial_template_id');
  let tutorial_template_id: string = "";
  if (id_t !== null) {
      tutorial_template_id = id_t
  }

  var id_y = localStorage.getItem('num_of_section');
  let num_of_section: number = 0;
  if (id_y !== null) {
    num_of_section = parseInt(id_y)
  }

  useEffect(() => {
    dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
  }, [path.area, dispatch, course_id]);




  const [contentTutorialSection, setContentTutorialSection] = useState<TutorialSectionTemplate[]>([])
  const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [numberSection, setNumberSection] = useState<number>(1)

  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  console.log(value)
  console.log(currentPage)

  const [formState, setFormState] = useState({
    total_page: { error: "", value: 0 },
  })

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    setValue(model.value);
  }


  console.log(numberSection)
  const history = useHistory();

  function routeHome() {
    let path = `/courses`;
    history.push(path);
  }

  function handleSaveStep () {
    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });

    if (numberSection === num_of_section) {
      dispatch(postTutorialTemplatePage1({
        description: value,
        name: value1,
        tutorial_template_id: tutorial_template_id,
        number: currentPage
      }, idx))

      setTimeout(() =>
        routeHome()
      , 2000)
    }
    else {
      dispatch(postTutorialTemplatePage1({
        description: value,
        name: value1,
        tutorial_template_id: tutorial_template_id,
        number: currentPage
      }, idx))
    }
  }

  const [textHtml, setTextHtml] = useState<string>("")
  function getValue(value: string) {
    setTextHtml(value);
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

  function handleNextPage() {
    let contentPage: PageContent = {
      page: currentPage,
      content: textHtml
    }
    setContentTutorialPage([...contentTutorialPage, contentPage])
    let x = currentPage + 1
    setCurrentPage(x)
    setTextHtml("")
    setText("")
  }


  function handleNextSection() {
    if (value !== 0) {
      let contentPage: PageContent = {
        page: currentPage,
        content: textHtml
      }
      let contentSection: TutorialSectionTemplate = {
        number: numberSection,
        name: value1,
        teaching_form: value2 === "true" ? true : false,
        tutorial: [...contentTutorialPage, contentPage]
      }
      setContentTutorialSection([...contentTutorialSection, contentSection])
  
      let y = numberSection + 1;
      setNumberSection(y)
  
      setTextHtml("")
      setValue(0)
      setHtmlClass1("")
      setHtmlClass2("")
      setValue1("")
      setValue2("")
      setCurrentPage(0)
      setContentTutorialPage([])
    }
  }



  const [error1, setError1] = useState("");
  const [htmlClass1, setHtmlClass1] = useState("");
  const [value1, setValue1] = useState("");


  function onValueChanged1(event: ChangeEvent<HTMLInputElement>): void {
    let [error1, validClass1, elementValue1] = ["", "", event.target.value];

    [error1, validClass1] = (!elementValue1) ?
      ["Value cannot be empty", "is-invalid"] : ["", "is-valid"];

    setError1(error1);
    setHtmlClass1(validClass1);
    setValue1(elementValue1);
  }


  const [error2, setError2] = useState("");
  const [htmlClass2, setHtmlClass2] = useState("");
  const [value2, setValue2] = useState("");


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

  function handleBackPage() {

  }

  function handleRemove() {

  }

  function handleNewPage() {

  }


  return (
    <Fragment>
      <ToastContainer />
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Buổi {numberSection}</h6>
          </div>
          <div className="card-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <div>
                    <label htmlFor="input_name">Tiêu đề buổi học</label>
                    <input
                      value={value1}
                      type="text"
                      onChange={onValueChanged1}
                      className={`form-control ${htmlClass1}`}
                      id={`id_Tiêu đề buổi học`}
                      placeholder="" />
                    {error1 ?
                      <div className="invalid-feedback">
                        {error1}
                      </div> : null
                    }
                  </div>
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
              <div className="form-row">
                <div className="form-group col-md-6">
                    <NumberInput id="input_price"
                        value={formState.total_page.value}
                        field="total_page"
                        onChange={hasFormValueChanged}
                        max={10000000}
                        min={0}
                        label="Số bước"
                    />
                </div>
              </div>
              {
                function () {
                  if (value > 1 && value - 1 > currentPage) {
                    return (
                      <>
                        <div className="form-group">
                          <label>Nội dung bước {currentPage + 1} / {value}</label>
                          <Editor getValue={getValue} isCreate={textHtml} setValue={text} />
                        </div>
                        <div className="row mt-2">
                            <div className="col-xl-4 col-md-4 col-xs-4">
                                <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                                <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSaveStep}>Lưu</button>
                                <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                            </div>
                            <div className="col-xl-8 col-md-8 col-xs-8">
                                <button type="button" className="btn btn-error right-margin add-step btn-remove ml-2" onClick={handleRemove}>Xóa bước</button>
                                <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                            </div>
                        </div>
                      </>
                    )
                  }

                  else if (value - 1 === currentPage || value === 1) {
                    return (
                      <>
                      <div className="form-group">
                        <label>Nội dung trang {currentPage + 1}</label>
                        <Editor getValue={getValue} isCreate={textHtml} setValue={text} />
                      </div>
                      <div className="row mt-2">
                      <div className="col-xl-4 col-md-4 col-xs-4">
                                <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleSaveStep}>Lưu</button>
                                <button type="button" className="btn left-margin ml-2 step-continue" onClick={handleNextPage}>Bước tiếp theo</button>
                            </div>
                            <div className="col-xl-8 col-md-8 col-xs-8">
                                <button type="button" className="btn btn-success right-margin add-step" onClick={handleNewPage}>Thêm bước</button>
                            </div>
                              
                      </div>
                    </>
                    )
                  }
                }()
              }

              {
                function () {
                  if (course && numberSection === 1){
                    return (
                      <div className="row mt-2">
                            <div className="col-xl-4 col-md-4 col-xs-4">
                                <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                            </div>
                            <div className="col-xl-8 col-md-8 col-xs-8">
                                <button type="button" className="btn btn-success right-margin add-step" onClick={handleNextSection}>Buổi tiếp theo</button>
                            </div>
                        </div>
                    )
                  }
                  else if (course && (numberSection <= number_of_sum)) {
                    return (
                      <div className="row mt-2">
                            <div className="col-xl-4 col-md-4 col-xs-4">
                                <button type="button" className="btn btn-info right-margin" onClick={handleBackPage}>Trở về</button>
                            </div>
                            <div className="col-xl-8 col-md-8 col-xs-8">
                                <button type="button" className="btn btn-success right-margin add-step" onClick={handleNextSection}>Buổi tiếp theo</button>
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

export default LessonPlan;
