import {
  Context,
  createSession,
  Store,
  UseSessions,
  dependency,
  Options,
  Get,
  Post,
  Hook,
  ValidateBody,
  HttpResponseOK,
  HttpResponseUnauthorized,
  HttpResponseNoContent,
} from '@foal/core';
import { User, Secret } from '../../entities';

const { cryptoWaitReady, decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

const isValidSignature = (signedMessage, signature, address) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

const credentialsSchema = {
  type: 'object',
  properties: {
    address: { type: 'string', maxLength: 255 },
    message: { type: 'string' },
    signature: { type: 'string' },
  },
  required: ['address', 'message', 'signature'],
  additionalProperties: false,
};

@Hook(() => response => {
  // Every response of this controller and its sub-controllers will be added this header.
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'options, get, post')
})

@UseSessions()
export class V1Controller {
  @dependency
  store: Store;

  @Options('*')
  options(ctx: Context) {
    const response = new HttpResponseNoContent();
    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    // You may need to allow other headers depending on what you need.
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return response;
  }

  @Post('/signin')
  @ValidateBody(credentialsSchema)
  async signin(ctx: Context<User | null>) {
    // Check the user's signature is valid
    await cryptoWaitReady();
    const { address, message, signature } = ctx.request.body;
    const isValid = isValidSignature(message, signature, address);
    if (!isValid) {
      return new HttpResponseUnauthorized();
    }

    ctx.session = await createSession(this.store);

    const user = await User.findOneBy({ address });

    // if there's no user with address, create a new one and save it to db
    if (!user) {
      const newUser = new User();
      newUser.address = address;
      newUser.signature = signature;
      await newUser.save();
      ctx.user = newUser;
      return new HttpResponseOK(ctx.session.getToken());
    }

    ctx.user = user;

    return new HttpResponseOK(ctx.session.getToken());
  }

  @Post('/signout')
  async signout(ctx: Context) {
    if (ctx.session) {
      await ctx.session.destroy();
    }
    return new HttpResponseNoContent();
  }

  @Get('/secret')
  @UseSessions({ required: true })
  async readSecret(ctx: Context) {
    // get random record from Secrets table
    const randomSecret = await Secret.createQueryBuilder('secret')
      .select()
      .orderBy('RANDOM()')
      .getOne();
    return new HttpResponseOK(randomSecret);
  }

}
