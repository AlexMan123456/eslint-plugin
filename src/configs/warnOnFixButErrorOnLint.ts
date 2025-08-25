const warnOnFixButErrorOnLint = process.env.ESLINT_MODE === "fix" ? "warn" : "error";

export default warnOnFixButErrorOnLint;
