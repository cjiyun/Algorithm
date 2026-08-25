import re

def solution(new_id):
    rcmd = new_id.lower()
    rcmd = re.sub(r'[^a-z0-9._-]', '', rcmd)
    rcmd = re.sub(r'\.+', '.', rcmd)
    rcmd = rcmd.strip('.')
    
    if not rcmd:
        rcmd = 'a'
    
    rcmd = rcmd[:15].strip('.')
    
    while len(rcmd) < 3:
        rcmd += rcmd[-1]
    
    return rcmd