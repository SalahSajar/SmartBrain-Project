import React from 'react';
import './FaceDetection.css'

const FaceDetection = ({ imageURL , box}) => {
    return(
        <div className='Img_Container'>
            <img alt='' src={imageURL} height='300' width='auto'/>
            <div className='box' style={{ top:box.topRow, right:box.rightCol, bottom:box.bottomRow ,left:box.leftCol}}></div>
        </div>
    )
}

export default FaceDetection;