import React, { useEffect, useState } from "react";
import axios from 'axios'

const OrderConfirmation = () => {


    return <>
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100vh", backgroundColor: "rgb(238, 238, 238)" }}
        >
            <div className="text-center">
                <h1 className="display-4">Your order has been submitted.</h1>
                <p className="lead">
                    You will receive a confirmation email shortly. Thank you and enjoy!
                </p>
            </div>
        </div>

    </>
}
export default OrderConfirmation;