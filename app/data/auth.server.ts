import { User } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { hash, compare } from "bcryptjs";
import { prisma } from "./db.server";
import { CustomError } from "~/lib/error";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

async function createUserSession(userId: string, path: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(path, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  const userId = session.get("userId");
  if (!userId) return null;
  return userId;
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
  return userId;
}

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
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return createUserSession(user.id, "/expenses");
}

export async function login({
  email,
  password,
}: Pick<User, "email" | "password">) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    throw new CustomError("Could not log in with the provided credentials.", {
      status: 401,
    });
  }

  const isPasswordCorrect = await compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new CustomError("Could not log in with the provided credentials.", {
      status: 401,
    });
  }

  return createUserSession(existingUser.id, "/expenses");
}
