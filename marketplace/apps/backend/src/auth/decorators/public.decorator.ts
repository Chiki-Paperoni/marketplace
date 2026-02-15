import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** Use on routes that must be callable without a JWT (e.g. register, login). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
