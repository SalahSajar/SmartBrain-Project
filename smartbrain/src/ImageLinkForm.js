import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return(
        <div className='FormSection'>
            <h1> Smart Brain</h1>
            <div className='form_Container'>
                <div className='Input_Wrapper'>
                    <input type='text' placeholder='Image URL' onChange={onInputChange} />
                    <button onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>  

        </div>
    )
}

export default ImageLinkForm;