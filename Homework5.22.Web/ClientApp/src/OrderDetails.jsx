import React from "react";
import axios from "axios";

const OrderDetails = () => {

    return <>
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "80vh" }}
        >
            <div
                className="card text-center shadow p-3 mb-5 bg-body rounded"
                style={{ width: "30rem", backgroundColor: "rgb(248, 249, 250)" }}
            >
                <div className="card-body">
                    <h3 className="card-title fw-bold">Malky</h3>
                    <p className="card-text fs-5">s@gmail.com</p>
                    <p className="card-text fs-5">Classic</p>
                    <p className="card-text fs-5">Caramel Drizzle, Almonds</p>
                    <p className="card-text fs-5">N/A</p>
                    <p className="card-text fs-5">1</p>
                    <p className="card-text fs-5">11/07/2023</p>
                    <p className="card-text fs-5">$57.89</p>
                </div>
                <a href="/view-orders">
                    <button className="btn btn-primary w-100">Back to Orders</button>
                </a>
            </div>
        </div>

    </>
}
export default OrderDetails