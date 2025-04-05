import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterValue, getContacts } from '../../redux/phonebook/slice';

import {
  StyledButton,
  StyledContactList,
  StyledContactListItem,
  StyledContactName,
  StyledContactPhone,
  StyledEmptyIdentificatorMessage,
  StyledInfoWrapper,
} from './ContactList.styled';
import {
  deleteContactThunk,
  fetchContactsThunk,
} from '../../redux/phonebook/operations';

const getContactList = (filter, contacts) => {
  if (!filter) {
    return contacts;
  } else {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.phone.includes(filter)
    );
  }
};

const formatPhoneNumber = phoneNumber => {
  const cleaned = phoneNumber.replace(/[^\d]/g, '').replace(/^1/, '');

  const formatted = `(${cleaned.slice(0, 3)})${cleaned.slice(
    3,
    6
  )}-${cleaned.slice(6)}`;

  return formatted;
};

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const filter = useSelector(filterValue);
  const contacts = useSelector(getContacts);

  const contactList = getContactList(filter, contacts);

  const sortedContactsLength = [...contactList].filter(
    item => formatPhoneNumber(item.phone).length === 13
  );

  const sortedContactList = [...sortedContactsLength].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleDelete = id => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <StyledContactList>
      {!sortedContactList?.length ? (
        <StyledEmptyIdentificatorMessage>
          Currently, no contacts in your list
        </StyledEmptyIdentificatorMessage>
      ) : (
        sortedContactList.map(item => (
          <StyledContactListItem key={item.id}>
            <StyledInfoWrapper>
              <StyledContactName> {item.name}</StyledContactName>
              <StyledContactPhone>
                {' '}
                {formatPhoneNumber(item.phone)}
              </StyledContactPhone>
            </StyledInfoWrapper>
            <StyledButton
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </StyledButton>
          </StyledContactListItem>
        ))
      )}
    </StyledContactList>
  );
};
