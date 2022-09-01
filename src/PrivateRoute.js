import React from 'react'
import {Navigate} from "react-router-dom"
import {useContext} from 'react';
import GeneralContext from './contexts/CreateContext';


export default function PrivateRoute({children}) {
    const{token} = useContext(GeneralContext)

    return (!token ? <Navigate to="/"/> : children) 
}