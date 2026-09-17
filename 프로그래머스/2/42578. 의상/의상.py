from collections import Counter
from math import prod

def solution(clothes):
    cnts = Counter(category for _, category in clothes)
    
    return prod(cnt + 1 for cnt in cnts.values()) - 1