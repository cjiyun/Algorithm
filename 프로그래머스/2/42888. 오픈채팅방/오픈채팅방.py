def solution(record):
    users = {}
    logs = []
    
    for r in record:
        parts = r.split()
        status = parts[0]
        uid = parts[1]
        
        if status == 'Enter':
            name = parts[2]
            users[uid] = name
            logs.append((uid, status))
        elif status == 'Leave':
            logs.append((uid, status))
        else:
            name = parts[2]
            users[uid] = name
    
    return [f"{users[uid]}님이 들어왔습니다." if status == 'Enter' else f"{users[uid]}님이 나갔습니다." for uid, status in logs]