var passwordValidator = require("password-validator");
var schema = new passwordValidator();

schema
  .is()
  .min(5)
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Password"]); // Blacklist these values

console.log(schema.validate("validPASS123"));
exports.schema = schema;
