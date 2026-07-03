def solution(h1, m1, s1, h2, m2, s2):
    def to_sec(h, m, s):
        return h * 3600 + m * 60 + s

    def count(t):
        minute = t * 59 // 3600
        hour = t * 719 // 43200

        total = minute + hour
        total -= t // 43200

        return total

    start = to_sec(h1, m1, s1)
    end = to_sec(h2, m2, s2)

    answer = count(end) - count(start)

    if start == 0 or start == 43200:
        answer += 1
    else:
        if (start * 59) % 3600 == 0:
            answer += 1

        if (start * 719) % 43200 == 0:
            answer += 1

        if (start * 59) % 3600 == 0 and (start * 719) % 43200 == 0:
            answer -= 1

    return answer