import { describe, it, expect, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });
  it('should be able to authenticate', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to authenticate with wrong id', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    });

    expect(() => sut.execute({
      userId: 'non-exist-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  });
});