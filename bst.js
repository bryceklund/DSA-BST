class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.left= null
        this.right = null
    }
    insert(key, value) {
        if (this.key == null) {
            this.key = key
            this.value = value
        } else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            } else {
                this.left.insert(key, value)
            }
        } else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this)
            } else {
                this.right.insert(key, value)
            }
        }
    }
    find(key) {
        if (this.key == key) {
            return this.value
        } else if (key < this.key && this.left) {
            return this.left.find(key)
        } else if (key > this.key && this.right) {
            return this.right.find(key)
        } else {
            throw new Error('Key Error! >:—————(')
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin()
                this.key = successor.key
                this.value = successor.value
                successor.remove(successor.key)
            } else if (this.left) {
                this._replaceWith(this.left)
            } else if (this.right) {
                this._replaceWith(this.right)
            } else {
                this._replaceWith(null)
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key)
        } else if (key > this.key && this.right) {
            this.right.remove(key)
        } else {
            throw new Error('Key Error! >:————(')
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            } else if (this == this.parent.right) {
                this.parent.right = node
            }
            if (node) {
                node.parent = this.parent
            }
        } else {
            if (node) {
                this.key = node.key
                this.value = node.value
                this.right = node.right
                this.left = node.left
            } else {
                this.key = null
                this.value = null
                this.right = null
                this.left = null
            }
        }
    }
    _findMin() {
        if (!this.left) {
            return this
        }
        return this.left._findMin()
    }
}

const BST = new BinarySearchTree()
const nums = [3,1,4,6,9,2,5,7]
const lets = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']
nums.forEach(n => BST.insert(n, 1))
//lets.forEach(l => BST.insert(l))
//console.log(BST.key, BST.left.key, BST.right.key)
function tree(t) {
    if (!t) {
        return 0
    }
    return tree(t.left) + t.value + tree(t.right)
}

function isBst(tree) {
    if (!tree) {
        return
    }
    if (tree.left < tree && tree.right > tree) {
        return isBst()
    }
}

function thirdLargest(tree) {
    if (!tree.right) {
        return tree.parent.key
    }
    return thirdLargest(tree.right)
}

//console.log(thirdLargest(BST))

function isBalanced(tree) {
    if (tree) {
        if (tree.left && !tree.right) {
            return false
        } else if (tree.right && !tree.left) {
            return false
        } else {
            for (const i of [tree.left, tree.right]) {
                return isBalanced(i)
            }
        }
    }
    return true
}
console.log(isBalanced(BST))