import React, { useState, FormEvent, Dispatch } from "react";
import { OnChangeModel } from "../../common/types/Form.types";
import { useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import '../../assets/css/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { postSavePassword } from "../../common/service/ResetPassword/PostSavePassword";

const UpdatePassword: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory()

  const [formState, setFormState] = useState({
    username: { error: "", value: "" },
    password: { error: "", value: "" }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if(isFormInvalid()) { return; }
    const idx = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });
    dispatch(postSavePassword(
        {
            newPassword: formState.password.value, 
            token: localStorage.getItem('token_reset_password')
        }, idx))
  }

  function isFormInvalid() {
    return (formState.password.error || !formState.password.value);
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid() as boolean;
    return isError ? "disabled" : "";
  }

  const changeRoute = () => {
    history.push('/landing-page')
  }

  return (

    <div className="container-fluid " id="login-page">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-10 col-md-9">
          <h2 id="text-logo" onClick={changeRoute}>KidsDrawing</h2>
        </div>
      </div>
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0  my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block text-center" id="image-login-page">
                  <img src="https://res.cloudinary.com/djtmwajiu/image/upload/v1667290306/o0ymcs4lblpy2hfmisyq.png" alt="First slide" />
                </div>
                <div className="col-lg-6 shadow-lg">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Thay đổi mật khẩu</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">
                        <TextInput id="input_password"
                          field="password"
                          value={formState.password.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          type="password"
                          label="Mật khẩu mới"
                          placeholder="" />
                      </div>
                      <button
                        className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`}
                        type="submit">
                        Gửi
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
