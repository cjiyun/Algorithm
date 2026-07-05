def solution(message, spoiler_ranges):
    words = []
    i = 0
    
    while i < len(message):
        if message[i] == ' ':
            i += 1
            continue
            
        start = i
        while i < len(message) and message[i] != ' ':
            i += 1
        end = i - 1
        
        word = message[start: end + 1]
        words.append((start, end, word))
    
    normal_word = set()
    spoiler_words = [[] for _ in range(len(spoiler_ranges))]
    
    for start, end, word in words:
        spoiler_index = 0
        
        first = -1
        last = -1
        for spoiler in spoiler_ranges:
            a, b = spoiler
            
            if b < start:
                continue
            if a > end:
                break
        
            if first == -1:
                first = spoiler_index
            last = spoiler_index
            spoiler_index += 1
        
        if first == -1:
            normal_word.add(word)
        else:
            spoiler_words[last].append(word)
    
    important_word = set()
    
    for spoiler_word in spoiler_words:
        for word in spoiler_word:
            if word not in normal_word:
                important_word.add(word)
    
    return len(important_word)