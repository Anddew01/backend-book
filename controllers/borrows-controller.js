const db = require('../models/db');

exports.borrowBook = async (req, res, next) => {
  const { memberId, bookId } = req.body;
  try {

    const book = await db.books.findUnique({ where: { BookID: bookId } });
    if (!book) {
      throw new Error('Book not found');
    }

    const availableForBorrow = book.Borrows.length === 0 || book.Borrows.every(borrow => borrow.Status === 'Returned');
    if (!availableForBorrow) {
      throw new Error('Book is not available for borrowing');
    }

    const borrowRecord = await db.borrows.create({
      data: {
        MemberID: memberId,
        BookID: bookId,
        BorrowDate: new Date(),
        Status: 'Borrowed',
      },
    });

    res.json({ msg: 'Book borrowed successfully', result: borrowRecord });
  } catch (err) {
    next(err);
  }
};

exports.returnBook = async (req, res, next) => {
  const { borrowingId } = req.params;
  try {

    const borrowingRecord = await db.borrows.findUnique({ where: { BorrowingID: +borrowingId } });
    if (!borrowingRecord) {
      throw new Error('Borrowing record not found');
    }

    const updatedBorrowRecord = await db.borrows.update({
      where: { BorrowingID: +borrowingId },
      data: {
        ReturnDate: new Date(),
        Status: 'Returned',
      },
    });

    res.json({ msg: 'Book returned successfully', result: updatedBorrowRecord });
  } catch (err) {
    next(err);
  }
};
