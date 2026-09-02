import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Get All Users Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("Delete User Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log("Update User Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        message: "No contact found",
      });
    }

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Get All Contacts Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { getAllUsers,updateUser,
  deleteUser, getAllContacts };