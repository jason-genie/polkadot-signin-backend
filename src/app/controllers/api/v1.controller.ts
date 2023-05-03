import { Context, Get, HttpResponseOK } from '@foal/core';
import { Secret } from '../../entities';

export class V1Controller {
  @Get('/secret')
  async readSecret(ctx: Context) {
    // get random record from Secrets table
    const randomSecret = await Secret
      .createQueryBuilder('secret')
      .select(['secret.message'])
      .orderBy('RANDOM()')
      .getOne();
    
    return new HttpResponseOK(randomSecret);
  }
}
