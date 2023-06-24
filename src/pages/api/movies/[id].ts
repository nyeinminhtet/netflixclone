import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);
    const { id } = req.query;

    if (typeof id !== "string") {
      throw new Error("Invalid Id");
    }
    if (!id) {
      throw new Error("Invalid Id");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new Error("Invalid movie");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
