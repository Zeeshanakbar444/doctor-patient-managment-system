
import {prisma} from "../Db/dbconfig.js"

export const fetchData = async (req, res) => {
  const userData = await prisma.user.findMany();
  return res.json({ messge: "data fetch successfully", data: userData });
};