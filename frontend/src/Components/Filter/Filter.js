import React, {useEffect, useState} from 'react';
import {addName, addCategory, addPrice, removeFilters} from '../../redux/actions/filter';
import {useDispatch, useSelector} from 'react-redux';
import './Filter.scss';

function Filter() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState({
        min: "",
        max: ""
    });
    const {loading, error, categories} = useSelector(state=>state.categories);
    const filter = useSelector(state=>state.filter);
    useEffect(()=>{
        if (Object.keys(filter).length === 0){
            setName("");
            setPrice({
                min: "",
                max: ""
            });
        }
        else{
            if (filter.name)
                setName(filter.name);
            if (filter.min)
                setPrice(price=>({
                    ...price,
                    min: filter.min
                }));
            if (filter.max)
                setPrice(price=>({
                    ...price,
                    max: filter.max
                }));
        }
    }, [filter]);
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changePrice = (e) => {
        setPrice(oldPrice=>{
            return {
                ...oldPrice,
                [e.target.name]: e.target.value
            }
        });
    }
    const handleNameSubmit = (e)=>{
        e.preventDefault();
        dispatch(addName(name));
    }
    const handlePriceSubmit = (e)=>{
        e.preventDefault();
        dispatch(addPrice(price));
    }
    const handleCategorySubmit = (category)=>{
        dispatch(addCategory(category));
    }
    const resetFilter = ()=>{
        dispatch(removeFilters());
        setName("");
        setPrice({
            min: "",
            max: ""
        });
    }
    return (
        <div className="filter">
            <form className="filter__search" onSubmit={handleNameSubmit}>
                <input type="text" className="filter__search__input" label="name" name="name" id="name" value={name} onChange={changeName} placeholder="Search" autoComplete="off"/>
                <button type="submit" className="filter__search__button"><i className="fas fa-search"></i></button>
            </form>
            <div className="filter__category">
                <h4 className="filter__category__heading">Filter by category</h4>
                <div className="filter__category__list">
                    {
                        loading?
                        <h2>Loading</h2>:
                        error?
                        <h2>Unable to fetch list of categories</h2>:
                        categories.length?
                        categories.map((category, index)=>{
                            return <p key={index} className={(filter.category === category._id?"selected":"")+" filter__category__list__item"} onClick={()=>handleCategorySubmit(category._id)}>{category._id} <span>({category.count})</span></p>
                        }):
                        <h2>No categories to show</h2>
                        
                    }
                </div>
            </div>
            <form className="filter__price" onSubmit={handlePriceSubmit}>
                <input type="number" className="filter__price__input" label="min" name="min" id="min" value={price.min} onChange={changePrice} placeholder="Min" autoComplete="off"/>
                <input type="number" className="filter__price__input" label="max" name="max" id="max" value={price.max} onChange={changePrice}  placeholder="Max" autoComplete="off"/>
                <button type="submit" className="filter__price__button">Apply</button>
            </form>
            <button className="filter__reset" onClick={resetFilter}>Reset Filters</button>
        </div>
    )
}

export default Filter;
