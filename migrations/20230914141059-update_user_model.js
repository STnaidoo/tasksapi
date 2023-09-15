"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "firstName", "first_name", {
      type: Sequelize.STRING,
    });
    await queryInterface.renameColumn("Users", "lastName", "last_name", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "first_name", "firstName", {
      type: Sequelize.STRING,
    });
    await queryInterface.renameColumn("Users", "last_name", "lastName", {
      type: Sequelize.STRING,
    });
  },
};
