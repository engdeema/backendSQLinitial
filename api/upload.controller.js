exports.uploadFile = async (req, res, next) => {
  try {
    console.log("heres");

    const files = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/${file.path}`
    ); // we put map because it is an multiple of files not one file anymore
    return res.json({ files });
  } catch (error) {}
};
