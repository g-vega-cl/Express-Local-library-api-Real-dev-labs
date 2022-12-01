import Lexer, { removeWhitespaceTokens, Token, TokenType } from "./lexer";
import { validate, ValidationError } from "./validation";

type InputVariables = Record<string, string>;

interface IHandleSubstitute {
  initialString: string;
  oldString: string;
  newString: string;
}

const handleAnd = (string1: string, string2: string): string => {
  return string1 + string2;
}

const handleConcat = (initialString: string, strings: string[]): string => {
  return initialString.concat(...strings);
}

const handleSubstitute = ({initialString, oldString, newString}: IHandleSubstitute): string => {
  return initialString.replace(oldString,newString);
}

const recursiveResult = (tokens: Array<Token>, tokensLength: number, tokenIndex: number, parent: any): any => {
  if(tokenIndex === tokensLength){
    console.log("PARENT", parent);
    parent.children.forEach((element: any) => {
      console.log("children", element);
    });
    return parent;
  }
  const currentToken = tokens[tokenIndex];
  console.log("CURRENT TOKEN ", currentToken);
  // BASE CASE.
  if(currentToken.type === 'string'){
      const nextToken = tokensLength > tokenIndex + 2 && tokens[tokenIndex+2];
      if(nextToken && nextToken.value === "&" && nextToken.type === "function"){
        console.log("& IN NEXT 2");
        recursiveResult(tokens, tokensLength, tokenIndex+1, parent);
      } else {
        console.log("PUSH STRING");
        parent.children[tokenIndex] = ({
          item: currentToken,
          children: {},
        })
        return recursiveResult(tokens, tokensLength, tokenIndex+1, parent);
      }
  }

  if(currentToken.type === 'function'){
    console.log("TYPE FUNCTION");
    const newNode = {
      item: currentToken,
      children: {},
    }
    parent.children.push(newNode)
    return recursiveResult(tokens, tokensLength, tokenIndex+1,newNode)
  }

  console.log("NO STRING OR FUNCTION");
  return recursiveResult(tokens, tokensLength, tokenIndex+1,parent);
}

function compute(tokens: Array<Token>, inputVariables: InputVariables): string {
  /**
   *
   * !!!!! WRITE YOUR SOLUTION HERE !!!!!!!
   *
   */
  recursiveResult(tokens,tokens.length,0,{
    item: { value: 'root', type: TokenType.START_QUOTE },
    children: []
  })

  console.log("Running compute on tokens:");
  console.log(tokens);
  console.log("Input variables: ");
  console.log(inputVariables);

  let result = "This should be the result of the operation";

  return result;
}

export default function computeFormula(
  formula: string,
  inputVariables: InputVariables,
): string {
  const lexer = new Lexer(formula);
  const nonWhitespaceTokens = removeWhitespaceTokens(lexer.lex());
  const errors: Array<ValidationError> = validate(nonWhitespaceTokens);

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  return compute(nonWhitespaceTokens, inputVariables);
}

// Modify these two values to test different formulas
const formula = 'CONCAT("a ", "word")';
const inputVariables = {};

console.log(`Computing formula: ${formula}`);
const result = computeFormula(formula, inputVariables);
console.log(`Result: ${result}`);
