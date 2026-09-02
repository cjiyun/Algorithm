import sys
sys.setrecursionlimit(10**6)

class Node:
    def __init__(self, n, x, y):
        self.n = n
        self.x = x
        self.y = y
        self.left = None
        self.right = None

def insert(parent, child):
        if child.x < parent.x:
            if parent.left is None:
                parent.left = child
            else:
                insert(parent.left, child)
        else:
            if parent.right is None:
                parent.right = child
            else:
                insert(parent.right, child)

def solution(nodeinfo):
    nodes = []
    ans = [[], []]
    
    for i, (x, y) in enumerate(nodeinfo):
        nodes.append(Node(i + 1, x, y))
    
    nodes.sort(key=lambda node: (-node.y, node.x))
    root = nodes[0]
    
    for node in nodes[1:]:
        insert(root, node)

    def preorder(node):
        if node is None:
            return
        
        ans[0].append(node.n)
        preorder(node.left)
        preorder(node.right)

    def postorder(node):
        if node is None:
            return

        postorder(node.left)
        postorder(node.right)
        ans[1].append(node.n)
    
    preorder(root)
    postorder(root)
    
    return ans