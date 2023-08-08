import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(userRepository);
  });
  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'john.doe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() => sut.execute({
      email: 'john.done@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() => sut.execute({
      email: 'john.doe@email.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
