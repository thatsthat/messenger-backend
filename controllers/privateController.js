const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

// Handle Post create on POST.
exports.create = asyncHandler(async (req, res, next) => {
  await prisma.message.create({
    data: {
      sender: { connect: { id: req.user.id } },
      receiver: { connect: { id: +req.params.rxId } },
      content: req.body.content,
    },
  });
  return res.json({ message: "Message sent" });
});

exports.list = asyncHandler(async (req, res, next) => {
  const messages = await prisma.message.findMany({
    orderBy: {
      timeSent: "asc",
    },
    where: {
      OR: [
        { senderId: req.user.id, receiverId: +req.params.rxId },
        { receiverId: req.user.id, senderId: +req.params.rxId },
      ],
    },
    select: {
      content: true,
      receiverId: true,
      senderId: true,
    },
  });
  return res.send(messages);
});

exports.userList = asyncHandler(async (req, res, next) => {
  const users = await prisma.user.findMany({
    where: {
      id: { not: req.user.id },
    },
  });
  return res.send(users);
});
