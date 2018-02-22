async function findOrCreate(condition) {
  const object = await this.findOne(condition);

  if (object) return object;

  return this.create(condition);
}


module.exports = {
  findOrCreate,
};
