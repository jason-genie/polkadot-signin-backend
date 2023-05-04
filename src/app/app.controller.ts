import { Context, render, Get, controller, IAppController, HttpResponseNotFound } from '@foal/core';

import { ApiController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
  ];

  @Get('*')
  notFound(ctx: Context) {
    if (!ctx.request.accepts('html')) {
      return new HttpResponseNotFound();
    }

    return render('./public/index.html');
  }
}
