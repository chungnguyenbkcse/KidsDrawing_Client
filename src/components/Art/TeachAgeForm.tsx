import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IArtAgeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IArtAge, ArtAgeModificationStatus } from "../../store/models/art_age.interface";
import TextInput from "../../common/components/TextInput";
import { editArtAge, clearSelectedArtAge, setModificationStateArtAge, addArtAge } from "../../store/actions/art_age.action";
import { OnChangeModel, IArtAgeFormState } from "../../common/types/Form.types";
import { postArtAge } from "../../common/service/ArtAge/PostArtAge";
import { putArtAge } from "../../common/service/ArtAge/PutArtAge";
import { toast } from "react-toastify";

export type artAgeListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function TeachAgeForm(props: artAgeListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const art_ages: IArtAgeState | null = useSelector((state: IStateType) => state.art_ages);
  let art_age: IArtAge | null = art_ages.selectedArtAge;
  const isCreate: boolean = (art_ages.modificationState === ArtAgeModificationStatus.Create);
  
  if (!art_age || isCreate) {
    art_age = { id: "", name: "", description: ""};
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: art_age.name },
    description: { error: "", value: art_age.description },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }
    props.isCheck(false);
    let saveUserFn: Function = (isCreate) ? addArtAge : editArtAge;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IArtAgeFormState, saveFn: Function): void {
    if (art_age) {
      const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });

      if (saveFn === addArtAge) {
        dispatch(postArtAge({
          name: formState.name.value,
          description: formState.description.value
        }, id))
      }

      else if (saveFn === editArtAge) {
        dispatch(putArtAge(art_age.id, {
          name: formState.name.value,
          description: formState.description.value
        }, id))
      }

      dispatch(clearSelectedArtAge());
      dispatch(setModificationStateArtAge(ArtAgeModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationStateArtAge(ArtAgeModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error || !formState.name.value ) as boolean;
}

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow shadow-xx">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} độ tuổi</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
            <div className="form-group">
                  <TextInput id="input_email"
                    value={formState.name.value}
                    field="name"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Tên"
                    placeholder="" />
              </div>
              <div className="form-group">
                  <TextInput id="input_description"
                  field = "description"
                    value={formState.description.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={100}
                    label="Miêu tả"
                    placeholder="" />
              </div>
            
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default TeachAgeForm;
