import React from 'react'
import './upload.scss'
import { Clear } from '@mui/icons-material'

export default function UploadImage({ selectImage, handleImageChange, handleRemoveImage }) {

    return (
        <div className="upload-img">
            <div className="row upload-img__container">
                {
                    selectImage.map((item, index) => {
                        return (
                            <div className="img-item" key={index}>
                                <img src={item && URL.createObjectURL(item)} alt="" />
                                <div className='img-item__clear'>
                                    <Clear className="cancel" onClick={() => handleRemoveImage(index)}/>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
            <form>
                <label htmlFor="file" className="upload-img__btn">
                    <span>Choose image</span>
                    <input
                        id="file"
                        type="file"
                        multiple
                        accept=".jpg, .png, .jpeg"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </label>
            </form>
        </div>
    )
}
