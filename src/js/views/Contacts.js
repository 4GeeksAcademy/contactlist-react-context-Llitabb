import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [contactID, setContactID] = useState(0);

    useEffect(() => {
        actions.setEditing(false);
    }, []);

    return (
        <div className="container">
            <div className="my-4 d-flex justify-content-end">
                <Link to="/form">
                    <button className="btn btn-success fw-bold">Add new contact</button>
                </Link>
            </div>
            <ul className="list-group row">
                {store.contacts.map((contact, index) => (
                    <li key={index} className="list-group-item d-flex flex-wrap align-items-center contact col-12">
                        <div className="d-flex flex-column justify-content-center ms-3 ms-xl-5 flex-grow-1">
                            <div className="fw-bold mb-1">{contact.name}</div>
                            <div>
                                <i className="fa-solid fa-phone me-2"></i>
                                {contact.phone}
                            </div>
                            <div>
                                <i className="fa-solid fa-envelope me-2"></i>
                                {contact.email}
                            </div>
                            <div>
                                <i className="fa-solid fa-location-dot me-2"></i>
                                {contact.address}
                            </div>
                        </div>
                        <div className="ms-auto">
                            <Link to="/form">
                                <i className="fa-solid fa-pencil btn ms-auto" onClick={() => actions.editContact(contact.id)}></i>
                            </Link>
                            <i className="fa-solid fa-trash-can btn" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setContactID(contact.id)}></i>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">Delete contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this contact?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => actions.deleteContact(contactID)}>Yes!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
