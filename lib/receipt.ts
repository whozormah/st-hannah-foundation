function datePart(date = new Date()) {
  const yyyy = date.getFullYear();

  const mm = String(date.getMonth() + 1).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}${mm}${dd}`;
}

export function generateReceiptNumber(reference: string) {
  return `SHF-${datePart()}-${reference.slice(-6).toUpperCase()}`;
}

/**
 * Reference for submissions that have no payment provider behind them.
 * Called from route handlers only, so the randomness stays on the server and
 * the value a submitter is shown is the one recorded in the notification.
 */
export function generateReferenceNumber(prefix = "SHF") {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `${prefix}-${datePart()}-${random}`;
}
