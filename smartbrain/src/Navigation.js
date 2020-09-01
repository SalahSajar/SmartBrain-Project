import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav>
                <div className='Nav_Items'>
                    <img alt='logo' src='https://image.flaticon.com/icons/png/128/749/749854.png' />
                    <span href='' onClick={() => onRouteChange('signin')}>Sign Out</span>
                </div>
            </nav>
        )
    } else {
        return(
            <nav>
                <div className='Nav_Items'>
                    <img alt='logo' src='https://image.flaticon.com/icons/png/128/749/749854.png' />
                    <div>
                        <span href='' onClick={() => onRouteChange('signin')}>Sign In</span>
                        <span href='' onClick={() => onRouteChange('register')}>Register</span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;