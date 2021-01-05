export const calculateNewPrice = (old, name, op) => {
  let val;
  switch (name) {
    case "salad":
      val = 0.5;
      break;
    case "cheese":
      val = 0.3;
      break;
    case "meat":
      val = 1.2;
      break;
    case "bacon":
      val = 0.8;
      break;
    case "sauce":
      val = 0.2;
      break;
    default:
      break;
  }

  if (op === "add") {
    return parseFloat((old + val).toFixed(1));
  } else {
    return parseFloat((old - val).toFixed(1));
  }
};
