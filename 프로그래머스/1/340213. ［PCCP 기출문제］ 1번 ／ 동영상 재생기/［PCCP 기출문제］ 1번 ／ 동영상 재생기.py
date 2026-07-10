def solution(video_len, pos, op_start, op_end, commands):
    video_len = int(video_len.split(':')[0]) * 60 + int(video_len.split(':')[1])
    pos = int(pos.split(':')[0]) * 60 + int(pos.split(':')[1])
    op_start = int(op_start.split(':')[0]) * 60 + int(op_start.split(':')[1])
    op_end = int(op_end.split(':')[0]) * 60 + int(op_end.split(':')[1])
    
    for command in commands:
        if op_start <= pos <= op_end:
            pos = op_end
        
        if command == 'next':
            pos += 10
            
            if pos >= video_len:
                pos = video_len
        
        elif command == 'prev':
            pos -= 10
            
            if pos <= 0:
                pos = 0
        
        if op_start <= pos <= op_end:
            pos = op_end
    
    return ':'.join([str(x).zfill(2) for x in divmod(pos, 60)])