import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { comparePassword } from '../utils';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signIn(user: LoginDTO) {
    const userFound = await this.userService.getUserByUsername(user.username);
    console.log(userFound);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    const isMathced = await comparePassword(user.password, userFound.password);
    if (!isMathced) {
      throw new UnauthorizedException();
    }
    return userFound;
  }
}
