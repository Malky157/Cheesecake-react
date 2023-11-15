import { Link } from "react-router-dom";

const Home = () => {
    return <>
        <div className="container" style={{ marginTop: 80 }}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: "lightgray" }}>
                <div className="text-center">
                    <h1 className="display-4">Welcome to the Cheesecake Factory</h1>
                    <p className="lead">
                        <Link to={'/order'}>
                            <button className="btn btn-dark btn-lg">Click here to order your own custom cheesecake</button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
}
export default Home;