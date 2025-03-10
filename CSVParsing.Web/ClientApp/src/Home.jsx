import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Home = ()=>{
    
    const [people,setPeople] = useState([]);

    useEffect(()=>{
        const getPeople = async()=>{
            const {data} = await axios.get('/api/peopleupload/getpeople');
            setPeople(data);
        }
        getPeople();
    },[])

    const deleteAll = async()=>{
        await axios.post('/api/peopleupload/deleteAll');
        setPeople([]);
    }
    
    return(<>
    <div className='container'>
        <div className='row col-md-6 offset-md-3 mt-5 mb-3'>
            <button className='btn btn-danger w-100' onClick={deleteAll}>Delete All</button>
        </div>
        <table className='table table-hover table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {!!people.length&&people.map(p=>
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.age}</td>
                        <td>{p.address}</td>
                        <td>{p.email}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    </>)
}

export default Home;