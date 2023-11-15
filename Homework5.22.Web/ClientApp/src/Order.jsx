import React, { useEffect, useState } from "react";
import Select from 'react-select'
import axios from 'axios'
import { useParams, useNavigate, json } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const Order = () => {
    const [order, setOrder] = useState({ customer: { name: '', email: '', }, cheesecakeBaseFlavor: '', toppings: [], specialRequests: '', quantity: '', deliveryDate: '', total: '' })
    const [toppings, setToppings] = useState([]);
    const [cheesecakeBaseFlavors, setCheesecakeBaseFlavors] = useState([])
    const [isFormNotFilled, setIsFormNotFilled] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        await getBaseFlavors();
        await getToppings();
    }

    const formIsValid =
        !!order.customer.name &&
            !!order.customer.email &&
            +order.quantity > 0 &&
            !!order.deliveryDate &&
            !!order.cheesecakeBaseFlavor ?
            false : true


    const getBaseFlavors = async () => {
        const { data } = await axios.get('api/cheesecake/getbaseflavors');
        setCheesecakeBaseFlavors(data);
    }

    const getToppings = async () => {
        const { data } = await axios.get('api/cheesecake/gettoppings');
        setToppings(data);
    }

    const onTextChange = e => {
        const copy = { ...order }
        if (e.target.name === 'name' || e.target.name === 'email') {
            copy.customer[e.target.name] = e.target.value;
        } else {
            copy[e.target.name] = e.target.value
        }
        setOrder(copy);
    }

    const onSelectOption = (option) => {
        const copy = { ...order }
        copy.cheesecakeBaseFlavor = option.value
        setOrder(copy)
    }

    const onChecked = e => {
        const topping = e.target.value;
        const copy = { ...order }
        if (e.target.checked) {
            copy.toppings = [...copy.toppings, topping]
        }
        else {
            copy.toppings = copy.toppings.filter(t => t !== topping)
        }
        setOrder(copy)
    }

    const removeUnderscores = (object) => {
        if (object.includes('_')) {
            object = object.replaceAll('_', ' ')
        }
        return object
    }

    const addUnderscores = (object) => {
        if (object.includes(' ')) {
            object = object.replaceAll(' ', '_')
        }
        return object
    }

    const selectOrDeselectAll = () => {
        const copy = { ...order };
        if (copy.toppings.length === toppings.length) {
            copy.toppings = []
        } else {
            copy.toppings = toppings.map(topping => removeUnderscores(topping))
        }
        setOrder(copy)
    }

    const baseFlavorOptions =
        cheesecakeBaseFlavors.map(f => {
            return {
                value: f, label: removeUnderscores(f)
            }
        })

    const onSubmit = () => {
        console.log(1)
    }
    const { customer, specialRequests, quantity, deliveryDate } = order

    return <>
        <div className="container" style={{ marginTop: 80 }}>
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={customer.name} name="name" onChange={onTextChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={customer.email} name="email" onChange={onTextChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                        <Select options={baseFlavorOptions} onChange={onSelectOption} value={{ label: removeUnderscores(order.cheesecakeBaseFlavor) }} />
                    </div>
                    <div className="mb-3">
                        <div>
                            <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                            <Form style={{ marginBottom: 15, marginLeft: 400, marginTop: -30 }}>
                                <Form.Check
                                    style={{ fontWeight: 'bolder', }}
                                    type='checkbox'
                                    label={order.toppings.length === toppings.length ? 'Deselect All Toppings' : 'Select All Toppings'}
                                    onChange={selectOrDeselectAll}
                                    checked={order.toppings.length === toppings.length}
                                />
                            </Form>
                        </div>
                        <Form>
                            {toppings.map((topping) => (
                                <div key={topping}>
                                    <Form.Check
                                        type='checkbox'
                                        value={removeUnderscores(topping)}
                                        label={removeUnderscores(topping)}
                                        onChange={onChecked}
                                        checked={order.toppings.includes(removeUnderscores(topping))}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" onChange={onTextChange} name="specialRequests" value={specialRequests}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" min="1" value={quantity} onChange={onTextChange} name="quantity" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" value={deliveryDate} onChange={onTextChange} name="deliveryDate" />
                    </div>
                    <button type="submit" disabled={formIsValid} className="btn btn-primary" onClick={onSubmit}>Submit Order</button>
                </div>
                <div className="col-md-6 position-sticky" style={{ top: '2rem' }}>
                    <h2 className="mb-4">Live Preview</h2>
                    <div className="card" style={{ width: '18rem' }}>
                        {/* <img src="/cheesecake.jpg" className="card-img-top" alt="Cheesecake"></img> */}
                        <div className="card-body">
                            <h5 className="card-title">Your Custom Cheesecake</h5>
                            <p className="card-text">Base: {removeUnderscores(order.cheesecakeBaseFlavor)}</p>
                            <p className="card-text">Toppings: {order.toppings.join(', ')}</p>
                            <p className="card-text">Special Requests: {order.specialRequests}</p>
                            <p className="card-text">Quantity: {order.quantity}</p>
                            <p className="card-text">Delivery Date: {order.deliveryDate}</p>
                            <p className="card-text fw-bold">Total: {order.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}
export default Order;