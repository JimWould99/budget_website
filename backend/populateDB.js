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

  const user = await prisma.budget.deleteMany();
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
