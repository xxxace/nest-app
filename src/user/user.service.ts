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

    async list(query: Partial<User> & { pageNo?: number, pageSize?: number }) {
        const pageNo = query.pageNo || 1;
        const pageSize = query.pageSize || 10;

        const result = await this.user.find({
            // relations:['tags'],
            where: {
                name: Like(`%${query.name}%`)
            },
            order: {
                id: "DESC"
            },
            skip: (pageNo - 1) * pageSize,
            take: pageSize
        });

        const total = await this.user.count({
            where: {
                name: Like(`%${query.name}%`)
            },
        });

        return {
            result,
            total,
            pageNo,
            pageSize
        }
    }
}
