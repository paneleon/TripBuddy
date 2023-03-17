import React from 'react'
import ImageUpload from '../components/ImageUpload'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

const Sample = () => {
  
    return (
    <div>
        <h2>Sample Page for testing</h2>
        <ImageUpload imageFolder={'posts'}/>
    </div>
  )
}

export default Sample