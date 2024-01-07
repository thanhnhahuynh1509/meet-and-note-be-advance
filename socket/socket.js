const { Server } = require("socket.io");
const { verify } = require("../utils/jwt-util");
const {
  getComponentByID,
  listComponentsByParentID,
  createComponent,
  updateComponent,
  deleteComponent,
  deleteComponentsByParent,
} = require("../services/component-service");
const fs = require("fs");
const { createChat, deleteChat } = require("../services/chat-service");

function runSocket(server) {
  const io = new Server(server, {
    cors: "*",
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const user = verify(token);
      socket.user = user;
      next();
    } catch (e) {
      console.log("error", e.message);
      return next(new Error(e.message));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.user;
    console.log(`${user.email} connected`);

    socket.on("join", async ({ room, user }) => {
      socket.join(room);
      console.log(`${user?.email} connected to the room ${room}`);
      const parent = await getComponentByID(room);
      const children = await listComponentsByParentID(room);
      io.to(room).emit("join-successfully", { parent, children });
    });

    socket.on("create-component", async ({ component, room }) => {
      io.to(room).emit("create-component", { id: socket.id, component });
      createComponent(component);
    });

    socket.on("update-component", async ({ component, room }) => {
      io.to(room).emit("update-component", { id: socket.id, component });
      updateComponent(component.id, component);
    });

    socket.on("delete-component", async ({ component, room }) => {
      io.to(room).emit("delete-component", { id: socket.id, component });
      deleteComponent(component.id);

      if (component.type === "File") {
        const filePath = `public/upload/${component.content.filePath}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          fs.rmdirSync(`public/upload/${component.id}`);
        }
      } else if (component.type === "Room") {
        deleteComponentsByParent(component.id);
      }
    });

    socket.on("create-chat", async ({ chat, room }) => {
      io.to(room).emit("create-chat", { id: socket.id, chat });
      createChat(chat);
    });

    socket.on("delete-chat", async ({ chat, room }) => {
      io.to(room).emit("delete-chat", { id: socket.id, chat });
      deleteChat(chat.id);
    });

    socket.on("disconnect", () => {
      console.log(`User ${user.email} disconnected`);
    });
  });
}

module.exports = {
  runSocket,
};
