import React, { useEffect, useState } from "react";
import Select from 'react-select'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import OrderConfirmation from "./OrderConfirmation";


const Order = () => {
    const [orderDetails, setOrderDtails] = useState({ specialRequests: '', quantity: 0, deliveryDate: '' })
    const [customer, setCustomer] = useState({ name: '', email: '' })
    const [customersToppings, setCustomersToppings] = useState([])
    const [customersBaseFlavor, setCustomersBaseFlavor] = useState({ id: '', itemType: '', itemName: '', price: '' })
    const [toppings, setToppings] = useState([]);
    const [cheesecakeBaseFlavors, setCheesecakeBaseFlavors] = useState([])
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        await getBaseFlavors();
        await getToppings();
    }

    const formIsValid =
        !!customer.name &&
            !!customer.email &&
            +orderDetails.quantity > 0 &&
            +orderDetails.quantity % 1 === 0 &&
            !!orderDetails.deliveryDate &&
            !!customersBaseFlavor.id ?
            false : true


    const getBaseFlavors = async () => {
        const { data } = await axios.get('api/cheesecake/getbaseflavors');
        setCheesecakeBaseFlavors(data);
    }

    const getToppings = async () => {
        const { data } = await axios.get('api/cheesecake/gettoppings');
        setToppings(data);
    }

    const onCustomerChange = e => {
        const copy = { ...customer }
        copy[e.target.name] = e.target.value
        setCustomer(copy);
    }

    const onOrderDetailsChange = e => {
        const copy = { ...orderDetails }
        copy[e.target.name] = e.target.value
        setOrderDtails(copy);
        if (e.target.name === 'quantity') {
            getTotal();
        }
    }

    const onSelectOption = (option) => {
        const chosenFlavor = cheesecakeBaseFlavors.find(f => f.id === option.value)
        setCustomersBaseFlavor(chosenFlavor)
        getTotal()
    }

    const onChecked = (e) => {
        const topping = toppings.find(t => t.id === parseInt(e.target.value))
        let copy = [...customersToppings]
        if (!customersToppings.includes(topping)) {
            copy = [...copy, topping]
        }
        else {
            copy = copy.filter(t => t.id !== topping.id)
        }
        setCustomersToppings(copy)
        getTotal()
    }

    const selectOrDeselectAll = () => {
        let copy = [...customersToppings];
        if (copy.length === toppings.length) {
            copy = []
        } else {
            copy = toppings.map(topping => {
                return topping
            })
        }
        setCustomersToppings(copy)
        getTotal();
    }

    const baseFlavorOptions =
        cheesecakeBaseFlavors.map(f => {
            return {
                value: f.id, label: `${f.itemName}($${f.price})`
            }
        })

    const onSubmit = async () => {
        const customerItemsIds = [customersBaseFlavor.id, ...customersToppings.map(t => t.id)]
        await axios.post('api/cheesecake/addorder', { customer, orderDetails, customerItemsIds })
        navigate('/orderconfirmation')
    }

    const getTotal = () => {
        console.log(1)
        let sum = 0;
        if (customersBaseFlavor.price) {
            sum += customersBaseFlavor.price
        }
        if (customersToppings.length > 0) {
            sum += customersToppings.map(t => t.price).reduce((total, amount) => total + amount)
        }
        if (quantity > 0) {
            sum += sum * quantity
        }
        setTotal(sum);
    }

    const { specialRequests, quantity, deliveryDate } = orderDetails

    return <>
        <div className="container" style={{ marginTop: 80 }}>
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={customer.name} name="name" onChange={onCustomerChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={customer.email} name="email" onChange={onCustomerChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor</label>
                        <Select options={baseFlavorOptions} onChange={onSelectOption} value={customersBaseFlavor.id !== '' ? { label: `${customersBaseFlavor.itemName}` } : 'select...'} />
                    </div>
                    <div className="mb-3">
                        <div>
                            <label style={{ fontWeight: 'bolder' }} className="form-label">Toppings</label>
                            <Form style={{ marginBottom: 10, marginTop: 10 }}>
                                <Form.Check
                                    style={{ fontWeight: 'bold' }}
                                    type='checkbox'
                                    label={customersToppings.length === toppings.length ? 'Deselect All Toppings' : 'Select All Toppings'}
                                    onChange={selectOrDeselectAll}
                                    checked={customersToppings.length === toppings.length}
                                />
                            </Form>
                        </div>
                        <Form>
                            {toppings.map((topping) => (
                                <div key={topping.id}>
                                    <Form.Check
                                        type='checkbox'
                                        value={topping.id}
                                        label={topping.itemName + `($${topping.price.toFixed(2)})`}
                                        onChange={onChecked}
                                        checked={customersToppings.includes(topping)}
                                    />
                                </div>
                            ))}
                        </Form>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" onChange={onOrderDetailsChange} name="specialRequests" value={specialRequests}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" value={quantity} onChange={onOrderDetailsChange} name="quantity" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" value={deliveryDate} onChange={onOrderDetailsChange} name="deliveryDate" />
                    </div>
                    <button type="submit" disabled={formIsValid} className="btn btn-outline-primary" onClick={onSubmit}>Submit Order</button>
                </div>
                <div className="col-md-6 position-sticky" style={{ top: '2rem' }}>
                    <h2 className="mb-4">Live Preview</h2>
                    <div className="card" style={{ width: '18rem' }}>
                        {/* <img src="/cheesecake.jpg" className="card-img-top" alt="Cheesecake"></img> */}
                        <div className="card-body">
                            <h5 className="card-title">Your Custom Cheesecake</h5>
                            <p className="card-text"><b>Base:</b> {customersBaseFlavor.itemName}</p>
                            <p className="card-text"><b>Toppings:</b> {customersToppings.map(t => t.itemName).join(', ')}</p>
                            <p className="card-text"><b>Special Requests:</b> {specialRequests}</p>
                            <p className="card-text"><b>Quantity:</b> {quantity}</p>
                            <p className="card-text"><b>Delivery Date:</b> {deliveryDate}</p>
                            <p className="card-text fw-bold"><b>Total:</b> {total !== '' ? `$${total.toFixed(2)}` : total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}
export default Order;