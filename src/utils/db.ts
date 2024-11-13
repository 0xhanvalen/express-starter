// kind of a stupid file, but why in the fuck would you do this on every route in your crud app ykwim

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
