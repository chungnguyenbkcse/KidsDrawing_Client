import React, { useState, Dispatch, Fragment, useEffect, ChangeEvent } from "react";
import { IStateType, IRootPageStateType, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import { clearSelectedSectionTemplate, setModificationStateSectionTemplate, addSectionTemplate } from "../../store/actions/section_template.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import Editor from "../../common/components/Quill/EditorSectionTemplate";
import { ICourse } from "../../store/models/course.interface";
import { postSectionTemplate } from "../../common/service/SectionTemplate/PostSectionTemplate";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
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
    course = { id: "", name: "", description: "", max_participant: 0, num_of_section: 0, price: 0, image_url: "", is_enabled: false, creator_id: "", art_age_id: "", art_level_id: "", art_type_id: "", create_time: "", update_time: "" };
  }

  var course_id = localStorage.getItem('course_id');

  useEffect(() => {
    dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
  }, [path.area, dispatch, course_id]);



  let section_template: ISectionTemplate = { id: "", name: "", creator_id: "", course_id: "", number: 0, teaching_form: false, create_time: "", update_time: "" };

  const [contentTutorialSection, setContentTutorialSection] = useState<TutorialSectionTemplate[]>([])
  const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [numberSection, setNumberSection] = useState<number>(1)

  const [error, setError] = useState("");
  const [htmlClass, setHtmlClass] = useState("");
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  console.log(value)
  console.log(currentPage)


  function onValueChanged(event: ChangeEvent<HTMLSelectElement>): void {
    let [error, validClass, elementValue] = ["", "", event.target.value];

    [error, validClass] = (!elementValue) ?
      ["Value has to be selected", "is-invalid"] : ["", "is-valid"];
    setError(error);
    setHtmlClass(validClass);
    setValue(parseInt(elementValue));
    setCurrentPage(0)
  }

  console.log(numberSection)
  const history = useHistory();

  function routeHome() {
    let path = `/courses`;
    history.push(path);
  }


  function saveUser(): void {
    let saveUserFn: Function = addSectionTemplate;

    saveForm(saveUserFn, contentTutorialSection);
  }

  const [textHtml, setTextHtml] = useState<string>("")
  function getValue(value: string) {
    setTextHtml(value);
  }

  function saveForm(saveFn: Function, contentTutorialSections: TutorialSectionTemplate[]): void {
    if (section_template) {
      const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });

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

      let res = [...contentTutorialSections, contentSection];

      console.log(res)

      if (saveFn === addSectionTemplate && course !== null) {
        res.map((contentSection) => {
          return dispatch(postSectionTemplate(contentSection.tutorial, {
            name: contentSection.name,
            number: contentSection.number,
            teaching_form: contentSection.teaching_form,
            course_id: course_id,
            creator_id: localStorage.getItem('id')
          }, id))
        })
      } 

      dispatch(clearSelectedSectionTemplate());
      dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
      toast.update(id, { render: "Thêm trình độ thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
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
    setHtmlClass("")
    setValue(0)
    setHtmlClass1("")
    setHtmlClass2("")
    setValue1("")
    setValue2("")
    setCurrentPage(0)
    setContentTutorialPage([])
  }



  const getOptions: (JSX.Element | null)[] = listTotalPage.map((option: any, index: number) => {
    return (
      <option key={index} value={option.value}>{option.name}</option>
    )
  });


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


  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (value === 0 && textHtml === "") as boolean;
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
                  <label htmlFor={`input_total_page`}>Số trang</label>
                  <select
                    value={value}
                    id={`input_total_page`}
                    className={`form-control ${htmlClass}`}
                    onChange={onValueChanged}>
                    <option value={0}>Choose...</option>
                    {getOptions}
                  </select>

                  {error ?
                    <div className="invalid-feedback">
                      {error}
                    </div> : null
                  }
                </div>
              </div>
              {
                function () {
                  if (value > 1 && value - 1 > currentPage) {
                    return (
                      <>
                        <div className="form-group">
                          <label>Nội dung trang {currentPage + 1}</label>
                          <Editor getValue={getValue} isCreate={textHtml} setValue={text} />
                        </div>
                        <div className="form-group">
                          <button type="button" className="btn btn-info right-margin ml-2" onClick={handleNextPage}>Trang tiếp theo</button>
                        </div>
                      </>
                    )
                  }

                  else if (value - 1 === currentPage || value === 1) {
                    return (
                      <div className="form-group">
                        <label>Nội dung trang {currentPage + 1}</label>
                        <Editor getValue={getValue} isCreate={textHtml} setValue={text} />
                      </div>
                    )
                  }
                }()
              }

              {
                function () {
                  if (course && (numberSection < number_of_sum)) {
                    return (
                      <button type="button" className={`btn btn-primary left-margin ml-2`} onClick={handleNextSection}>Buổi tiếp theo</button>
                    )
                  }
                  else if (course && (numberSection === number_of_sum)) {
                    return (
                      <button type="button" className={`btn btn-success left-right  ${getDisabledClass()}`} onClick={() => {saveUser()}}>Hoàn thành</button>
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
