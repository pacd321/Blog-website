import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { createBlogInput } from "@pacd321/medium-backend";
import { updateBlogInput } from "@pacd321/medium-backend";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET : string,
  }
  Variables: {
    userId: string
  }
}>() 

blogRouter.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = await c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set('userId', user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in"
      });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "Invalid token"
    });
  }
});


blogRouter.post('/',async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  const body = await c.req.json()
  const {success} = createBlogInput.safeParse(body)
  try {
    const userId = c.get('userId'); 
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId : Number(userId)
      }
      
    })
    return c.json({
      id : blog.id
    })
  } catch (e) {
    c.status(403);
    return c.json({error : "blog not created"})
  }
  
  
  }
  )
blogRouter.put('/',async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  const body = await c.req.json()
  const {success} = updateBlogInput.safeParse(body)

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
        
      },
      data: {
        title: body.title,
        content : body.content
      }
      
    })
    return c.json({
      id : blog.id
    })
  } catch (e) {
    c.status(403);
    return c.json({error : "blog not created"})
  }
  
  
})
blogRouter.get('/bulk',async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {   
          select: {
            name: true, 
          }
        }
      }
    });

    return c.json({
      blogs
    })
  } catch (e) {
    c.status(403)
    return c.json({
      error : "Something went wrong"
    })
  }
})

blogRouter.get('/:id', async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id : true,
        title: true,
        content: true,
        author: {
          select: {
            name : true,
          }
        }
      }
    })
    return c.json({
      blog
    })
  } catch (e) {
    c.status(403);
    return c.json({error : "blog not created"})
  }
  })


export default blogRouter;