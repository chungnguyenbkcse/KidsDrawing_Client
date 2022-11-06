import React, { useState, Dispatch, Fragment } from "react";
import { useDispatch } from "react-redux";
import { TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { setModificationState } from "../../store/actions/teacher_register_quantification.action";

import { toast } from "react-toastify";
import { putSection } from "../../common/service/Section/PutSection";

export type lessonListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};


function SubmitRecordForm(props: lessonListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();

    function cancelForm(): void {
        props.isCheck(false);
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (!isFilePicked) as boolean;
    }

    var id_x = localStorage.getItem('section_id');
    let section_id = 0;
    if (id_x !== null) {
        section_id = parseInt(id_x)
    }

    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = async () => {
        const formData = new FormData();

        formData.append('gifFile', selectedFile);

        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/cloudinary/video/gifs`, {
                method: "POST",
                body: formData
            }
        )
        const data = await res.json()
        console.log(data)
        dispatch(putSection(section_id, {recording: data.url_video}, idx))
    };

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green" id="header-form-teacher-level">Nộp record</h6>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="profile_image">Record (Chấp nhận: mp4, webm):</label>
                                        <input type="file" id="profile_image" name="profile_image" onChange={changeHandler} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        {isFilePicked ? (
                                            <div>
                                                <p>Filename: {selectedFile.name}</p>
                                                <p>Filetype: {selectedFile.type}</p>
                                                <p>Size in bytes: {selectedFile.size}</p>
                                                <p>
                                                    lastModifiedDate:{' '}
                                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                                </p>
                                            </div>
                                        ) : (
                                            <p>Select a file to show details</p>
                                        )}
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                                <button type="button" className={`btn btn-success left-margin ${getDisabledClass()}`} onClick={handleSubmission}>Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SubmitRecordForm;
