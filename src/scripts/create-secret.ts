import { Secret } from '../app/entities';
import { dataSource } from '../db';
import { hashPassword } from '@foal/core';
const { naclEncrypt, randomAsU8a } = require('@polkadot/util-crypto');
const { stringToU8a, u8aToString } = require('@polkadot/util');

export const schema = {
  additionalProperties: false,
  properties: {
    message: { type: 'string' }
  },
  required: [
    'message'
  ],
  type: 'object',
};

export async function main(args: { message: string }) {
  await dataSource.initialize();

  try {
    const secret = new Secret();
    const secretKey = randomAsU8a();
    const messagePreEncryption = stringToU8a(args.message);

    // Encrypt the message
    const { encrypted } = naclEncrypt(messagePreEncryption, secretKey);

    // `encrypted` looks awful so do hashPassword
    secret.message = await hashPassword(u8aToString(encrypted));
    console.log(await secret.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
