// We write the tests for the Modash library in
// this file in the Unit Testing chapter
import Modash from './Modash';

describe('Modash', ()=>{
    describe('truncate()', ()=>{
        const string = 'web development is awesome'

        it('truncates a string', ()=>{
            expect(Modash.truncate(string, 18)).toEqual('web development is...');
        });
    });

    describe('capitalize()', ()=> {
        it('capitalizes first letter, lowercases the rest', ()=> {
            const string = 'web development is just the beginning';
            expect(Modash.capitalize(string)).toEqual('Web development is just the beginning');
        });
    });

    describe('camelCase()', ()=> {
        it('camelizes string with spaces', ()=> {
            const string = 'web development is just the beginning';
            expect(Modash.camelCase(string)).toEqual('webDevelopmentIsJustTheBeginning');
        });

        it('camelizes string with underscores', ()=> {
            const string = 'web_development_is_just_the_beginning';
            expect(Modash.camelCase(string)).toEqual('webDevelopmentIsJustTheBeginning');
        });
    });
});

