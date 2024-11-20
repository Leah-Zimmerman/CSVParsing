import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
        
    return <>
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">CSV Parsing</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item"><Link to='/' className="nav-link text-light">Home</Link></li>
                            <li className="nav-item"><Link to='/upload' className="nav-link text-light">Upload</Link></li>
                            <li className="nav-item"><Link to='/generate' className="nav-link text-light">Generate</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div className="container">
            <main role="main">
                {children}
            </main>
        </div>
    </>
}

export default Layout;