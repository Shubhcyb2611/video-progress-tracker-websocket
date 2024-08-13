import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string) {
    return this.prisma.user.create({
      data: { email, password },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }
}
