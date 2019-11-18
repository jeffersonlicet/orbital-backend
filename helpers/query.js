
const DEFAULT_LIMIT = 20;

export default (query = {}) => {
  const count = query.count || DEFAULT_LIMIT;
  const page = query.page || 0;

  return {
    count,
    offset: parseInt(page, 10) * parseInt(count, 10),
  };
};
