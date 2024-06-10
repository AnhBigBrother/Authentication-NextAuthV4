import { AppError } from '@/utils/app-error';
import { MongoClient, ObjectId } from 'mongodb';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const userCollection = new MongoClient(dbUri!).db(dbName).collection('users');

const UserSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email(),
    password: z.string().min(6, {
      message: 'Minimum 6 characters is required',
    }),
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    picture: z.string().default(''),
    socialAuthProvider: z.boolean().default(false),
  })
  .strict();

const UserSchemaPartial = UserSchema.partial();
type UserType = z.infer<typeof UserSchemaPartial>;

const UserModel = Object.create(userCollection);

UserModel.validate = (data: UserType) => {
  const result = UserSchema.required().safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

UserModel.partialValidate = (data: UserType) => {
  const result = UserSchemaPartial.safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

export { UserModel, type UserType };
