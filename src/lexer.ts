export type Token = {
  type: TokenType;
  value: string;
};

export enum TokenType {
  STRING = "string",
  START_QUOTE = "start_quote",
  END_QUOTE = "end_quote",
  NUMBER = "number",
  BRACKET = "bracket",
  OPERATOR = "operator",
  INPUT_VARIABLE = "input_variable",
  FUNCTION = "function",
  COMMA = "comma",
  WHITESPACE = "whitespace",
}

export const isTokenValue = (token: Token): boolean => {
  if (!token) {
    return false;
  }
  if (
    token.type === TokenType.NUMBER ||
    token.type === TokenType.END_QUOTE ||
    (token.type === TokenType.BRACKET &&
      (token.value === ")" || token.value === "}"))
  ) {
    return true;
  }
  return false;
};

export const removeWhitespaceTokens = (tokens: Array<Token>): Array<Token> => {
  return tokens.filter((t) => t.type !== TokenType.WHITESPACE);
};

export default class Lexer {
  rawFormula: string;
  currPosition = 0;

  constructor(rawFormula: string) {
    this.rawFormula = rawFormula;
  }

  matchPattern(regex: RegExp, skipAhead: boolean): string | null {
    const regexMatch: Array<string> | null = this.rawFormula
      .substring(this.currPosition)
      .match(regex);
    if (!regexMatch || regexMatch.length > 1) {
      return null;
    }
    if (skipAhead) {
      this.currPosition += regexMatch[0].length;
    }

    return regexMatch[0];
  }

  getLatestValue() {
    return this.rawFormula[this.currPosition];
  }

  moveForward() {
    this.currPosition += 1;
  }

  getToken(previousToken: Token): Token | null {
    const value: string = this.getLatestValue();
    const previousTokenType: string | undefined = previousToken?.type;

    if (value === '"') {
      this.moveForward();
      return {
        value,
        type:
          previousTokenType === TokenType.STRING ||
          previousTokenType === TokenType.START_QUOTE
            ? TokenType.END_QUOTE
            : TokenType.START_QUOTE,
      };
    }

    if (previousTokenType === TokenType.START_QUOTE) {
      const findEndQuote: string | null = this.matchPattern(
        /^[^"]+(?=")/,
        true,
      );
      if (findEndQuote) {
        return {
          value: findEndQuote,
          type: TokenType.STRING,
        };
      } else {
        // go to the end of the formula, couldn't find the close quote
        return {
          value: this.matchPattern(/^[^"]+/, true) || "",
          type: TokenType.STRING,
        };
      }
    }

    const numberMatch: string | null = this.matchPattern(
      /^[-]?\d*\.?\d+/,
      false,
    );

    if (numberMatch) {
      if (
        value === "-" &&
        previousTokenType !== TokenType.OPERATOR &&
        isTokenValue(previousToken)
      ) {
        this.moveForward();
        return {
          value,
          type: TokenType.OPERATOR,
        };
      } else {
        this.moveForward();
        this.matchPattern(/^[-]?\d*\.?\d+/, true);
        return {
          value: numberMatch,
          type: TokenType.NUMBER,
        };
      }
    }

    if (["&", "*", "-", "+", "/"].includes(value)) {
      this.moveForward();
      return {
        value,
        type: TokenType.OPERATOR,
      };
    }

    if (
      previousTokenType === TokenType.BRACKET &&
      previousToken.value === "{"
    ) {
      const variableMatch: string | null = this.matchPattern(
        /^[^[}]+(?=})/,
        true,
      );
      if (variableMatch) {
        return {
          value: variableMatch,
          type: TokenType.INPUT_VARIABLE,
        };
      }
    }

    const functionMatch = this.matchPattern(/^[a-zA-Z_]\w*(?=\()/, true);

    if (functionMatch) {
      return {
        value: functionMatch,
        type: TokenType.FUNCTION,
      };
    }

    if (["(", ")", "{", "}"].includes(value)) {
      this.moveForward();
      return {
        value,
        type: TokenType.BRACKET,
      };
    }

    if (value === ",") {
      this.moveForward();
      return {
        value,
        type: TokenType.COMMA,
      };
    }

    const whiteSpaceMatch = this.matchPattern(/^ +/, true);

    if (whiteSpaceMatch) {
      return {
        value: whiteSpaceMatch,
        type: TokenType.WHITESPACE,
      };
    }
    this.moveForward();

    return null;
  }

  lex(): Array<Token> {
    const tokens: Array<Token> = [];

    while (this.currPosition < this.rawFormula.length) {
      const nonWhitespaceTokens = removeWhitespaceTokens(tokens);
      const previousToken = nonWhitespaceTokens[nonWhitespaceTokens.length - 1];
      const newToken = this.getToken(previousToken);

      if (newToken) {
        tokens.push(newToken);
      }
    }
    return tokens;
  }
}
