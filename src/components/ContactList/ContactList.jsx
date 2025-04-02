import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteContact,
  filterValue,
  getContacts,
} from '../../redux/phonebook/slice';

import {
  StyledButton,
  StyledContactList,
  StyledContactListItem,
  StyledContactName,
  StyledContactPhone,
  StyledEmptyIdentificatorMessage,
  StyledInfoWrapper,
} from './ContactList.styled';

const getContactList = (filter, contacts) => {
  if (!filter) {
    return contacts;
  } else {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
};

export const ContactList = () => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const filter = useSelector(filterValue);
  const contacts = useSelector(getContacts);

  const contactList = useMemo(() => {
    return [...getContactList(filter, contacts)].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [filter, contacts]);

  return (
    <StyledContactList>
      {!contactList?.length ? (
        <StyledEmptyIdentificatorMessage>
          Currently, no contacts in your list
        </StyledEmptyIdentificatorMessage>
      ) : (
        contactList.map(item => (
          <StyledContactListItem key={item.id}>
            <StyledInfoWrapper>
              <StyledContactName> {item.name}</StyledContactName>
              <StyledContactPhone> {item.number}</StyledContactPhone>
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
