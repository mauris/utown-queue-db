const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  "use strict";
  var Ticket = sequelize.define(
    "Ticket",
    {
      "ticketId":{
        "type": DataTypes.INTEGER.UNSIGNED,
        "autoIncrement": true,
        "primaryKey": true
      },
      "datetimeRequested": {
        "type": DataTypes.DATE,
        "defaultValue": Sequelize.NOW,
        "allowNull": false
      },
      "datetimeStart": {
        "type": DataTypes.DATE,
        "allowNull": true
      },
      "noOfPeople": {
        "type": DataTypes.INTEGER.UNSIGNED,
        "allowNull": false
      },
      "isActive": {
        "type": DataTypes.BOOLEAN,
        "defaultValue": true,
        "allowNull": false
      }
    },
    {
      "classMethods": {
        associate: (models) => {
          Ticket.belongsTo(models.User, {
            "as": "user",
            "foreignKey": {
              "name": "userId",
              "allowNull": false
            }
          });

          Ticket.belongsTo(models.Event, {
            "as": "event",
            "foreignKey": {
              "name": "eventId",
              "allowNull": false
            }
          });

          Ticket.belongsTo(models.Group, {
            "as": "group",
            "foreignKey": {
              "name": "groupId",
              "allowNull": true
            }
          });
        }
      },
      "timestamps": false,
      "indexes": [
        {
          "name": "idx_event_user_active_ticket",
          "fields": ["eventId", "userId", "isActive"],
          "unique": false
        },
        {
          "name": "idx_event_active_group_people",
          "fields": ["eventId", "isActive", "groupId", {attribute: 'noOfPeople', order: 'DESC'],
          "unique": false
        }
      ]
    }
  );

  return Ticket;
};
