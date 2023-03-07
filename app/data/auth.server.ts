import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "./db.server";
import { CustomError } from "~/lib/error";

export async function signup({
  email,
  password,
}: Pick<User, "email" | "password">) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    throw new CustomError(
      "A user with the provided email address already exists.",
      { status: 422 },
    );
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({ data: { email, password: hashedPassword } });
}
