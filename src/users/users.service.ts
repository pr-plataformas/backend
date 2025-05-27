import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreateUserFromFirebase(firebaseUser: { email: string; name?: string; role: string }): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { email: firebaseUser.email } });
    if (!user) {
      user = this.usersRepository.create({
        email: firebaseUser.email,
        fullName: firebaseUser.name || firebaseUser.email,
        role: firebaseUser.role,
      });
      await this.usersRepository.save(user);
    } else if (user.role !== firebaseUser.role) {
      user.role = firebaseUser.role;
      await this.usersRepository.save(user);
    }
    return user;
  }

  // Otros métodos según tus necesidades...
}