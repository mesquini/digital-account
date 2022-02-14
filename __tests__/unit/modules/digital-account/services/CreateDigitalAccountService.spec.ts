import faker from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

import CreateDigitalAccountService from '@modules/digital-account/services/CreateDigitalAccountService';
import AppError from '@shared/utils/AppError';
import FakeDigitalAccountRepository from '../repositories/FakeDigitalAccountRepository';

let fakeDigitalAccountRepository: FakeDigitalAccountRepository;
let createDigitalAccountService: CreateDigitalAccountService;

const data = {
  name: faker.name.findName(),
  document: cpf.generate(),
  availableValue: Math.min(100, Math.random()),
};

describe('CreateDigitalAccountService', () => {
  beforeAll(() => {
    fakeDigitalAccountRepository = new FakeDigitalAccountRepository();

    createDigitalAccountService = new CreateDigitalAccountService(
      fakeDigitalAccountRepository,
    );
  });

  it('Should create one digital account', async done => {
    const digitalAccount = await createDigitalAccountService.run(data);

    expect(digitalAccount).toBeDefined();
    expect(digitalAccount).toMatchObject(data);
    done();
  });

  it('Should not create one digital account when document already exists', async done => {
    await expect(createDigitalAccountService.run(data)).rejects.toBeInstanceOf(
      AppError,
    );

    done();
  });
  it('Should not create one digital account when document is invalid', async done => {
    await expect(
      createDigitalAccountService.run({
        name: 'cpf invalid',
        document: '999999999',
        availableValue: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);

    done();
  });
});
