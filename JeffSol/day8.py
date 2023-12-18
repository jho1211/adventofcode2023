import re
import math

file_name = "inputs/day8.txt"

def lcm(steps):
    return math.lcm(*steps)

with open(file_name) as file:
    rows = [row.strip() for row in file.readlines()]
    instructions = rows[0]
    
    d = {}
    cur_nodes = []
    
    #construct a map
    for row in rows[2:]:
        key, values = row.split(" = ")
        left, right = re.findall(r'\w\w\w', values)
        
        d[key] = {}
        d[key]["L"], d[key]["R"] = left, right
        # d[key]["R"] = right
        
        if key[-1] == "A":
            cur_nodes.append(key)
    
    next_instruc = 0
    steps = 0
    print(cur_nodes)
    num_steps = []
    
    for node in cur_nodes:
        next_node = node
        while True:
            next_node = d[next_node][instructions[next_instruc]]
            steps += 1
            if next_node.endswith("Z"):
                print("FOUND in " + str(steps) + " steps.")
                num_steps.append(steps)
                steps = 0
                next_instruc = 0
                break
            else:
                next_instruc += 1

                if next_instruc == len(instructions):
                    next_instruc = 0
    print(lcm(num_steps))