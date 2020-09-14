export async function islegallyСapable(date: string) {
  return (
    new Date(date.split(".").reverse().join(".")) <= new Date("09.08.2002")
  );
}

export function isResident(state: string) {
  return state === "BY";
}
