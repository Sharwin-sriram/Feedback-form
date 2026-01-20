export function serverError(req,res) {
  return res.status(500).send({ message: "Internal Server Error" });
}
