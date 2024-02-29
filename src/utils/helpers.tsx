export const arrayTransform = {
  in: (array: any[]) => {
    return JSON.stringify(array);
  },
  out: (str: string) => {
    return JSON.parse(str);
  }
};
