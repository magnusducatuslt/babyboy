import * as ErrorsList from "./constantsError";

export function identificateError(message: string, onDefault: string) {
  //@ts-ignore
  const isInclude = Object.values(ErrorsList).includes(message);
  return isInclude ? message : onDefault;
}
