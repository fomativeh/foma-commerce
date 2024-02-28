const {mongoose } = require("mongoose");
const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

module.exports = validateId