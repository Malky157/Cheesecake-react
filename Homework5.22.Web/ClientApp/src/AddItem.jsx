import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const AddItem = () => {

    const [item, setItem] = useState({ itemType: '', itemName: '', price: 0 })
    const navigate = useNavigate()

    const onClick = async () => {
        const copy = { ...item }
        copy.itemType = item.itemType.value
        //copy.price = parseFloat(item.price)
        await axios.post('api/cheesecake/additem', copy)
        //navigate('/order')

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
        <div className="container" style={{ marginTop: 170 }}>
            <div className="">
                <label className="form-label">Item Type</label>
                <Select
                    options={options}
                    onChange={onSelect} value={{ label: item.itemType.label }} />
            </div>
            <div className="">
                <label className="form-label">Item Name</label>
                <input type="text" className="form-control" value={item.itemName} onChange={onTextChange} name="itemName" />
            </div>
            <div className="">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" value={item.price} onChange={onTextChange} name="price" />
            </div>
            <button type="submit" disabled={!isValid} className="btn btn-primary" onClick={onClick}>Add Item</button>
        </div>
    </>
}
export default AddItem;