export default (house) =>
  encodeURIComponent(
    `${house.sidoName.substring(0, 2)} ${house.apartmentName} 아파트`
  );
