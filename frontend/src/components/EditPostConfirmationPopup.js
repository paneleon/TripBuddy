import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/Popup.module.css'
import cn from 'classnames'
import { editPost } from '../../../backend/controllers/posts.controller';

const ConfirmationPopup = ({title, message, show, setShow, doAction}) => {


           const postEdit = () => {
            doAction (editPost)
            setShow(false)
        }

  return (
    <>
        {show &&
        <div
            className={cn('modal show', styles.popup)}
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Back</Button>
                <Button variant="success" onClick={() => doAction(postEdit)}>Confirm</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        }
    </>
  )
}

export default ConfirmationPopup