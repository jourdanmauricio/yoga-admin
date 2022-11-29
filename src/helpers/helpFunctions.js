function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
export function formatDateTable(date) {
  const newDate = [
    padTo2Digits(new Date(date).getDate()),
    padTo2Digits(new Date(date).getMonth() + 1),
    new Date(date).getFullYear(),
  ].join("/");

  return newDate === "31/12/1969" ? "" : newDate;
}

export function formatDate(date) {
  return [
    new Date(date).getFullYear(),
    padTo2Digits(new Date(date).getMonth() + 1),
    padTo2Digits(new Date(date).getDate()),
  ].join("-");
}

export function getAge(date) {
  const today = new Date();
  const birthday = new Date(date);
  const age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}
