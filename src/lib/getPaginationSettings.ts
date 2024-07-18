export default function getPaginationSettings(page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    start,
    end,
  };
}
