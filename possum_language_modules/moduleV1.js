class Lexer {
    constructor(code) {
        this.code = code;
        this.tokens = [];
        this.position = 0;
    }

    tokenize() {
        const tokenRegex = /\s*(=>|{|}|\(|\)|\+|-|\*|\/|[0-9]+|[a-zA-Z_][a-zA-Z0-9_]*|"[^"]*")\s*/g;
        let match;
        while ((match = tokenRegex.exec(this.code)) !== null) {
            this.tokens.push(match[1]);
        }
        return this.tokens;
    }
}

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    parse() {
        let ast = [];
        while (this.position < this.tokens.length) {
            ast.push(this.parseStatement());
        }
        return ast;
    }

    parseStatement() {
        let token = this.tokens[this.position];

        if (token === "print") {
            this.position++;
            if (this.tokens[this.posiation] === "(") {
                this.position++;
                let value = this.tokens[this.position]; 
                this.position += 2; // Skip `")"`
                return { type: "print", value: value.replace(/"/g, "") };
            }
        }

        return null;
    }
}

class Interpreter {
    execute(ast) {
        for (let node of ast) {
            if (node.type === "print") {
                console.log(node.value);
            }
        }
    }
}
