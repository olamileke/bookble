import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_GUARDED_KEY } from 'src/utilities';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const guarded = this.reflector.getAllAndOverride<boolean>(IS_GUARDED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!guarded) return true;
    return super.canActivate(context);
  }
}
