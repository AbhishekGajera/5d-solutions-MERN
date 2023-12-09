module.exports = (mongoose) => {
  const momentSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      tags: [
        {
          type: String,
          default: [],
        },
      ],
      images: [
        {
          type: String,
          default: [],
        },
      ],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );

  momentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Moment = mongoose.model("Moment", momentSchema);
  return Moment;
};
