const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Handle Post create on POST.
exports.create = asyncHandler(async (req, res, next) => {
  console.log(prisma);
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
    where: {
      senderId: req.user.id,
      receiverId: +req.params.rxId,
    },
  });
  return res.send(messages);
});
