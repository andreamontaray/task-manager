export function calculateDaysUntil(dueDate: string) {
  const today = new Date(Date.now()).setHours(0, 0, 0, 0);
  const due = new Date(dueDate).setHours(23, 59, 59, 999);

  return Math.floor((due - today) / 86400000); // Convert ms to days
}
