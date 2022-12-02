import {calculateLastPage, getPageSiblings, getPagesIndex, getTop10CommenterNames} from '../utils';
import { mockComments } from './comments.mock.ts';

describe('Utility functions should work as intended',() => {
    it('calculateLastPage should return the last page', () => {
        expect(calculateLastPage(650,100)).toBe(7);
        expect(calculateLastPage(650,15)).toBe(44);
        expect(calculateLastPage(650,50)).toBe(13);
    });

    it('calculateLastPage should return the last page', () => {
        expect(getPageSiblings(1,7)).toStrictEqual({
            firstSibling: 1,
            secondSibling: 2,
        });
        expect(getPageSiblings(7,7)).toStrictEqual({
            firstSibling: 6,
            secondSibling: 7,
        });
        expect(getPageSiblings(3,7)).toStrictEqual({
            firstSibling: 2,
            secondSibling: 4,
        });
    });

    it('getPagesIndex should return appropiate blog pages', () => {
        expect(getPagesIndex(3,100)).toStrictEqual({
            firstPostIndex: 200,
            lastPostIndex: 300,
        });
        expect(getPagesIndex(5,15)).toStrictEqual({
            firstPostIndex: 60,
            lastPostIndex: 75,
        });
        expect(getPagesIndex(3,50)).toStrictEqual({
            firstPostIndex: 100,
            lastPostIndex: 150,
        });
    });

    it('getTop10CommentorsNames should the top commentors names', () => {
        const {top10CommenterNames, commentorFrequency} = getTop10CommenterNames(mockComments);
        expect(top10CommenterNames).toStrictEqual(['kajaktum','psychphysic','helf','punnerud','grappler','fareesh','calrizien', 'adultSwim','gfody','rafale']);
        expect(commentorFrequency).toStrictEqual({
            kajaktum: 3,
            helf: 2,
            psychphysic: 3,
            punnerud: 1,
            grappler: 1,
            fareesh: 1,
            calrizien: 1,
            adultSwim: 1,
            gfody: 1,
            rafale: 1,
            hias: 1,
            tiahura: 1,
            neonsunset: 1,
            '2OEH8eoCRo0': 1
        });
    });
})