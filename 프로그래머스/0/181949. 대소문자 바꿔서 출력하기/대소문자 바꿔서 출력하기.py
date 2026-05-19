str = input()
print(''.join(char.upper() if char.islower() else char.lower() for char in str))