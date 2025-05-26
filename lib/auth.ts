// "use server"

// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
// import { PrismaClient } from "@prisma/client"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

// const prisma = new PrismaClient()
// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// interface SignUpData {
//   name: string
//   email: string
//   password: string
// }

// interface SignInData {
//   email: string
//   password: string
// }

// export async function signUp({ name, email, password }: SignUpData) {
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   })

//   if (existingUser) {
//     throw new Error("User with this email already exists")
//   }

//   const hashedPassword = await bcrypt.hash(password, 10)

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//       provider: "EMAIL",
//     },
//   })

//   return { id: user.id, name: user.name, email: user.email }
// }

// export async function signIn({ email, password }: SignInData) {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   })

//   if (!user || !user.password) {
//     throw new Error("Invalid email or password")
//   }

//   const passwordValid = await bcrypt.compare(password, user.password)

//   if (!passwordValid) {
//     throw new Error("Invalid email or password")
//   }

//   const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" })

//     ; (await cookies()).set("auth-token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7,
//       path: "/",
//     })

//   return { id: user.id, name: user.name, email: user.email }
// }

// export async function signOut() {
//   (await cookies()).delete("auth-token")
//   redirect("/login")
// }

// export async function getUserProfile() {
//   const token = (await cookies()).get("auth-token")?.value

//   if (!token) {
//     throw new Error("Not authenticated")
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as {
//       id: string
//       name: string
//       email: string
//     }

//     return {
//       id: decoded.id,
//       name: decoded.name,
//       email: decoded.email,
//     }
//   } catch (error) {
//     throw new Error("Invalid token")
//   }
// }

// export async function requireAuth() {
//   try {
//     return await getUserProfile()
//   } catch (error) {
//     redirect("/login")
//   }
// }
