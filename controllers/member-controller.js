// controllers/member-controller.js

const db = require('../models/db');

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await db.member.findMany();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

exports.createMember = async (req, res, next) => {
  const { memberIdCard, address, name } = req.body;

  // ดึง userId จากข้อมูลผู้ใช้ที่ได้เข้าสู่ระบบ
  const userId = req.user.id;

  try {
    const newMember = await db.member.create({
      data: { userId, memberIdCard, address, name },
    });

    res.json(newMember);
  } catch (error) {
    next(error);
  }
};

exports.updateMember = async (req, res, next) => {
  const memberId = parseInt(req.params.id);
  const { memberIdCard, address, name } = req.body;

  try {
    const updatedMember = await db.member.update({
      where: { id: memberId },
      data: { memberIdCard, address, name },
    });

    res.json(updatedMember);
  } catch (error) {
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  const memberId = parseInt(req.params.id);

  try {
    await db.member.delete({
      where: { id: memberId },
    });

    res.json({ message: 'ลบสมาชิกเรียบร้อยแล้ว' });
  } catch (error) {
    next(error);
  }
};
