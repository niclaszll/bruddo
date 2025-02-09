import dayjs from 'dayjs';

export const calculateAge = (dateOfBirth: string) =>
  dayjs(new Date()).diff(dayjs(dateOfBirth), 'years');
