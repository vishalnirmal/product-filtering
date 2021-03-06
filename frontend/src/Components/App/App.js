import React from 'react'
import { Route, Switch } from 'react-router';
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
import AddProduct from '../AddProduct/AddProduct';
import Error404 from '../Error404/Error404';
import './App.scss';

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/add" render={(props)=>(<AddProduct type={"add"} {...props} />)}/>
                <Route path="/update/:id" render={(props)=>(<AddProduct type={"update"} {...props} />)}/>
                <Route path="" component={Error404}/>
            </Switch>
        </>
    )
}

export default App;
