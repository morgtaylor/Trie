class trieNode {
    constructor() {
            this.children = {}; // Object to store child nodes
            this.isEndOfWord = false; // Flag to indicate if it's the end of a word
        }
}

class Trie {
    constructor() {
        this.root = new TrieNode(); // Root node of the trie
    }
    // Insert a word into the trie
    insert(word) {
        let node = this.root;
        for (let char of word) {
            // If the character doesn't exist in the current node's children, create a new node
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            // Move to the next node
            node = node.children[char];
        }
        // Mark the end of the word
        node.isEndOfWord = true;
    }
    // Search for a word in the trie
    search(word) {
        let node = this.root;
        for (let char of word) {
            // If the character doesn't exist in the current node's children, the word doesn't exist
            if (!node.children[char]) {
                return false;
            }
            // Move to the next node
            node = node.children[char];
        }
        // If the end of the word is marked, it's a valid word
        return node.isEndOfWord;
    }
    // Check if a node has any children
    hasChildren(node) {
        return Object.keys(node.children).length !== 0;
    }
    // Recursive function to delete a word from the trie
    deleteHelper(word, node, depth) {
        if (!node) return false;
        // Base case: if we've reached the end of the word
        if (depth === word.length) {
            // If the current node is not the end of a word, do not delete
            if (!node.isEndOfWord) return false;
            // Unset the end of word flag
            node.isEndOfWord = false;
            // If the current node has no other children, it's safe to delete
            return !this.hasChildren(node);
        }
        const char = word[depth];
        const nextNode = node.children[char];
        // Recursively call deleteHelper for the next node
        const shouldDeleteCurrentNode = this.deleteHelper(word, nextNode, depth + 1);

        // If shouldDeleteCurrentNode is true, delete the child node
        if (shouldDeleteCurrentNode) {
            delete node.children[char];
            // If the current node is not the end of a word and has no other children, it's safe to delete
            return !node.isEndOfWord && !this.hasChildren(node);
        }

        return false;
    }
    // Delete a word from the trie
    delete(word) {
        this.deleteHelper(word, this.root, 0);
    }
}







def starts_with(self, prefix):
    node = self.root
    for char in prefix:
        if char not in node.children:
            return False
        node = node.children[char]
    return True
    
def suggestSimilar(self, word, max_suggestions=5):
    suggestions = []
    node = self.root
    prefix = ""
    for char in word:
        if char not in node.children:
            break
        node = node.children[char]
        prefix += char
    self.trav(node, prefix, suggestions, max_suggestions)
    return suggestions

def trav(self, node, prefix, suggestions, max_suggestions):
    if len(suggestions) >= max_suggestions:
        return
    if node.endOfWord:
        suggestions.append(prefix)
    for char, child in node.children.items():
        self.trav(child, prefix + char, suggestions, max_suggestions)
    if not node.children:
        suggestions.append(prefix)
