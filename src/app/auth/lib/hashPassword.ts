// function to hash password with a secure word

import { pbkdf2 } from "crypto";

export function hashPassword(
  password: string,
  secureWord: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, secureWord, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString("hex"));
      }
    });
  });
}
