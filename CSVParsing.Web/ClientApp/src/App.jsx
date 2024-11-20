import { Routes, Route } from 'react-router-dom';
import React from "react";
import Layout from "./Layout";
import Home from "./Home";
import Generate from './Generate';
import Upload from './Upload';

const App = () => {
    return (<>
        <Layout>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/generate" element={<Generate />}/>
                <Route exact path="/upload" element={<Upload />}/>
            </Routes>
        </Layout>
    </>
    )
}
export default App;