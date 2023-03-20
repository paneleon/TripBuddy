import React, {useState, useEffect} from 'react'
import { Form, Button, Container, Dropdown } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'
const SearchBar = ({categories}) => {

  return (
    <div className={styles['search-bar']}>
        <Form.Control
              type="search"
              placeholder="Search posts by destinations or content providers"
              className="me-2"
              aria-label="Search"
            />
          <Button variant="outline-success">Search</Button>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    categories?.map((cat) => {
                        return <Dropdown.Item href="#">{cat}</Dropdown.Item>
                    })
                }
                
            </Dropdown.Menu>
            
        </Dropdown>
    </div>
  )
}

export default SearchBar