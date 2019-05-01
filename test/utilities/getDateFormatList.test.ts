import { getDateFormatList } from '../../src/utilities/getDateFormatList';

describe('getDateFormatList', () => {
    it(`Correctly generates a complete date format list`, async () => {
      const dateFormats = getDateFormatList();

      expect(dateFormats).toContain('M/D/YY');
      expect(dateFormats).toContain('M/D/YYYY');
      expect(dateFormats).toContain('MM/D/YYYY');
      expect(dateFormats).toContain('MM/D/YY');
      expect(dateFormats).toContain('MM/DD/YY');
      expect(dateFormats).toContain('MM/DD/YYYY');

      expect(dateFormats).toContain('M.D.YY');
      expect(dateFormats).toContain('M.D.YYYY');
      expect(dateFormats).toContain('MM.D.YYYY');
      expect(dateFormats).toContain('MM.D.YY');
      expect(dateFormats).toContain('MM.DD.YY');
      expect(dateFormats).toContain('MM.DD.YYYY');

      expect(dateFormats).toContain('M-D-YY');
      expect(dateFormats).toContain('M-D-YYYY');
      expect(dateFormats).toContain('MM-D-YYYY');
      expect(dateFormats).toContain('MM-D-YY');
      expect(dateFormats).toContain('MM-DD-YY');
      expect(dateFormats).toContain('MM-DD-YYYY');

      expect(dateFormats).toContain('M/DD/YYYY');
      expect(dateFormats).toContain('M/DD/YY');
      expect(dateFormats).toContain('MM/DD/YY');
      expect(dateFormats).toContain('MM/DD/YYYY');
      expect(dateFormats).toContain('M.DD.YYYY');
      expect(dateFormats).toContain('M.DD.YY');
      expect(dateFormats).toContain('MM.DD.YY');
      expect(dateFormats).toContain('MM.DD.YYYY');
      expect(dateFormats).toContain('M-DD-YYYY');
      expect(dateFormats).toContain('M-DD-YY');
      expect(dateFormats).toContain('MM-DD-YYYY');
      expect(dateFormats).toContain('MM-DD-YYYY');
      expect(dateFormats).toContain('MM-DD-YY');
  });
});
