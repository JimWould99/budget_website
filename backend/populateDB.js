const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  /*const user = await prisma.users.create({
    data: {
      first_name: "Stephen",
      surname: "Worths",
      username: "bw99",
      password: "password",
    },
  });*/
  // purge Database option
  /*await prisma.expense.deleteMany({});

  await prisma.budget.deleteMany();

  await prisma.dataSnapshot.deleteMany();

  await prisma.users.deleteMany({});*/
  // console.log("deleteExpenses", deleteExpense);
  //let data = await prisma.dataSnapshot.findMany({});
  // console.log("data", data);
  // note this has to be done when db empty
  /*const date = await prisma.lastChecked.create({
    data: {
      id: "3b1ac58b-4b33-46f7-8202-53d4898635c1",
      date: new Date(),
    },
  });*/
  // console.log("date", date);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
