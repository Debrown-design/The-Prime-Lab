
import { QuizQuestion } from "../types";

export const generateMathQuestion = (gradeLevel: number): QuizQuestion => {
  let q = "";
  let answer = 0;
  let options: string[] = [];
  
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Grade Logic
  switch (gradeLevel) {
    case 1: // Basic Addition (0-20)
      {
        const a = randomInt(1, 10);
        const b = randomInt(1, 10);
        q = `${a} + ${b} = ?`;
        answer = a + b;
      }
      break;
    case 2: // Subtraction (0-50)
      {
        const a = randomInt(10, 50);
        const b = randomInt(1, a); // No negatives yet
        q = `${a} - ${b} = ?`;
        answer = a - b;
      }
      break;
    case 3: // Multiplication (Basic tables)
      {
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        q = `${a} × ${b} = ?`;
        answer = a * b;
      }
      break;
    case 4: // Division (Basic)
      {
        const b = randomInt(2, 9);
        const ans = randomInt(2, 9);
        const a = b * ans;
        q = `${a} ÷ ${b} = ?`;
        answer = ans;
      }
      break;
    case 5: // Mixed Ops & Larger Numbers
      {
        const a = randomInt(10, 50);
        const b = randomInt(2, 5);
        const c = randomInt(1, 20);
        q = `(${a} × ${b}) + ${c} = ?`;
        answer = (a * b) + c;
      }
      break;
    case 6: // Exponents & Order of Ops
      {
        const a = randomInt(2, 5);
        const b = randomInt(2, 3);
        const c = randomInt(1, 10);
        q = `${a}^${b} + ${c} = ?`;
        answer = Math.pow(a, b) + c;
      }
      break;
    case 7: // Integers (Negatives)
      {
        const a = randomInt(1, 20);
        const b = randomInt(25, 50);
        q = `${a} - ${b} = ?`;
        answer = a - b;
      }
      break;
    case 8: // Basic Algebra (Solve for x): ax + b = c
      {
        const x = randomInt(2, 12);
        const a = randomInt(2, 5);
        const b = randomInt(1, 20);
        const c = (a * x) + b;
        q = `Solve for x: ${a}x + ${b} = ${c}`;
        answer = x;
      }
      break;
    case 9: // Slope/Linear Equations
      {
        const m = randomInt(2, 5);
        const x = randomInt(2, 5);
        const b = randomInt(1, 10);
        q = `If y = ${m}x + ${b}, what is y when x = ${x}?`;
        answer = (m * x) + b;
      }
      break;
    case 10: // Geometry (Area/Circumference - approximated for int)
      {
        // Area of square
        const s = randomInt(5, 15);
        q = `Area of a square with side ${s}?`;
        answer = s * s;
      }
      break;
    case 11: // Quadratics (Simple factoring): x^2 = a
      {
        const x = randomInt(2, 12);
        q = `If x² = ${x*x} and x > 0, what is x?`;
        answer = x;
      }
      break;
    case 12: // Logarithms/Trig (Simplified)
      {
        const base = 2;
        const exp = randomInt(3, 6);
        const val = Math.pow(base, exp);
        q = `log₂(${val}) = ?`;
        answer = exp;
      }
      break;
    default:
      {
         const a = randomInt(1, 10);
         const b = randomInt(1, 10);
         q = `${a} + ${b} = ?`;
         answer = a + b;
      }
  }

  // Generate Options
  options = [answer.toString()];
  while (options.length < 4) {
    const offset = randomInt(-5, 5);
    const wrong = answer + offset;
    if (wrong !== answer && !options.includes(wrong.toString())) {
      options.push(wrong.toString());
    }
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return {
    question: q,
    options,
    correctAnswerIndex: options.indexOf(answer.toString())
  };
};
