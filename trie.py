import string

class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.endOfWord = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.endOfWord
    
def spellCheck(file, trie):
    RED_COLOR = '\033[91m'  # ANSI escape code for red color
    RESET_COLOR = '\033[0m'  # ANSI escape code to reset color
    for line in file:
        words = line.split()
        for word in words:
            pword = word.strip(string.punctuation)
            lword = pword.lower()
            check = trie.search(lword)
            if not trie.search(lword):
                print(RED_COLOR + word + RESET_COLOR, end=' ')
            else:
                print(word, end=' ')
        print()
                    
def main():
    trie = Trie()
    with open("words.txt", "r") as dict_file:
        for line in dict_file:
            word = line.strip()
            trie.insert(word)
            
    with open("document.txt", "r") as document:
        spellCheck(document, trie)
    

if __name__ == "__main__":
    main()
    
