import React from "react";
import axios from "axios";

const ViewOrders = () => {

    return <>
        <div className="d-flex justify-content-center">
            <table
                className="table text-center shadow-lg"
                style={{
                    borderCollapse: "separate",
                    borderSpacing: "0px 15px",
                    maxWidth: "80%"
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor: "rgb(33, 37, 41)",
                            color: "white",
                            borderRadius: 15
                        }}
                    >
                        <th>Name/Email</th>
                        <th>Base Flavor</th>
                        <th>Toppings</th>
                        <th>Special Requests</th>
                        <th>Quantity</th>
                        <th>Delivery Date</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ backgroundColor: "rgb(248, 249, 250)", borderRadius: 15 }}>
                        <td style={{ paddingTop: 15, paddingBottom: 15 }}>
                            <a href="/order-details/1">Malky - s@gmail.com</a>
                        </td>
                        <td>Classic</td>
                        <td>Caramel Drizzle, Almonds</td>
                        <td>N/A</td>
                        <td>1</td>
                        <td>11/07/2023</td>
                        <td>$57.89</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </>
}
export default ViewOrders;