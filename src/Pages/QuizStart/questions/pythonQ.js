const python = [
  {
    question: "What's the data flow in React?",
    a1: { a: "React follows uni-directional data flow.", T: true },
    a2: { a: "React follows bi-directional data flow.", T: false },
    a3: { a: "React uses Star-Shaped data flow.", T: false },
    a4: { a: "React follows the Flux architecture.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    // Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    // Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
  {
    code: `
    # Analyze code
    def fib(n):
        a, b = 0, 1
        while a < n
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 5.", T: true },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: false },
  },
];

export default python;
