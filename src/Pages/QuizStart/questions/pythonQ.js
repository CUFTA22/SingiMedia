const python = [
  {
    question: "Functions are defined with?",
    a1: { a: "func keyword.", T: false },
    a2: { a: "def keyword.", T: true },
    a3: { a: "function keyword.", T: false },
    a4: { a: "const keyword.", T: false },
  },
  {
    question: " What is split used for?",
    a1: {
      a: "split() method is used to separate a given list in Python.",
      T: false,
    },
    a2: {
      a: "split() method is used to separate a given string in Python.",
      T: true,
    },
    a3: { a: "split() method is used to cut an array in half.", T: false },
    a4: {
      a: "split() method is used to remove last item from dict.",
      T: false,
    },
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
        while a < n:
            print(a, end=' ')
            a, b = b, a+b
        print()
    fib(1000)
`,
    a1: { a: "There's an error at line 3.", T: false },
    a2: { a: "There's an error at line 6.", T: false },
    a3: { a: "There's an error at line 7.", T: false },
    a4: { a: "There's no error in the code.", T: true },
  },
  {
    code: `
    # Analyze code
    a = lambda x,y : x+y
    print(a(5, 6))
`,
    a1: { a: "We need to define x and y first.", T: false },
    a2: { a: "lambda(x,y): x+y is  syntax.", T: false },
    a3: { a: "Lambda keyword doesn't exist in python.", T: false },
    a4: { a: "There's no error in the code, prints 11.", T: true },
  },
  {
    code: `
    # Output?
    import array as arr
    My_Array=arr.array('i',[1,2,3,4,5])
    print(My_Array[::-1])
`,
    a1: { a: "array( [ 5, 4, 3, 2, 1 ], 'i' ).", T: false },
    a2: { a: "array( 'i', [ 1, 2, 3, 4 ] ).", T: false },
    a3: { a: "array( 'i', [ 5, 4, 3, 2, 1 ] ).", T: true },
    a4: { a: "array( [ 1, 2, 3, 4, 5 ], 'i' ).", T: false },
  },
  {
    code: `
    # Output?
    stg='ABCD'
    print(stg.lowercase())
`,
    a1: { a: "Abcd.", T: false },
    a2: { a: "abcd.", T: false },
    a3: { a: "stg=abcd.", T: true },
    a4: {
      a: "AttributeError: 'str' object has no attribute 'lowercase'.",
      T: false,
    },
  },
  {
    code: `
    # How to get length of stg?
    stg='ABCD'
`,
    a1: { a: "stg.length", T: false },
    a2: { a: "stg.len", T: false },
    a3: { a: "length(stg)", T: false },
    a4: { a: "len(stg)", T: true },
  },
  {
    code: `
    # Output?
    import array as arr
    a=arr.array('d', [1.1 , 2.1 ,3.1] )
    a.append(3.4)
    print(a)
`,
    a1: { a: "array( 'd', [ 3.4, 1.1, 2.1, 3.1 ] )", T: false },
    a2: { a: "array( 'd', 3.4, [ 1.1, 2.1, 3.1 ] )", T: false },
    a3: { a: "array( 'd', [ 1.1, 2.1, 3.1 ], 3.4 )", T: false },
    a4: { a: "array( 'd',  [ 1.1, 2.1, 3.1, 3.4 ] )", T: true },
  },
  {
    code: `
    # Output?
    import array as arr
    a=arr.array('d', [1.1 , 2.1 ,3.1] )
    a.insert(1, 3.8)
    print(a)
`,
    a1: { a: "array('d', [ 1.1, 3.8, 2.1, 3.1 ] )", T: true },
    a2: { a: "array('d', [ 1.1, 2.1, 3.1, 1, 3.8 ] )", T: false },
    a3: { a: "array('d', [ 1.1, 2.1, 3.1 ], 1, 3.8 )", T: false },
    a4: { a: "array('d', [ 1, 1.1, 2.1, 3.1, 3.8 ] )", T: false },
  },
  {
    code: `
    # What data type is variable x?
    x = { 'Country': 'India', 'Capital': 'New Delhi' }
`,
    a1: { a: "Dictionary", T: true },
    a2: { a: "Object", T: false },
    a3: { a: "JSON", T: false },
    a4: { a: "List", T: false },
  },
  {
    code: `
    # What data type is variable x?
    x = [ 'Red', 'Green', 'Blue' ]
`,
    a1: { a: "Dictionary", T: false },
    a2: { a: "List", T: true },
    a3: { a: "Tuple", T: false },
    a4: { a: "Set", T: false },
  },
  {
    code: `
    # What data type is variable x?
    x = ( "apple", "banana", "cherry" )
`,
    a1: { a: "Dictionary", T: false },
    a2: { a: "Tuple", T: false },
    a3: { a: "List", T: true },
    a4: { a: "Set", T: false },
  },
  {
    code: `
    # Output?
    list1 = [2, 33, 222, 14, 25]
    print(list1[-2])
`,
    a1: { a: "14", T: true },
    a2: { a: "33", T: false },
    a3: { a: "array( [ 2, 33, 222 ] )", T: false },
    a4: { a: "array( [ 222, 14, 25 ] )", T: false },
  },
  {
    code: `
    # Output?
    print(5//2)
`,
    a1: { a: "25", T: false },
    a2: { a: "2.5", T: false },
    a3: { a: "2", T: true },
    a4: { a: "SyntaxError: invalid syntax", T: false },
  },
  {
    code: `
    # Output?
    def multiply(a, b = 8):
        return a * b
    
    print(multiply(12))
`,
    a1: { a: "94", T: false },
    a2: { a: "98", T: false },
    a3: { a: "96", T: true },
    a4: { a: "SyntaxError: invalid syntax", T: false },
  },
  {
    code: `
    # Output?
    def calculate_sum(a, *args):
        sum = a
        for i in args:
            sum += i
        return sum

    print(calculate_sum(10))
`,
    a1: { a: "10", T: true },
    a2: { a: "0", T: false },
    a3: { a: "SyntaxError: invalid syntax", T: false },
    a4: {
      a:
        "TypeError: calculate_sum() missing 1 required positional argument: 'args'",
      T: false,
    },
  },
  {
    code: `
    # Output?    
    print(33 == 33.0)
`,
    a1: { a: "True", T: true },
    a2: { a: "False", T: false },
    a3: { a: "33", T: false },
    a4: { a: "SyntaxError: invalid syntax", T: false },
  },
  {
    question: "Syntax error in python is detected by _______ at _______?",
    a1: { a: "compiler / compile time.", T: false },
    a2: { a: "interpreter / run time.", T: true },
    a3: { a: "compiler / run time.", T: false },
    a4: { a: "interpreter / compile time.", T: false },
  },
  {
    code: `
    # Output?    
    def func(n):
        if(n==1):
            return 1;
        else:
            return(n+func(n-1))
    print(func(4))
`,
    a1: { a: "12", T: false },
    a2: { a: "9", T: false },
    a3: { a: "11", T: false },
    a4: { a: "10", T: true },
  },
  {
    question: "What command is used to insert 6 in a list 'L' at 3rd position?",
    a1: { a: "L.insert(2, 6)", T: true },
    a2: { a: "L.insert(3, 6)", T: false },
    a3: { a: "L.add(3, 6)", T: false },
    a4: { a: "L.append(2, 6)", T: false },
  },
  {
    code: `
    # Output?    
    print( 'search'.find(' S ') )
`,
    a1: { a: "s", T: false },
    a2: { a: "-1", T: false },
    a3: { a: "' '", T: false },
    a4: { a: "None of the above", T: true },
  },
  {
    code: `
    # Output?    
    print( min('hello world') )
`,
    a1: { a: "e", T: false },
    a2: { a: "a blank space character", T: false },
    a3: { a: "w", T: false },
    a4: { a: "None of the above", T: true },
  },
];

export default python;
