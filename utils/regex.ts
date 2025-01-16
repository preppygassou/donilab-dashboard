export const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phonNumber = /^(\(\d{2}\)\s)?\d{5}-\d{4}$/;

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).*$/;
