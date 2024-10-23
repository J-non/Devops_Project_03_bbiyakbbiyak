import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Payload = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.payload) {
    return null;
  }

  if (data) {
    return request.payload[data];
  }

  return request.payload;
})