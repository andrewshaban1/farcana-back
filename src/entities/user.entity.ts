import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

import { sequelize } from '../db/init';
import { Data } from './data.entity';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id?: number;
  declare username: string;
  declare email: string;
  declare password_hash: string;
  declare created_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password_hash: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    created_at: DataTypes.DATE,
  },
  {
    tableName: 'Users',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

User.hasMany(Data, {
  sourceKey: 'id',
  foreignKey: 'user_id',
});
