import React, { useState, FormEvent, Dispatch } from "react";
import { OnChangeModel } from "../../common/types/Form.types";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/account.actions";
import TextInput from "../../common/components/TextInput";
import '../../assets/css/Login.css'
import jwt_decode from "jwt-decode"

const Login: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

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
    fetch(`${process.env.REACT_APP_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username":formState.username.value,
        "password": formState.password.value
      })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('access_token', data.accessToken) // Authorization
        localStorage.setItem('refresh_token', data.refreshToken)
        localStorage.setItem('username', formState.username.value)
        const token: string = data.accessToken;
        const decoded: any = jwt_decode(token); 
        console.log(decoded)
        localStorage.setItem('role_privilege', decoded.role_privilege)
        localStorage.setItem('id', decoded.id)
        dispatch(login(formState.username.value));
      })
      .catch(() => {
        alert('Đăng nhập không thành công!')
      })
    e.preventDefault(); 
  }

  function isFormInvalid() {
    return (formState.username.error || formState.password.error
      || !formState.username.value || !formState.password.value);
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid() as boolean;
    return isError ? "disabled" : "";
  }

  return (

    <div className="container-fluid " id="login-page">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-10 col-md-9">
          <h2 id="text-logo">KidsDrawing</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0  my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block text-center" id="image-login-page">
                  <img src="https://res.cloudinary.com/djtmwajiu/image/upload/v1653726835/yfzr51aot4uof2awbush.png" alt="First slide" />
                </div>
                <div className="col-lg-6 shadow-lg">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Đăng nhập</h1>
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
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label"
                            htmlFor="customCheck">Nhớ mật khẩu</label>
                        </div>
                      </div>
                      <button
                        className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`}
                        type="submit">
                        Đăng nhập
                      </button>
                    </form>
                    <div className="justify-content-center text-center">
                      <a style={{color: '#0066FF'}} href={`/`}>Quên mật khẩu?</a>
                    </div>
                    <div className="justify-content-center text-center">
                      <p>Bạn chưa có tài khoản? <span style={{color: '#0066FF'}}><a style={{color: '#0066FF'}} href={`/`}>Đăng kí</a></span></p>
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

export default Login;
