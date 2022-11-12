import Users from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = Users.findAll({ attributes: ["id", "user"] });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req: Request, res: Response) => {
  const { user, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "password and confirnPassword do not match" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      user: user,
      password: hashPassword,
    });
    res.json({ msg: "Resgistration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  try {
    const User = await Users.findAll({
      where: {
        user: user,
      },
    });
    const match = await bcrypt.compare(password, User[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password!" });
    const UserId = User[0].id;
    const UserName = User[0].user;
    const acessToken = jwt.sign(
      { UserId, UserName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { UserId, UserName },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refreshToken: refreshToken },
      {
        where: {
          id: UserId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ acessToken });
  } catch (error) {
    res.status(404).json({ msg: "User not found !" });
  }
};

export const Logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const User = await Users.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!User[0]) return res.sendStatus(204);
  const UserId = User[0].id;
  await Users.update(
    { refreshToken: null },
    {
      where: {
        id: UserId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
