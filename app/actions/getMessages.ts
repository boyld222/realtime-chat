import prisma from '@/app/libs/prismadb'

const getMessages = async (conversationId : string) => {
    try {
        const messages = await prisma.message.findMany({
           where: {
            conversationId: conversationId
           },
           orderBy: {
            createdAt: "asc"
           },
           include: {
            sender:true,
            seen: true
           }
        })
      
        return messages

    } catch (error: any) {
        return []
    }
}

export default getMessages