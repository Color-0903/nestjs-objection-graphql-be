import * as bcryptjs from 'bcryptjs';
import { format } from 'date-fns';
import { ASEET_TYPE } from '../constants/enum';

export const hashPassword = async (password: string) => {
  const saltOrRounds = 10;
  const hash = await bcryptjs.hash(password, saltOrRounds);
  return hash;
};

export const generateFromDate = (fromDate: Date) => {
  const result = format(fromDate, 'yyyy-MM-dd');
  return result + ' 00:00:00';
};

export const generateToDate = (toDate: Date) => {
  const result = format(toDate, 'yyyy-MM-dd');
  return result + ' 23:59:00';
};

export function normalizeEmailAddress(input: string): string {
  return input.trim().toLowerCase();
}

export function getAssetType(mimeType: string): ASEET_TYPE {
  const type = mimeType.split('/')[0];
  switch (type) {
    case 'image':
      return ASEET_TYPE.IMAGE;
    case 'video':
      return ASEET_TYPE.VIDEO;
    default:
      return ASEET_TYPE.BINARY;
  }
}

/**
 * Normalizes a string to replace non-alphanumeric and diacritical marks with
 * plain equivalents.
 * Based on https://stackoverflow.com/a/37511463/772859
 */
export function normalizeString(input: string, spaceReplacer = ' '): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[!"£$%^&*()+[\]{};:@#~?\\/,|><`¬'=‘’]/g, '')
    .replace(/\s+/g, spaceReplacer);
}
