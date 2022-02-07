import { SetMetadata } from '@nestjs/common';

export const IS_GUARDED_KEY = 'guarded';

export const UnguardedRoute = () => SetMetadata(IS_GUARDED_KEY, false);
