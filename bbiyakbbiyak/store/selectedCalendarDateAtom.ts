import { atom } from "jotai";
import { formatDate } from "../dateFormat/formatDate";

interface IDateForm {
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number
}

const today = new Date();

const initDate = formatDate(today);

export const selectedCalendarDateAtom = atom<IDateForm>(initDate);