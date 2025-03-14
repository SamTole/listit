import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export const signup = async (req, res) => {
  const {email, password, name} = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required.");
    }

    const userAlreadyExists = await User.findOne({email})
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      // 24 hours
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
    })

    // Save to database
    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id)

    // 201 status means something was created?
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })

  } catch (error) {
    res.status(400).json({success: false, message: error.message})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please input your credentials.");
    }

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." })
    }

    // Compare method checks if the password from the user matches the one in the db
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials." })
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })

  } catch (error) {
    console.log("Error on login.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const addCategory = async (req, res) => {
  const { categoryName, categoryColor } = req.body

  try {
    if (!categoryName || categoryColor == 'default') {
      throw new Error('Name and color are required.')
    }

    await User.findByIdAndUpdate(req.userId, {$push: {categories: {id: new ObjectId().toString(), name: categoryName, color: categoryColor, dateAdded: new Date()}}})    
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      message: "Category added successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error adding category.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const editCategory = async (req, res) => {
  const { id, categoryName, categoryColor } = req.body

  try {
    if (!categoryName || categoryColor == 'default') {
      throw new Error('Name cannot be blank.')
    }

    await User.findByIdAndUpdate(
      req.userId,
      {$set: {'categories.$[category].name': categoryName, 'categories.$[category].color': categoryColor}},
      {arrayFilters: [{"category.id": req.body.id}]}
    )
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Category edited successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error editing category.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.userId,
      {$pull: {'categories': {id: req.body.id}}},
    )

    await User.findByIdAndUpdate(
      req.userId,
      {$pull: {'tasks': {category: req.body.id}}},
    )

    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error deleting category.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const addTask = async (req, res) => {
  const { taskName, taskDescription, taskCategory, taskDeadline } = req.body

  try {
    if (!taskName || taskCategory == 'default' || !taskDeadline ) {
      throw new Error('Name, category, and deadline cannot be blank.')
    }

    await User.findByIdAndUpdate(
      req.userId,
      {$push: {tasks: {id: new ObjectId().toString(), name: taskName, description: taskDescription, category: taskCategory, deadline: taskDeadline, complete: false}}}
    )    
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Task added successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error adding task.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const editTask = async (req, res) => {
  const { id, taskName, taskDescription, taskCategory, taskDeadline } = req.body

  try {
    if (!taskName || !taskDeadline) {
      throw new Error('Name, category, and deadline cannot be blank.')
    }

    await User.findByIdAndUpdate(
      req.userId,
      {$set: {'tasks.$[task].name': taskName, 'tasks.$[task].description': taskDescription, 'tasks.$[task].category': taskCategory, 'tasks.$[task].deadline': taskDeadline}},
      {arrayFilters: [{"task.id": req.body.id}]}
    )
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Task edited successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error editing task.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const deleteTask = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.userId,
      {$pull: {'tasks': {id: req.body.id}}},
    )
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error deleting task.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const completeTask = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.userId,
      {$set: {'tasks.$[task].complete': true}},
      {arrayFilters: [{"task.id": req.body.id}]}
    )
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Task marked completed.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error marking task complete.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const incompleteTask = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.userId,
      {$set: {'tasks.$[task].complete': false}},
      {arrayFilters: [{"task.id": req.body.id}]}
    )
    const user = await User.findById(req.userId)

    res.status(200).json({
      success: true,
      message: "Task marked incompleted.",
      user: {
        ...user._doc,
        password: null,
      }
    })
  } catch (error) {
    console.log("Error marking task incomplete.");
    res.status(400).json({success: false, message: error.message})
  }
}

export const logout = async (req, res) => {
  // Clear the cookie to logout
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out successfully."})
}

export const checkAuth = async (req, res) => {
  try {
    // The ".select(-password) just deselects the password field"
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." })
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth: ", error);
    res.status(400).json({success: false, message: error.message})
  }
}