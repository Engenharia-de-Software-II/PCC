const generateToken = require('../../src/utils/generateToken');
const jwt = require('jsonwebtoken');
const secret = require('../../src/config/config.json').secret

describe('should test some tokens', () => {
    it('should create a valid token', async () => {
        
        const id = "18y91heud1uid8ausijh1eqw8ui";

        const token = await generateToken({ id });

        let decodedId, erro = null;

        await jwt.verify(token, secret, (err, decoded) => {
            if(err)
                erro = err;
            else
                decodedId = decoded.id;
        });

        expect(decodedId).toBe(id);
        
    });

    it('should create a valid token', async () => {
        
        const id = "18y91heud1uid8ausijh1eqw8ui";

        const token = "token.invalido"

        let decodedId, erro = null;

        await jwt.verify(token, secret, (err, decoded) => {
            if(err)
                erro = err;
            else
                decodedId = decoded.id;
        });

        const error = erro != null ? true : false;

        expect(error).toBe(true);
        
    });
});