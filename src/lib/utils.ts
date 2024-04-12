import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imagePlaceHolder = "/EventImages/ImagePlaceholder.webp";

export const MAX_FILE_SIZE = 5; // 5MB
export const MAX_FILE_SIZE_FULL = MAX_FILE_SIZE * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const acceptImage = ACCEPTED_IMAGE_TYPES.map(
  (type) => `.${type.split("/")[1]}`
).join(",");

export class DateUtils {
  // Function to convert day into ordinal number
  private static getOrdinalNum(n: number): string {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }

  static formatEventDate(date: string, time: string): string {
    const eventDate = new Date(date + time);
    let options: any = {
      year: "numeric",
      month: "short", // get full month name
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    let datetime = eventDate.toLocaleDateString("en-In", options);
    let [datePart, timePart] = datetime.split(",");
    let [day, month, year] = datePart.split(" ");

    day = DateUtils.getOrdinalNum(parseInt(day)); // convert day into ordinal number
    return `${day} ${month}, ${year} @ ${timePart}`;
  }
}

export const validateText = (event: any) => {
  const regex = /^[A-Za-z0-9#!&.,@':"\(\)\[\]\{\}\\\|\+ ]*$/;
  event.target.value = event.target.value
    .split("")
    .filter((char: any) => regex.test(char))
    .join("");
  // if (!regex.test(event.key)) {
  //   event.preventDefault();
  // }
};
