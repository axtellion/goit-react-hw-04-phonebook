import { Box } from './Box';
import { nanoid } from 'nanoid';
import { Title } from './App.styled';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContacts = ({ name, number }) => {
    const errorName = contacts.find(contact => contact.name === name);
    if (errorName) {
      toast.error('This contact is already added');
      return;
    }
    const contact = { id: nanoid(), name, number };
    setContacts(prevState => {
      return [...prevState, contact];
    });
  };

  const deleteContacts = contactsId => {
    setContacts(contacts.filter(contact => contact.id !== contactsId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  getVisibleContact();
  return (
    <Box as="main" width="1024px" mx="auto" bg="#63c6c6" p="20px">
      <ContactForm onSubmit={addContacts} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <ContactList
          contacts={getVisibleContact()}
          onDeleteContact={deleteContacts}
        />
      )}
      <ToastContainer theme="colored" autoClose={3000} />
    </Box>
  );
};
