const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  "use strict";
  var Group = sequelize.define(
    "Group",
    {
      "groupId":{
        "type": DataTypes.INTEGER.UNSIGNED,
        "autoIncrement": true,
        "primaryKey": true
      },
      "datetimeFormed": {
        "type": DataTypes.DATE,
        "defaultValue": Sequelize.NOW,
        "allowNull": false
      },
      "datetimeStart": {
        "type": DataTypes.DATE,
        "allowNull": true
      },
      "totalNoOfPeople": {
        "type": DataTypes.INTEGER.UNSIGNED,
        "allowNull": false
      },
      "isPresent": {
        "type": DataTypes.BOOLEAN,
        "defaultValue": false,
        "allowNull": false
      },
      "callCount": {
        "type": DataTypes.INTEGER.UNSIGNED,
        "allowNull": false,
        "defaultValue": 0
      },
      "datetimeLastCalled": {
        "type": DataTypes.DATE,
        "allowNull": true
      }
    },
    {
      "classMethods": {
        associate: (models) => {
          Group.belongsTo(models.Event, {
            "as": "event",
            "foreignKey": {
              "name": "eventId",
              "allowNull": false
            }
          });

          Group.hasMany(models.Ticket, {
            "as": "tickets",
            "foreignKey": {
              "name": "groupId",
              "allowNull": true
            }
          });
        }
      },
      "timestamps": false
    }
  );

  return Group;
};
