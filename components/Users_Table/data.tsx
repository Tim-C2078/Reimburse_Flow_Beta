export type Users = {
  id: string;
  username: string;
  password: string;
  email: string;
  role:
    | "admin"
    | "store"
    | "finance"
    | "area coach"
    | "regional coach"
    | "supreme admin";
  status: "online" | "offline";
  date: Date;
};

export const usersData: Users[] = [
  {
    id: "728ed52f",
    username: "Jamal Anchor",
    password: "ops@Lead",
    email: "jamalachor@mascofoods.com",
    role: "admin",
    status: "offline",
    date: new Date("2026-04-10"),
  },
  {
    id: "489e1d42",
    username: "Eunice Coffie",
    password: "finance@admin",
    email: "finance13@mascofoods.com",
    role: "finance",
    status: "online",
    date: new Date(),
  },
  {
    id: "489e1d42",
    username: "Alex",
    password: "areacoach@admin1",
    email: "alex@mascofoods.com",
    role: "area coach",
    status: "online",
    date: new Date("2026-04-20"),
  },
  {
    id: "489e1d42",
    username: "Keshap",
    password: "finance@admin4",
    email: "keshap@mascofoods.com",
    role: "finance",
    status: "offline",
    date: new Date("2026-04-19"),
  },
  {
    id: "489e1d42",
    username: "Vincent",
    password: "opsCo@admin1",
    email: "assisstantopscoordinator@mascofoods.com",
    role: "supreme admin",
    status: "online",
    date: new Date("2026-04-11"),
  },
  {
    id: "489e1d42",
    username: "Jeffery",
    password: "auditors@admin1",
    email: "jeffery@mascofoods.com",
    role: "admin",
    status: "online",
    date: new Date("2026-04-09"),
  },
  {
    id: "489e1d42",
    username: "Atta Kofi",
    password: "regionalcoach@admin1",
    email: "attakofi@mascofoods.com",
    role: "regional coach",
    status: "offline",
    date: new Date("2026-04-02"),
  },
  {
    id: "489e1d42",
    username: "Fred",
    password: "areacoach@admin2",
    email: "fred@mascofoods.com",
    role: "area coach",
    status: "offline",
    date: new Date("2026-04-15"),
  },
  {
    id: "489i1d42",
    username: "KFC OSU",
    password: "store@adminkgh001",
    email: "kfcosu@mascofoods.com",
    role: "store",
    status: "online",
    date: new Date("2026-04-15"),
  },
  {
    id: "489t1d42",
    username: "KFC BEKWAI",
    password: "store@adminkgh014",
    email: "kfcbekwai@mascofoods.com",
    role: "store",
    status: "online",
    date: new Date("2026-04-15"),
  },
];
