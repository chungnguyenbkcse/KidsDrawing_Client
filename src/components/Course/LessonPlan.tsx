import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISectionTemplateState, IRootPageStateType } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import TextInput from "../../common/components/TextInput";
import { editSectionTemplate, clearSelectedSectionTemplate, setModificationStateSectionTemplate, addSectionTemplate } from "../../store/actions/section_template.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISectionTemplateFormState, OnChangeModelNotFiled } from "../../common/types/Form.types";
import { updateCurrentPath } from "../../store/actions/root.actions";
import Editor from "../../common/components/Quill/Editor";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import SelectKeyValueNotField from "../../common/components/SelectKeyValueNotField";
import { getCourse } from "../../common/service/Course/GetCourse";
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
  tutorial: PageContent[];
}

const LessonPlan: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const section_templates: ISectionTemplateState | null = useSelector((state: IStateType) => state.section_templates);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  let section_template: ISectionTemplate | null = section_templates.selectedSectionTemplate;
  const isCreate: boolean = (section_templates.modificationState === SectionTemplateModificationStatus.Create);
  useEffect(() => {
    dispatch(clearSelectedSectionTemplate());
    dispatch(updateCurrentPath("Khóa học chung", "Soạn giáo án"));
  }, [path.area, dispatch]);


  if (!section_template || isCreate) {
    section_template = { id: 0, name: "", description: "", creator_id: 0, course_id: 0, number: 0, teaching_form: false, create_time: "", update_time: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: section_template.name },
    description: { error: "", value: section_template.description },
    number: { error: "", value: section_template.number },
    teaching_form: { error: "", value: section_template.teaching_form },
    course_id: { error: "", value: section_template.course_id },
    creator_id: { error: "", value: section_template.creator_id },
    create_time: { error: "", value: section_template.create_time },
    update_time: { error: "", value: section_template.update_time }
  });

  const [totalPage, setTotalPage] = useState(0);
  const [contentTutorialSection, setContentTutorialSection] = useState<TutorialSectionTemplate[]>([])
  const [contentTutorialPage, setContentTutorialPage] = useState<PageContent[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [numberSection, setNumberSection] = useState<number>(1)

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function hasFormValueChangedNotFiled(model: OnChangeModelNotFiled): void {
    setTotalPage(model.value)
    setContentTutorialPage([])
  }

  useEffect(() => {
    if (totalPage > 0) {
      setCurrentPage(1)
    }
    else {
      setCurrentPage(0)
    }
  }, [totalPage])

  //console.log(totalPage)

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addSectionTemplate : editSectionTemplate;
    saveForm(formState, saveUserFn);
  }

  const [textHtml, setTextHtml] = useState<string>("")
  function getValue(value: string) {
    setTextHtml(value);
  }

  function saveForm(formState: ISectionTemplateFormState, saveFn: Function): void {
    if (section_template) {
      dispatch(saveFn({
        ...section_template,
        name: formState.name.value,
        description: formState.description.value,
        number: formState.number.value,
        teaching_form: formState.teaching_form.value,
        course_id: formState.course_id.value,
        creator_id: formState.creator_id.value
      }));

      dispatch(addNotification("Giáo trình ", `${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedSectionTemplate());
      dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.number.error || formState.description.error
      || formState.name.error || formState.teaching_form.error || formState.course_id.error
      || !formState.name.value || !formState.teaching_form.value) as boolean;
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
      "value": true
    },
    {
      "name": "Tự đọc giáo trình",
      "value": false
    }
  ]

  function handleNextPage() {
    let contentPage: PageContent = {
      page: currentPage,
      content: textHtml
    }
    setContentTutorialPage([...contentTutorialPage, contentPage])
    if (currentPage < totalPage){
      setCurrentPage(currentPage + 1)
    }
  }

  function handleSaveTutorialTemplate() {
    handleNextPage()
    let contentSection: TutorialSectionTemplate = {
      number: numberSection,
      tutorial: contentTutorialPage
    }
    setContentTutorialSection([...contentTutorialSection, contentSection])
  }

  console.log(contentTutorialSection)

  function handleBackSection(){
    setNumberSection(numberSection - 1)
  }

  function handleNextSection() {
    setNumberSection(numberSection + 1)
  }

  //console.log(currentPage)

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Soạn giáo trình chung</h1>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Buổi {numberSection}</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextInput id="input_email"
                    value={formState.name.value}
                    field="email"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Tiêu đề buổi học"
                    placeholder="" />
                </div>
                <div className="form-group col-md-6">
                  <SelectKeyValue
                    id="input_teaching_form"
                    field="teaching_form"
                    label="Hình thức dạy"
                    options={listTeachingForm}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.teaching_form.value}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
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
              {
                function (){
                  if (currentPage > 0 && totalPage > 1 && totalPage > currentPage){
                    return (
                      <>
                      <div className="form-group">
                        <label>Nội dung trang {currentPage}</label>
                        <Editor getValue={getValue} isCreate={textHtml} setValue={textHtml} />
                      </div>
                      <div className="form-group">
                      <button className="btn btn-info right-margin" onClick={handleNextPage}>Trang tiếp theo</button>
                    </div>
                    </>
                    )
                  }

                  else if (totalPage === 1){
                    return (
                      <div className="form-group">
                        <label>Nội dung trang {currentPage}</label>
                        <Editor getValue={getValue} isCreate={textHtml} setValue={textHtml} />
                      </div>
                    )
                  }

                  else if (currentPage > 0  && totalPage === currentPage){
                    return (
                      <>
                      <div className="form-group">
                        <label>Nội dung trang {currentPage}</label>
                        <Editor getValue={getValue} isCreate={""} setValue={textHtml} />
                      </div>
                      <div className="form-group">
                      <button className="btn btn-info right-margin" onClick={handleSaveTutorialTemplate}>Lưu</button>
                    </div>
                    </>
                    )
                  }
                }()
              }
              {numberSection > 1 ? <button className="btn btn-warning" onClick={handleBackSection}>Quay lại</button> : null}
              {numberSection < 10 ? <button type="submit" className={`btn btn-primary left-margin`} onClick={handleNextSection}>Tiếp</button> : <button type="submit" className={`btn btn-primary left-margin`}>Hoàn thành</button>}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LessonPlan;
