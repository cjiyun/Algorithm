def to_minute(t):
    return (t // 100) * 60 + (t % 100)

def solution(schedules, timelogs, startday):
    def is_received(i, log):
        limit = to_minute(schedules[i]) + 10
        
        return all(
            to_minute(l) <= limit for j, l in enumerate(log)
            if (j + startday - 1) % 7 not in (5, 6)
        )

    received = [
        i + 1 for i, log in enumerate(timelogs)
        if is_received(i, log)
    ]
    
    return len(received)
        