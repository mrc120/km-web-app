const getPagination = (page, size) => {
    const limit = size ? +size : 16;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  const getPagingData = (data, page, limit) => {
    const { count: totalItems,
      rows: entries } = data;
    const currentPage = page ? + page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, totalPages, currentPage, entries, };
  };
  module.exports = {
    getPagination,
    getPagingData
};