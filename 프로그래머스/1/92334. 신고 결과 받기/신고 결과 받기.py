from collections import Counter

def solution(id_list, report, k):
    report_details = {user: set() for user in id_list}
    for detail in report:
        reporter, reported = detail.split(' ')
        report_details[reporter].add(reported)
    
    report_cnt = Counter()
    for v in report_details.values():
        for r in v:
            report_cnt[r] += 1
    
    suspended = set()
    for u, cnt in report_cnt.items():
        if cnt >= k:
            suspended.add(u)
    
    ans = []
    for u, v in report_details.items():
        ans.append(len(v & suspended))
    
    return ans