import HistoryTransferService from '@modules/digital-account/services/HistoryTransferService';
import AppError from '@shared/utils/AppError';
import { cpf } from 'cpf-cnpj-validator';
import FakeDigitalAccountRepository from '../repositories/FakeDigitalAccountRepository';
import FakeTransferRepository from '../repositories/FakeTransferRepository';
import {
  FakeDigitalAccount1,
  FakeDigitalAccount2,
  FakeDigitalAccount3,
} from '../utils/FakeDigitalAccount';
import {
  FakeTransferValue1,
  FakeTransferValue2,
} from '../utils/FakeTransferValue';

let fakeDigitalAccountRepository: FakeDigitalAccountRepository;
let fakeTransferRepository: FakeTransferRepository;
let historyTransferService: HistoryTransferService;

describe('HistoryTransferService', () => {
  beforeAll(() => {
    fakeDigitalAccountRepository = new FakeDigitalAccountRepository();
    fakeTransferRepository = new FakeTransferRepository();

    historyTransferService = new HistoryTransferService(
      fakeTransferRepository,
      fakeDigitalAccountRepository,
    );
  });

  it('Should show history transfers by sender document', async done => {
    const historyTransfer = await historyTransferService.run(
      FakeDigitalAccount1.document,
    );

    expect(historyTransfer).toBeDefined();
    expect(historyTransfer).toMatchObject([
      FakeTransferValue1,
      FakeTransferValue2,
    ]);
    done();
  });

  it('Should not show history transfers when digital account not initialized', async done => {
    await expect(
      historyTransferService.run(cpf.generate()),
    ).rejects.toBeInstanceOf(AppError);

    done();
  });
  it('Should not show history transfers when document is invalid', async done => {
    await expect(
      historyTransferService.run('999999999'),
    ).rejects.toBeInstanceOf(AppError);

    done();
  });
});
