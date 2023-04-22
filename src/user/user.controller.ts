import { Controller, Get, Post, Delete, Inject, Request, Query, Body, Param, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { query } from 'express';

@Controller('user')
export class UserController {

    constructor(
        @Inject('userArray') private readonly users: string[],
        @Inject('Dynamic') private readonly dynamicModule: any,
        private userService: UserService,
    ) { }

    @Get()
    user() {
        return this.dynamicModule
    }

    @Post('/add')
    async addUser(@Body() body) {
        console.log(body)
        const res = await this.userService.addUser(body);
        return res
    }

    @Get('/queryById')
    queryById(@Query() query) {
        if (!query.id) return { code: 200 };
        return this.userService.queryById(query.id);
    }

    @Delete('/delete/:id')
    delete(@Param() params) {
        if (!params.id) return { code: 200 };
        return this.userService.delete(params.id);
    }

    @Get('/list')
    list(@Query() query) {
        return this.userService.list(query);
    }
}
