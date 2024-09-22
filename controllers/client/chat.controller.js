const { isObjectIdOrHexString } = require("mongoose");
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
//[GET] /chat
module.exports.index = async (req,res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    // SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu vào database
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save();
            // Trả DATA về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                fullName: fullName,
                userId: userId,
                content: content
            });
        })
    });
    // End SocketIo

    // Lấy DATA từ DataBase
    const chats =  await Chat.find({
        deleted: false
    })
    for(const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");
        chat.infoUser = infoUser;
    }
    // End Lấy DATA từ DataBase
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",
        chats: chats
    })
}