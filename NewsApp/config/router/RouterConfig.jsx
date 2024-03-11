import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../screens/Home'
import SingleNews from '../../screens/SingleNews'

const RouterConfig = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/news' element={<SingleNews />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterConfig
