// g to kg and ml to L conversion for display.
export default function appropriateUnit(x: number, standardUnit: string) {
  if (x > 999 && standardUnit === "g") {
    return `${x / 1000}kg`;
  }
  if (x > 999 && standardUnit === "ml") {
    return `${x / 1000}l`;
  }
  return `${x}${standardUnit}`;
}

