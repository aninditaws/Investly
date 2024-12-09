const supabase = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Mendapatkan semua pengguna
const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
  res.status(200).json(data);
};

// Menambah pengguna baru dengan username, email, dan password
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password sebelum menyimpannya
  const hashedPassword = await bcrypt.hash(password, 10);

  // Menyimpan pengguna baru dengan username, email, dan hashed password
  const { data, error } = await supabase
    .from("users")
    .insert([{ name: username, email: email, password: hashedPassword }]);

  if (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ error: "Failed to add user" });
  }

  res.status(201).json(data); // Mengirimkan data pengguna yang baru ditambahkan
};

const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Cek apakah pengguna ada di database dengan username atau email
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},name.eq.${name}`)
    .single();

  if (!user || error) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Membuat token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token: token, id: user.id });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
};
