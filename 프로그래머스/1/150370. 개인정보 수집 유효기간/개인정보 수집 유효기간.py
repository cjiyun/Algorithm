def to_day(date):
    y, m, d = map(int, date.split('.'))
    return y * 12 * 28 + m * 28 + d

def solution(today, terms, privacies):
    terms_dic = {term[0]: int(term[2:]) * 28 for term in terms}
    today = to_day(today)
    
    expired = [
        i + 1 for i, privacy in enumerate(privacies)
        if to_day(privacy[:-2]) + terms_dic[privacy[-1]] <= today
    ]
    
    return expired