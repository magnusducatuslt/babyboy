type schema = (counter: number) => any;
export function createSeeds({ schema }: { schema: any }, limit: number) {
  let counter = 0;
  const array = [];
  while (counter < limit) {
    array.push(schema(counter));
    counter += 1;
  }
  return array;
}
