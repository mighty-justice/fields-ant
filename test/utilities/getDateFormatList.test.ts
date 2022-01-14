import { getDateFormatList } from '../../src/utilities';

import { DATE_FORMATS } from '@mighty-justice/utils';

describe('getDateFormatList', () => {
  it(`Correctly generates a complete date format list`, async () => {
    const dateFormats = getDateFormatList();

    expect(dateFormats[0]).toBe(DATE_FORMATS.date);

    expect(dateFormats).toContain('L/d/yy');
    expect(dateFormats).toContain('L/d/yyyy');
    expect(dateFormats).toContain('LL/d/yyyy');
    expect(dateFormats).toContain('LL/d/yy');
    expect(dateFormats).toContain('LL/dd/yy');
    expect(dateFormats).toContain('LL/dd/yyyy');

    expect(dateFormats).toContain('L.d.yy');
    expect(dateFormats).toContain('L.d.yyyy');
    expect(dateFormats).toContain('LL.d.yyyy');
    expect(dateFormats).toContain('LL.d.yy');
    expect(dateFormats).toContain('LL.dd.yy');
    expect(dateFormats).toContain('LL.dd.yyyy');

    expect(dateFormats).toContain('L-d-yy');
    expect(dateFormats).toContain('L-d-yyyy');
    expect(dateFormats).toContain('LL-d-yyyy');
    expect(dateFormats).toContain('LL-d-yy');
    expect(dateFormats).toContain('LL-dd-yy');
    expect(dateFormats).toContain('LL-dd-yyyy');

    expect(dateFormats).toContain('L/dd/yyyy');
    expect(dateFormats).toContain('L/dd/yy');
    expect(dateFormats).toContain('LL/dd/yy');
    expect(dateFormats).toContain('LL/dd/yyyy');
    expect(dateFormats).toContain('L.dd.yyyy');
    expect(dateFormats).toContain('L.dd.yy');
    expect(dateFormats).toContain('LL.dd.yy');
    expect(dateFormats).toContain('LL.dd.yyyy');
    expect(dateFormats).toContain('L-dd-yyyy');
    expect(dateFormats).toContain('L-dd-yy');
    expect(dateFormats).toContain('LL-dd-yyyy');
    expect(dateFormats).toContain('LL-dd-yyyy');
    expect(dateFormats).toContain('LL-dd-yy');
  });
});
