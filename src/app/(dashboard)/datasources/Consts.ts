export const name = {
  // regex: RegExp('^[a-zA-Z][a-zA-Z0-9-]*(?<!-)$'),
  // regexMessage:
  //   "Datasource name must start with a letter and contains only letters, numbers or hyphen ('-') characters",
  startsWithLetter: RegExp('^[a-zA-Z].*$'),
  startsWithLetterMessage: 'Datasource name must start with a letter',
  notEndsWithHyphen: RegExp('^(?:.*[^-])$'),
  notEndsWithHyphenMessage: "Datasource name must not end with hyphen ('-') character",
  noMoreThanSingleHyphenInARow: RegExp('^(?!.*--).*$'),
  noMoreThanSingleHyphenInARowMessage: 'Datasource name must not have multiple hyphens in a row',
  minLength: 4,
  minLengthMessage: 'Datasource name must be of minimum length of 4 characters',
  maxLength: 32,
  maxLengthMessage: 'Datasource name must be of maximum length of 32 characters',
  duplicateMessage: 'Datasource name already in use',
};
