const bcrypt = require("bcryptjs");

async function hashPassword() {
  // Make sure to use the exact password you want to set for moderators
  const plainTextPassword = "Iammoderator1212";
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    console.log("--- PASSWORD HASHING COMPLETE ---");
    console.log("Your secure hashed password is:\n");
    console.log(hashedPassword);
    console.log(
      "\nCopy this entire hash (starting with $2a$...) and paste it into your Firestore document at config/passwords in the moderatorPassword field."
    );
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword();
