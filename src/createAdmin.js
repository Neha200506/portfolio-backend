require("dotenv").config();

const bcrypt = require("bcryptjs");
const supabase = require("./config/supabase");

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      console.error(
        "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required in .env",
      );
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password_hash: passwordHash,
          role: "admin",
        },
      ])
      .select("id, name, email, role")
      .single();

    if (error) {
      console.error("Error creating admin:", error.message);
      return;
    }

    console.log("Admin created successfully:");
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

createAdmin();
