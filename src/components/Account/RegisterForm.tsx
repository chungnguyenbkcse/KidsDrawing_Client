import React, { useState, FormEvent, Dispatch } from "react";
import { OnChangeModel } from "../../common/types/Form.types";
import { useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import '../../assets/css/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { postRegister } from "../../common/service/Aut/Register";

const RegisterForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory()

  const [formState, setFormState] = useState({
    username: { error: "", value: "" },
    password: { error: "", value: "" },
    email: { error: "", value: "" },
    firstName: { error: "", value: "" },
    lastName: { error: "", value: "" },
    dateOfBirth: { error: "", value: "" },
    profile_image_url: { error: "", value: "" },
    sex: { error: "", value: "" },
    phone: { error: "", value: "" },
    address: { error: "", value: "" },
    parent_id: { error: "", value: "" },
    roleName: { error: "", value: "" },
  });

  function changeRouteHome(value: boolean) {
    if (value === true){
      history.push('/aut')
    }
  }

  function routeLogin() {
      history.push('/aut')
  }

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if(isFormInvalid()) { return; }
    const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });
    dispatch(postRegister({
        username: formState.username.value,
        password: formState.password.value,
        email: formState.email.value,
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        profile_image_url: null,
        sex: null,
        phone: null,
        address: null,
        roleName: "PARENT"
    }, changeRouteHome, id))
  }

  function isFormInvalid() {
    return (formState.username.error || formState.password.error
      || !formState.username.value || !formState.password.value);
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
                      <h1 className="h4 text-gray-900 mb-4">Đăng ký</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">

                        <TextInput id="input_username"
                          field="username"
                          value={formState.username.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label="Tên đăng nhập"
                          placeholder="" />
                      </div>
                      
                      <div className="form-group">

                        <TextInput id="input_email"
                          field="email"
                          value={formState.email.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label="Email"
                          placeholder="" />
                      </div>

                      <div className="form-group">
                        <TextInput id="input_password"
                          field="password"
                          value={formState.password.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          type="password"
                          label="Mật khẩu"
                          placeholder="" />
                      </div>
                
                      <button
                        className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`}
                        type="submit">
                        Đăng kí
                      </button>
                    </form>
                    <div className="justify-content-center text-center">
                      <p>Bạn đã có tài khoản? <span style={{color: '#0066FF'}}><span className="link" style={{color: '#0066FF'}} onClick={() => {routeLogin()}}>Đăng nhập</span></span></p>
                    </div>
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

export default RegisterForm;
