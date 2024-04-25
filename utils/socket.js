import conn from "../config/dbConfig.js";
import { Server } from "socket.io";

const socket = async (server) => {
  const io = new Server(server);

  io.on("connection", async (socket) => {
    try {
      let userNotification = `select c.id as id, d.name as customerName, b.start_time as startTime, 
      b.end_time as endTime from owner_has_garages as a join slot_master as b join appointments as 
      c join users as d 
      on a.garage_id = b.garage_id and b.id = c.slot_id and c.customer_id = d.id 
      where a.garage_id = 1 and owner_id = 2 and c.status = 1;`;

      const [notification] = await conn.execute(
        userNotification,
        [],
        (err, res) => {
          if (err) throw err;
          return res;
        }
      );

      socket.emit("notification", notification);
    } catch (err) {}
  });

  io.on("chat", (msg) => {});

  return io;
};

export default socket;
