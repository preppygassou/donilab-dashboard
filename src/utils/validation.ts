export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

export function validateUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePhone(phone: string) {
  const re = /^\+?[\d\s-]{10,}$/;
  return re.test(phone);
}

export function validatePostalCode(code: string) {
  const re = /^[A-Z\d]{3,10}$/i;
  return re.test(code);
}

export function validateMultiLang(value: any) {
  return value && typeof value === 'object' && value.en && value.fr;
}

export function validateSlug(slug: string) {
  const re = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return re.test(slug);
}