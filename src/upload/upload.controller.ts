import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  uploadAlbum(@UploadedFile() file) {
    console.log('file:', file);
    return {
      code: HttpStatus.OK,
      message: '上传成功'
    }
  }

  @Get('download')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1682147639708.jpg');
    res.download(url);
  }

  @Get('stream')
  async stream(@Res() res: Response) {
    const url = join(__dirname, '../images/1682147639708.jpg');
    const s = new zip.Stream();
    
    await s.addEntry(url);

    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=1682147639708`);

    s.pipe(res);
  }
}
