export default function iife(func: any) {
  return `(${func.toString()})()`;
}
