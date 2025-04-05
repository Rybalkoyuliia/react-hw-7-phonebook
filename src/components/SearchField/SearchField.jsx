import React from 'react';

// import { useDispatch } from 'react-redux';

import { StyledLabel, StyledSearchInput } from './SearchField.styled';

export const SearchField = () => {
  // const dispatch = useDispatch();
  const handleChange = e => {
    // dispatch(filterContacts(e.target.value.trim()));
  };

  return (
    <StyledLabel htmlFor="search">
      Filter:
      <StyledSearchInput
        onChange={handleChange}
        type="text"
        name="search"
        id="search"
        autoComplete="off"
      ></StyledSearchInput>
    </StyledLabel>
  );
};
