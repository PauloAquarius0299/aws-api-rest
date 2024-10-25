import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { User } from '../domian/user.domian';

const { ENVIRONMENT = 'dev' } = process.env;

interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly client: DynamoDBClient) {}

  public async createUser(user: User): Promise<void> {
    const command = new PutItemCommand({
      TableName: `${ENVIRONMENT}-users`,
      Item: marshall({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    try {
      await this.client.send(command);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const command = new QueryCommand({
      TableName: `${ENVIRONMENT}-users`,
      IndexName: 'email_index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: marshall({ ':email': email }),
    });

    try {
      const response = await this.client.send(command);
      if (response.Items?.length === 0) {
        return undefined;
      }
      const userRecord = unmarshall(response.Items[0]) as UserRecord;
      return this.mapUserFromUserRecord(userRecord);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user by email', error);
    }
  }

  public async getUserByID(userID: string): Promise<User | undefined> {
    const command = new GetItemCommand({
      TableName: `${ENVIRONMENT}-users`,
      Key: marshall({ id: userID }),
    });

    try {
      const response = await this.client.send(command);
      if (!response.Item) {
        return undefined;
      }
      const userRecord = unmarshall(response.Item) as UserRecord;
      return this.mapUserFromUserRecord(userRecord);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch user by ID', error);
    }
  }

  private mapUserFromUserRecord(record: UserRecord): User {
    return new User({
      id: record.id,
      email: record.email,
      password: record.password,
      name: record.name,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
    });
  }
}
