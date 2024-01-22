const Hapi = require('@hapi/hapi');
const {Sequelize} = require('sequelize');

/**
 * Initializes the application.
 *
 * @return {Promise<void>} Promise that resolves when the initialization is complete.
 */
const init = async () => {

  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql' 
  });

  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};