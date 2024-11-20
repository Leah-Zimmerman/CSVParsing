import axios from "axios";
import React,{useState} from "react";

const Generate = ()=>{
    
    const [amount, setAmount] = useState("");

    const onGenerateClick = async()=>{
        await axios.post(`/api/peopleupload/generate?amount=${amount}`);
        window.location.href = "api/peopleupload/getfile";
    }
    
    return(<>
    <div className="container">
        <div className="row mt-5">
            <div className="col-md-3 offset-md-3">
                <input className="form-control" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)}></input>
            </div>
            <div className="col-md-3">
                <button className="btn btn-primary" onClick={onGenerateClick}>Generate</button>
            </div>
        </div>
    </div>"
    </>)
}
export default Generate;