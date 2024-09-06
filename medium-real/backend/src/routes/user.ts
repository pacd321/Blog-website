import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { signupInput } from '@pacd321/medium-backend'
import { signinInput } from "@pacd321/medium-backend";

const userRouter = new Hono < {
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET : string
  }
}>()

userRouter.post('/signup', async(c) => {
  const prisma = new PrismaClient({datasourceUrl : c.env.DATABASE_URL}).$extends(withAccelerate())
  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)
  if(success) {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password : body.email
      }
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({jwt})
  } else  {
    console.log(c.error)
    return c.json({error : "Input not correct"})
  }
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const {success} = signinInput.safeParse(body)
  if (!success) {
    c.status(403);
     return c.json({error :  "User not found"})
  }
  const jwt = await sign({ id: body.id}, c.env.JWT_SECRET)
  return c.json({jwt})
})



export default userRouter;