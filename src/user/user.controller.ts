import { Controller, Get, Post, Delete, Inject, Request, Query, Body, Param, Headers, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { query } from 'express';
import { RoleGuard } from './role/role.guard';
import { ReqUrl, Role } from './role/role.decorator';
@UseGuards(RoleGuard)
@Controller('user')
export class UserController {

    constructor(
        @Inject('userArray') private readonly users: string[],
        @Inject('Dynamic') private readonly dynamicModule: any,
        private userService: UserService,
    ) { }

    @Role('admin')
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
    queryById(@Query('id', ParseIntPipe) id) {
        if (!id) return { code: 200 };
        return this.userService.queryById(id);
    }

    @Delete('/delete/:id')
    delete(@Param('id', ParseIntPipe) id) {
        if (!id) return { code: 200 };
        return this.userService.delete(id);
    }

    @Get('/list')
    @SetMetadata('role', ['admin'])
    list(@Query() query, @ReqUrl() url) {
        console.log(url)
        return this.userService.list(query);
    }
}
