export function generateReceiptNumber(reference: string) {
  const today = new Date();

  const yyyy = today.getFullYear();

  const mm = String(today.getMonth() + 1).padStart(2, "0");

  const dd = String(today.getDate()).padStart(2, "0");

  return `SHF-${yyyy}${mm}${dd}-${reference.slice(-6).toUpperCase()}`;
}
