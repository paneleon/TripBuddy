import React, {useState} from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'

const ContentProviders = ({contentProviders, selectedContentProviders, setSelectedContentProviders}) => {
    
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked
        const contentProviderId = event.target.value
        if (checked){
            console.log("checked")
            setSelectedContentProviders([...selectedContentProviders, contentProviderId])
        } else {
            setSelectedContentProviders(selectedContentProviders.filter((id) => id != contentProviderId))
        }
    }

    return (
        <div className={styles['content-providers-block']}>
            <h6>Following:</h6>
            <>
                {contentProviders?.map((contProvider) => {
                    return (<div key={contProvider?.id}>
                        <input
                        value={contProvider?.id}
                        className='form-check-input me-2'
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e)}
                        />
                        <label className="form-check-label" >{contProvider?.username}</label>
                    </div>)
                })}
            </>
            
        </div>
    )
}

export default ContentProviders