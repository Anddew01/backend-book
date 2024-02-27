const db = require('../models/db');

exports.getBorrows = async (req, res, next) => {
  try {
    const borrows = await db.borrow.findMany();
    res.json(borrows);
  } catch (err) {
    next(err);
  }
};

exports.getBorrowById = async (req, res, next) => {
  try {
    const { borrowingId } = req.params;
    const borrow = await db.borrow.findUnique({
      where: { id: +borrowingId },
    });
    if (!borrow) {
      return res.status(404).json({ msg: 'ไม่พบข้อมูลการยืมคืน' });
    }
    res.json(borrow);
  } catch (err) {
    next(err);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const { memberId, bookId } = req.body;
    const bookIdNumber = parseInt(bookId, 10);

    const borrowRecord = await db.borrow.create({
      data: {
        user: { connect: { id: +memberId } },
        book: { connect: { id: bookIdNumber } },
        status: 'ยืม',
        borrowDate: new Date().toISOString(),
      },
    });

    res.json({ msg: 'ยืมหนังสือเรียบร้อยแล้ว', result: borrowRecord });
  } catch (err) {
    next(err);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const { borrowingId } = req.params;

    const updatedBorrowRecord = await db.borrow.update({
      where: { id: +borrowingId },
      data: {
        returnDate: new Date().toISOString(),
        status: 'คืน',
      },
    });

    res.json({ msg: 'คืนหนังสือสำเร็จแล้ว', result: updatedBorrowRecord });
  } catch (err) {
    next(err);
  }
};

exports.updateBorrow = async (req, res, next) => {
  try {
    const { borrowingId } = req.params;
    const { status } = req.body;

    const updatedBorrowRecord = await db.borrow.update({
      where: { id: +borrowingId },
      data: { status },
    });

    res.json({ msg: 'อัพเดตข้อมูลการยืมคืนสำเร็จ', result: updatedBorrowRecord });
  } catch (err) {
    next(err);
  }
};

exports.deleteBorrow = async (req, res, next) => {
  try {
    const { borrowingId } = req.params;

    await db.borrow.delete({
      where: { id: +borrowingId },
    });

    res.json({ msg: 'ลบข้อมูลการยืมคืนสำเร็จ' });
  } catch (err) {
    next(err);
  }
};


