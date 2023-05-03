// 3p
import { hashPassword } from '@foal/core';

// App
import { User } from '../app/entities';
import { dataSource } from '../db';

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: 'string', format: 'email', maxLength: 255 },
    password: { type: 'string' },
    name: { type: 'string', maxLength: 255 },
  },
  required: [
    'email', 'password'
  ],
  type: 'object',
};

export async function main(args: { email: string, password: string, name?: string }) {
  await dataSource.initialize();

  try {
    const user = new User();
    user.email = args.email;
    user.password = await hashPassword(args.password);
    user.name = args.name ?? 'Unknown';
    user.avatar = `robohash.org/${user.name}`; // use RoboHash (Random) Avatars
    console.log(await user.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
