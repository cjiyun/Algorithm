import re

def solution(babbling):
    regex = re.compile('^(aya|ye|woo|ma)+$')
    return sum(1 for e in babbling if regex.match(e))