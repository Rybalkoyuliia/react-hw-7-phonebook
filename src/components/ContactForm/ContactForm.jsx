import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ReactInputMask from 'react-input-mask';

import {
  StyledButton,
  StyledForm,
  StyledFormWrapper,
  StyledInputsWrapper,
  StyledLabel,
} from './ContactForm.styled';
import { addContact, getContacts } from '../../redux/phonebook/slice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(getContacts);

  const handleAddContact = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const addedName = form.elements.name.value;
    const addedPhone = form.elements.number.value;

    const newContact = { name: addedName, number: addedPhone };

    const currentContacts = contactList || [];

    const existingContact = currentContacts.some(
      contact => contact.name === addedName
    );

    if (existingContact) {
      alert(`${addedName} is already in contacts`);
      return;
    }

    const existingPhoneNumber = currentContacts.some(
      contact => contact.number === addedPhone
    );

    if (existingPhoneNumber) {
      const contactWithSameNumber = currentContacts.find(
        contact => contact.number === addedPhone
      );

      if (contactWithSameNumber) {
        alert(
          `${addedPhone} is already in contacts under the name ${contactWithSameNumber.name}`
        );
        return;
      }
    }

    dispatch(addContact(newContact));

    setTimeout(() => {
      form.reset();
    }, 0);
  };

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleAddContact}>
        <StyledInputsWrapper>
          <StyledLabel htmlFor="name">
            Name
            <ReactInputMask
              style={{
                height: '20px',
                borderRadius: '10px',
                border: 'none',
                padding: '2px 8px',
                outline: 'none',
              }}
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              placeholder="Enter name"
              required
            />
          </StyledLabel>
          <StyledLabel htmlFor="number">
            Number
            <ReactInputMask
              style={{
                height: '20px',
                borderRadius: '10px',
                border: 'none',
                padding: '2px 8px',
                outline: 'none',
              }}
              mask="(999)999-9999"
              type="tel"
              name="number"
              id="number"
              placeholder="(000)000-0000"
              required
            ></ReactInputMask>
          </StyledLabel>
        </StyledInputsWrapper>
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </StyledFormWrapper>
  );
};
