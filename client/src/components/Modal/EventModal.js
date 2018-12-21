import React from 'react';
import {
    Alert,
    Button,
    Form, FormGroup, Input, Label,
    Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const EventModal = ({open, toggle, className, notice, noticeColour, eventDate, changeDate, saveEvent, handleInputChange}) => (
    <Modal isOpen={open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Event</ModalHeader>
        <ModalBody>
            {
                notice !== ''
                ? (<Alert color={noticeColour}>{notice}</Alert>)
                : (null)
            }
        
            <Form>
                <FormGroup>
                    <Label for="event-name">Name:</Label>
                    <Input type="text" name="eventName" id="event-name" placeholder="Event Name" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="event-date">Date:</Label>
                    <DatePicker
                        selected={eventDate}
                        onChange={changeDate}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="event-address">Address:</Label>
                    <Input type="text" name="eventAddress" id="event-address" placeholder="e.g. 123 First St" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="event-city">City/Town:</Label>
                    <Input type="text" name="eventCity" id="event-city" placeholder="City Name" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="event-region">Region/State/Province:</Label>
                    <Input type="text" name="eventRegion" id="event-region" placeholder="Province Name" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="event-country">Country:</Label>
                    <Input type="text" name="eventCountry" id="event-country" placeholder="Country Name" 
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button color="success" onClick={saveEvent}>Save</Button>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
    </Modal>
);
