import { Context, controller, Get, HttpResponseOK } from '@foal/core';
import { V1Controller } from './api';

export class ApiController {
  subControllers = [
    controller('/v1', V1Controller)
  ];

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello Web3 World!');
  }

}
