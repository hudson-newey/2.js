import { HtmlTemplate } from "../types/dom";

export function map<T, U>(arr: T[], callback: (item: T) => U): HtmlTemplate {
  return arr.map(callback).join("");
}
