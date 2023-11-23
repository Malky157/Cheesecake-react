import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const AddItem = () => {

    const [item, setItem] = useState({ itemType: '', itemName: '', price: '' })
    const navigate = useNavigate()

    const onClick = async () => {
        const copy = { ...item }
        copy.itemType = item.itemType.value
        await axios.post('api/cheesecake/additem', copy)
        clearForm()
        //navigate('/order')

    }
    const clearForm = () => {
        setItem({ itemType: '', itemName: '', price: '' })
    }

    const onTextChange = (e) => {
        const copy = { ...item };
        copy[e.target.name] = e.target.value;
        setItem(copy);
    }

    const onSelect = (option) => {
        const copy = { ...item };
        copy.itemType = option;
        setItem(copy);
    }
    const options =
        [
            { value: 'cheesecakeBaseFlavor', label: 'Cheesecake Base Flavor' },
            { value: 'topping', label: 'Topping' }
        ]
    const isValid = item.itemName.length > 0 && +item.price && item.price.length > 0 && (item.itemType !== 'select...')

    return <>

        <div className="container" style={{ marginTop: 150 }}>
            <h1>ADD AN ITEM TO THE FACTORY</h1>
            <div className="col-md-6">
                <label className="form-label">Item Type</label>
                <Select
                    options={options}
                    onChange={onSelect} value={{ label: item.itemType.label }} />
            </div>
            <div className="col-md-6">
                <label className="form-label">Item Name</label>
                <input type="text" className="form-control" value={item.itemName} onChange={onTextChange} name="itemName" />
            </div>
            <div className="col-md-6">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" value={item.price} onChange={onTextChange} name="price" />
            </div>
            <button type="submit" disabled={!isValid} className="btn btn-outline-primary" onClick={onClick}>Add Item</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => { navigate('/order') }}>Back to Order Page</button>
        </div>
    </>
}
export default AddItem;