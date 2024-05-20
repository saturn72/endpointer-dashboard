const nameRules = {
  // regex: RegExp('^[a-zA-Z][a-zA-Z0-9-]*(?<!-)$'),
  // regexMessage:
  //   "Datasource name must start with a letter and contains only letters, numbers or hyphen ('-') characters",
  shouldStartsWithLetter: RegExp('^[a-zA-Z].*$'),
  shouldStartsWithLetterMessage: 'Datasource name must start with a letter',
  shouldNotEndsWithHyphen: RegExp('^(?:.*[^-])$'),
  shouldNotEndsWithHyphenMessage: "Datasource name must not end with hyphen ('-') character",
  noMoreThanSingleHyphenInARow: RegExp('^(?!.*--).*$'),
  noMoreThanSingleHyphenInARowMessage: 'Datasource name must not have multiple hyphens in a row',
  minLength: 4,
  minLengthMessage: 'Datasource name must be of minimum length of 4 characters',
  maxLength: 32,
  maxLengthMessage: 'Datasource name must be of maximum length of 32 characters',
  duplicateMessage: 'Datasource name already in use',
  requiredMessage: 'Datasource name is required',
};

export function nameValidator(name?: string, preserveNames: () => string[] = () => []): string | undefined {
  if (!name || name.length == 0) {
    return nameRules.requiredMessage;
  }

  const length = name.length;
  if (length < nameRules.minLength) {
    return nameRules.minLengthMessage;
  }

  if (!nameRules.shouldStartsWithLetter.test(name)) {
    return nameRules.shouldStartsWithLetterMessage;
  }

  if (!nameRules.noMoreThanSingleHyphenInARow.test(name)) {
    return nameRules.noMoreThanSingleHyphenInARowMessage;
  }
  
    if (preserveNames().includes(name)) {
      return nameRules.duplicateMessage;
    }

  if (length > nameRules.maxLength) {
    return nameRules.maxLengthMessage;
  }

  if (!nameRules.shouldNotEndsWithHyphen.test(name)) {
    return nameRules.shouldNotEndsWithHyphenMessage;
  }
}
