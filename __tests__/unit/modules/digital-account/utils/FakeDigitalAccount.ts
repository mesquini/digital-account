/* eslint-disable import/prefer-default-export */
import DigitalAccount from '@modules/digital-account/infra/db/entities/DigitalAccount';

export const FakeDigitalAccount1: DigitalAccount = {
  id: '123',
  name: 'Joana Bárbara Caldeira',
  document: '452.475.668-07',
  availableValue: 100,
};

export const FakeDigitalAccount2: DigitalAccount = {
  id: '1234',
  name: 'Neymar Jr',
  document: '458.363.878-77',
  availableValue: 1000,
};

export const FakeDigitalAccount3: DigitalAccount = {
  id: '1234',
  name: 'Naruto Uzumaki',
  document: '310.290.430-00',
  availableValue: 500,
};
