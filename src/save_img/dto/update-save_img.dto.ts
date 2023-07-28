import { PartialType } from '@nestjs/mapped-types';
import { CreateSaveImgDto } from './create-save_img.dto';

export class UpdateSaveImgDto extends PartialType(CreateSaveImgDto) {}
