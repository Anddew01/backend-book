const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const password = bcrypt.hashSync('123456');

const userData = [
  { username: 'andy', password, email: 'andy@ggg.mail' },
  { username: 'bobby', password, email: 'bobby@ggg.mail' },
  { username: 'candy', password, email: 'candy@ggg.mail' },
]


const memberData = [
  { userId: 1, memberIdCard: 'member_id_1', name: 'dew',address: 'address_1'},
  { userId: 2, memberIdCard: 'member_id_2', name: 'dew',address: 'address_2' },
];

const bookData = [
  { title: 'Book 2', author: 'Author 2', genre: 'Non-Fiction', pageCount: 250 },
  { title: 'Book 3', author: 'Author 3', genre: 'Mystery', pageCount: 300 },
];

const borrowData = [
  { bookId: 2, userId: 1, borrowDate: new Date("2024-02-22T03:41:48.464Z"), status: 'borrowed' },
  { bookId: 3, userId: 2, borrowDate: new Date("2024-02-23T03:41:48.464Z"), status: 'borrowed' },
];

  const run = async () => {
    await prisma.user.createMany({
      data: userData})

    await prisma.member.createMany({
      data: memberData,
    });

    await prisma.book.createMany({
      data: bookData,
    });

    await prisma.borrow.createMany({
      data: borrowData,
    });
  };

  run()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

