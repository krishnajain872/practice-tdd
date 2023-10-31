"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("transactions", {
      fields: ["account_id"],
      type: "foreign key",
      name: "account_details",
      references: {
        table: "accounts",
        field: "id",
      },
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["trans_ref_id"],
      type: "foreign key",
      name: "transaction_ref_details",
      references: {
        table: "transactions",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("transactions", "account_details");
    await queryInterface.removeConstraint(
      "transactions",
      "transaction_ref_details"
    );
  },
};