import { type Key } from "react";

export const KEYEXCLUDEMESSAGE = "👆 Above element is excluded from being animated"
export const FORBIDDENELEMENTMESSAGE = (name:Key | null):string => `Forbidden element encountered: ${name} \nStopping traversal!`
export const FUNCTIONCOMPONENTMESSAGE = (name: string):string => `Function component encountered: ${name}`

export function logSuccess(message:string):void {
  /* eslint-disable no-console -- It is fine for console.log as this is a function that only runs when logging is enabled */
  console.log('%cSuccess: %s', 'color: green; font-weight: bold;', message);
}
export function logWarning(message:string):void {
  /* eslint-disable no-console -- It is fine for console.log as this is a function that only runs when logging is enabled */
  console.log('%cWarning: %s', 'color: darkorange; font-weight: bold;', message);
}
