T = 10

for tc in range(1, T + 1):
    _ = int(input())
    calc = input()
    postfix = []
    op_stack = []

    priority = {'+': 1, '*': 2}

    for v in calc:
        if v.isdigit():
            postfix.append(int(v))
        elif v == '(':
            op_stack.append(v)
        elif v == ')':
            while op_stack and op_stack[-1] != '(':
                postfix.append(op_stack.pop())
            op_stack.pop()
        else:
            while op_stack and op_stack[-1] != '(' and priority[op_stack[-1]] >= priority[v]:
                postfix.append(op_stack.pop())
            op_stack.append(v)

    while op_stack:
        postfix.append(op_stack.pop())

    nums = []

    for v in postfix:
        if v == '+':
            nums.append(nums.pop() + nums.pop())
        elif v == '*':
            nums.append(nums.pop() * nums.pop())
        else:
            nums.append(v)

    print(f'#{tc} {nums[-1]}')
