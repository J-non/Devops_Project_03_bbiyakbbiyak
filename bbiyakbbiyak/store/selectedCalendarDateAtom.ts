import { atom } from "jotai";
import { formatDate } from "../dateFormat/formatDate";

const today = new Date();

const initDate = formatDate(today);

export const selectedCalendarDateAtom = atom(initDate);