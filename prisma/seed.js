import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  const test1 = await prisma.User.create({
   
    
    data: {
      email: 'zd@prisma.io',
      lastname: 'ed',
      username: 'tot',
      password: 'kjdsdkjhsds',
      toolId:1,
      
      
    },
  })

  

  console.log({ test1 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })