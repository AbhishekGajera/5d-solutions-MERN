import React, { useState }  from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './style.css';
export const MainLayout = ({ component }) => {
    const [openSidebar, setOpenSidebar] = useState(false);


    return (
        <div>
            <div className='d-flex position-relative'>
                <div className={`${openSidebar ? '' : 'left-col'} `}>
                <Sidebar openSidebar={openSidebar}  setOpenSidebar={setOpenSidebar}/>
                </div>
                <div className='right-col'>
                    <Header  openSidebar={openSidebar}  setOpenSidebar={setOpenSidebar} />
                    {component}
                </div>
            </div>

        </div>
    )
}
