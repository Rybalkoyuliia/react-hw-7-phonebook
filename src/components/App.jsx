import React from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchField } from './SearchField/SearchField';

import {
  StyledContactTitle,
  StyledPhonebookTitle,
  StyledPhonebookWrapper,
  StyledSearchFieldWrapper,
} from './App.styled';

export const App = () => {
  return (
    <StyledPhonebookWrapper>
      <StyledPhonebookTitle>My Phonebook</StyledPhonebookTitle>
      <ContactForm />
      <StyledSearchFieldWrapper>
        <StyledContactTitle>Contacts</StyledContactTitle>
        <SearchField />
      </StyledSearchFieldWrapper>
      <ContactList />
    </StyledPhonebookWrapper>
  );
};
