import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; // Asegúrate de que esta ruta apunte a tu conexión real

const Log = sequelize.define("Log", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  log: {
    type: DataTypes.STRING, 
    allowNull: false
  }
}, {
  tableName: "logs", // Nombre de la tabla en la BD
  timestamps: true   // Crea 'createdAt' automáticamente (muy útil para saber cuándo ocurrió el log)
});

// IMPORTANTE: Exportación por defecto para que autocrud.js lo lea bien
export default Log;