import Sequelize from 'sequelize';
import UserModel from '../models/user';
import OrbitModel from '../models/orbit';
import InvitationModel from '../models/invitation';

import {
  development,
} from '../config/config';

const registeredModels = [
  UserModel,
  OrbitModel,
  InvitationModel,
];

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  port: development.port,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const models = {};

registeredModels.forEach((model) => {
  models[model.name] = model.init(sequelize);
});

Object.keys(models).filter((k) => !!models[k].associate).forEach((k) => {
  models[k].associate(models);
});

const { User } = models;

const a = async () => {
  const b = await User.scope('admin').findOne({
    where: { id: 1 },
    include: ['invitationsSent', 'invitationsReceived'],
  });
  console.log(b);
};

a();
