import { prisma } from "../Db/dbconfig.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existing) {
    return res.json({ message: "already add" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({ newUser });
};

// user get
export const getAll = async (req, res) => {
  const userData = await prisma.user.findMany();
  return res.json({ messge: "data fetch successfully", data: userData });
};

//update User
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      name: name,
      password: password,
      email: email,
    },
  });


  return res.json({message:"data updated successfuuly"});
};


//delete user


export const deleteUser = async (req,res)=>{
    const userId = req.params.id;
    await prisma.user.delete({where:{id:Number(userId),}})
    return res.json({message:"user delete successfully"})
}

export const userProfile =async(req,res)=>{
    const userId  = req.params.id;

    let profileData = await prisma.user.findUnique({
        where:{id:Number(userId)}
    })
    return res.json({message:"user profile get " , profileData})
}