import dayjs from 'dayjs';

export const calculateUserAge = (dateOfBirth: string) =>
  dayjs(new Date()).diff(dayjs(dateOfBirth), 'years');
