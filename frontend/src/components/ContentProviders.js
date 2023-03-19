import React, {useState} from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'

const ContentProviders = ({contentProviders}) => {
    const [selectedContentProviders, setSelectedContentProviders] = useState([])
    
    return (
        <div className={styles['content-providers-block']}>
            <h6>Following:</h6>
            <>
                {contentProviders?.map((contProvider) => {
                    return <FormCheck
                        type="checkbox"
                        label={contProvider?.username}
                        key={contProvider?.id}
                    />
                })}
            </>
            
        </div>
    )
}

export default ContentProviders