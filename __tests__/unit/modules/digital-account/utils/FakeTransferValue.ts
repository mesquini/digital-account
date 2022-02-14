/* eslint-disable import/prefer-default-export */

import Transfer from '@modules/digital-account/infra/db/entities/Transfer';

export const FakeTransferValue1: Transfer = {
  id: '1644759723879',
  receiverDocument: '458.363.878-77',
  senderDocument: '452.475.668-07',
  availableValue: 80,
  transferredValue: 20,
  dateTime: new Date('2022-02-13T13:42:03.879Z'),
};

export const FakeTransferValue2: Transfer = {
  id: '1644759723822',
  receiverDocument: '310.290.430-00',
  senderDocument: '452.475.668-07',
  availableValue: 80,
  transferredValue: 30,
  dateTime: new Date('2022-02-13T13:42:03.879Z'),
};
