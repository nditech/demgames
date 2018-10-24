import React from 'react';
import {
    Button, 
    Modal, ModalHeader, ModalBody, ModalFooter 
    } from 'reactstrap';

export const HelpModal = ({open, toggle, className}) => (
    <Modal isOpen={open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Admin Help</ModalHeader>
        <ModalBody>
            <p>Type in 'location', 'language' and or 'game' to search for questions.</p>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
    </Modal>
);