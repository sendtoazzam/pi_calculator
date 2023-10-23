import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './auth/users.model';
import { sha512crypt } from 'shacrypt';
import { PiCalculatorService } from './pi-calculator/pi-calculator.service';
import { AuthUser } from 'src/common/type/auth-user.type';
import { AuthUserType } from 'src/common/enum/auth-user-type.enum';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly salt: string = 'r4z0rg4d3';
  private readonly rounds: number = 9564;
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly piService: PiCalculatorService,
  ) {}

  // onModuleInit() is executed before the app bootstraped
  async onModuleInit() {
    try {
      // Create dummy user on init()
      const res = await this.usersModel.findOne().sort({ createdAt: -1 }); // this method returns user data exist in database (if any)
      let userId: string;
      // checks if any user data exist
      if (!res) {
        const newUser = {
          name: 'default user',
          email: 'youremail@gmail.com',
          username: 'yourusername',
          password: this.encryptPassword('123456'),
        };
        const user = await this.usersModel.create(newUser); // this method creates new user in database
        userId = user._id;
        console.log(`${user.email} created.`);
      } else {
        const user = await this.usersModel.findOne({
          email: 'youremail@gmail.com',
        });
        userId = user._id;
      }
      //get current pi value
      const authUser: AuthUser = {
        userId: userId,
        type: AuthUserType.User,
      };
      const pi = await this.piService.calculate(authUser);
      console.log(`Pi Generate with value ${pi}`);
    } catch (error) {
      throw error;
    }
  }

  private encryptPassword(plainPassword: string): string {
    return sha512crypt(plainPassword, this.salt, this.rounds).replace(
      /^[\$rounds=956430rgdz]*/,
      '',
    );
  }

  // your other methods
}
