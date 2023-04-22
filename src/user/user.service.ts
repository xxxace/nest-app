import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly user: Repository<User>) { }

    addUser(userInfo: Partial<User>) {
        const user = new User();
        user.name = userInfo.name;
        user.gender = userInfo.gender;
        user.age = userInfo.age;
        return this.user.save(user);
    }

    queryById(id: number) {
        return this.user.findOneBy({ id });
    }

    delete(id: number) {
        return this.user.delete(id);
    }

    list(query: Partial<User>) {
        return this.user.find({
            where: {
                name: Like(`%${query.name}%`),
                gender: query.gender,
                age: query.age
            }
        })
    }
}
