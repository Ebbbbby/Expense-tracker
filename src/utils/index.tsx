export const formatPrice = (number: number | undefined) => {
  return `\u20A6 ${
    number
      ? Number(number)
          // .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : 0
  }`;
};

export const formatDate = (dateString: string) =>  {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}