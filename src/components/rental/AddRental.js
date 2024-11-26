import React, { useRef } from "react";
import classes from './AddRental.module.css';

const AddRental = props => {

    const inputNameRef = useRef();
    const inputDescriptionRef = useRef();
    const inputPlaceRef = useRef();

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        if (inputNameRef.current.value.trim().length > 0 &&
            inputDescriptionRef.current.value.trim().length > 0 &&
            inputPlaceRef.current.value.trim().length > 0){
            const item = {
                id: '0',
                state: '0',
                rentier: '',
                lastRentier: '',
                place: inputPlaceRef.current.value,
                name: inputNameRef.current.value,
                description: inputDescriptionRef.current.value,
                fromDate: '2021-07-01',
                toDate: '2021-07-01'};
            console.log(JSON.stringify(item));
            updateRepository(item);
            props.onClose();
        }else{console.log('Některé vstupní pole nebylo vyplněno.')}
    };

    async function updateRepository (rentAction) {
        //const res = await fetch('http://rental.oskelt.cz/items/update.php',{
            await fetch('http://rental.oskelt.cz/items/addItem.php',{
            method: 'POST',
            body: JSON.stringify(rentAction),
            headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'}
        }).catch(error => console.log(error));

        //const data = await res.json().then(date=>console.log(date)).catch(error => console.log(error));
        //console.log(data);
    };

    return <div className={classes.rentals} onClose={props.onClose}>
            <h2 className={classes.h2}>Add new item</h2>
            <form className={classes.actions} onSubmit={onSubmitHandler}>
                <div><label>Name</label><input ref={inputNameRef}/></div>
                <div><label>Description</label><input ref={inputDescriptionRef}/></div>
                <div><label>Place</label><input ref={inputPlaceRef}/></div>
                <button>Add</button>
                <button onClick={props.onClose}>Close</button>
            </form>
        </div>
};

export default AddRental;