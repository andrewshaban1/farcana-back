import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from 'sequelize';

import { sequelize } from '../db/init';
import { User } from './user.entity';

export class Data extends Model<
  InferAttributes<Data>,
  InferCreationAttributes<Data>
> {
  declare id?: number;
  declare user_id: ForeignKey<number>;
  declare data: string;
  declare created_at?: Date;
}

Data.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    created_at: DataTypes.DATE,
  },
  {
    tableName: 'Data',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

// Data.belongsTo(User);
