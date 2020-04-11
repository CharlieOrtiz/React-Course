// We write the tests for the Modash library in
// this file in the Unit Testing chapter
import Modash from './Modash';

describe('Modash', ()=>{
    describe('truncate()', ()=>{
        const string = 'web development is awesome'

        it('truncates a string', ()=>{
            expect(Modash.truncate(string, 18)).toEqual('web development is...');
        }) ;
    });
});

