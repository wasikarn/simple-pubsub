export const randomMachine: () => string = (): string => {
  const machineCodes: string[] = ['001', '002', '003'];
  const random: number = Math.random();

  return machineCodes[Math.floor(random * machineCodes.length)];
};
