def solution(bandage, health, attacks):
    t, x, y = bandage
    cur_hp = health
    cur_t = 0
    
    for attack_t, damage in attacks:
        heal_t = attack_t - 1 - cur_t
        
        if heal_t >= 1:
            ex_heal = heal_t // t * y
            cur_hp = min(heal_t * x + ex_heal + cur_hp, health)
        
        cur_hp -= damage
        if cur_hp <= 0: break
        
        cur_t = attack_t
    
    return cur_hp if cur_hp > 0 else -1
        