import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

type DateParam = string | Date;

export const str2DateFormat = (date: DateParam, format = "L") => {
  return dayjs(date).format(format);
};

export const str2Date = (str: string) => {
  return dayjs(str).toDate();
};

export const diff = (
  d1: DateParam,
  d2: DateParam,
  unit:
    | "day"
    | "week"
    | "quarter"
    | "month"
    | "year"
    | "hour"
    | "minute"
    | "second"
    | "millisecond",
) => dayjs(d1).diff(d2, unit);

export const toRelativeTime = (
  date: DateParam,
  relative: "from" | "now" = "from",
) => {
  const dateObj = dayjs(date);

  if (!dateObj.isValid()) {
    return "";
  }

  return relative === "from" ? dateObj.fromNow() : dateObj.toNow();
};
