import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Upload = () => {

    const fileRef = useRef(null);
    const nav = useNavigate();

    const onUploadClick = async () => {
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/peopleupload/upload',{base64,name:file.name});
        //await axios.post('api/peopleupload/sendToDb',{name:data.name});
        nav('/');
    }

    const toBase64 = (file)=>{
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (<>
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3 offset-md-3">
                    <input ref={fileRef} type="file" className="form-control"></input>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary" onClick={onUploadClick}>Upload</button>
                </div>
            </div>
        </div>
    </>)
}
export default Upload;