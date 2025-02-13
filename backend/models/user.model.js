import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre(
  ["findOneAndDelete", "findByIdAndDelete"],
  async function (next) {
    const user = await this.model.findOne(this.getQuery());

    if (!user) return next();

    await mongoose.model("Photo").deleteMany({ _id: { $in: user.photos } });

    next();
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
