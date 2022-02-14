import TransferValueService from '@modules/digital-account/services/TransferValueService';
import AppError from '@shared/utils/AppError';
import { cpf } from 'cpf-cnpj-validator';
import FakeDigitalAccountRepository from '../repositories/FakeDigitalAccountRepository';
import FakeTransferRepository from '../repositories/FakeTransferRepository';
import {
  FakeDigitalAccount1,
  FakeDigitalAccount2,
} from '../utils/FakeDigitalAccount';

let fakeDigitalAccountRepository: FakeDigitalAccountRepository;
let fakeTransferRepository: FakeTransferRepository;
let transferValueService: TransferValueService;

const data = {
  senderDocument: FakeDigitalAccount1.document,
  receiverDocument: FakeDigitalAccount2.document,
  transferredValue: 10,
};

describe('TransferValueService', () => {
  beforeAll(() => {
    fakeDigitalAccountRepository = new FakeDigitalAccountRepository();
    fakeTransferRepository = new FakeTransferRepository();

    transferValueService = new TransferValueService(
      fakeDigitalAccountRepository,
      fakeTransferRepository,
    );
  });

  it('Should create one transfer', async done => {
    const transferValue = await transferValueService.run(data);

    expect(transferValue).toBeDefined();
    expect(transferValue).toMatchObject(data);
    done();
  });

  it('Should not create one transfer when another occurred in less than 2 minutes with the same information', async done => {
    await expect(transferValueService.run(data)).rejects.toBeInstanceOf(
      AppError,
    );
    done();
  });

  it('Should not create one transfer when sender document is invalid', async done => {
    const newData = {
      ...data,
      senderDocument: '999.999.999-99',
    };

    await expect(transferValueService.run(newData)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });

  it('Should not create one transfer when receiver document is invalid', async done => {
    const newData = {
      ...data,
      receiverDocument: '999.999.999-99',
    };

    await expect(transferValueService.run(newData)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });

  it('Should not create one transfer when receiver document have not digital account', async done => {
    const newData = {
      ...data,
      receiverDocument: cpf.generate(),
    };

    await expect(transferValueService.run(newData)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });

  it('Should not create one transfer when sender document have not digital account', async done => {
    const newData = {
      ...data,
      senderDocument: cpf.generate(),
    };

    await expect(transferValueService.run(newData)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });

  it('Should not create one transfer when sender document have not available value', async done => {
    const newData = {
      ...data,
      transferredValue: 989999,
    };

    await expect(transferValueService.run(newData)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });
});
