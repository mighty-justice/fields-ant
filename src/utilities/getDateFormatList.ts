export function getDateFormatList() {
  const months = ['LL', 'L'],
    days = ['dd', 'd'],
    years = ['yy', 'yyyy'],
    delineators = ['/', '.', '', ' ', '-'],
    dateFormatList: string[] = [];

  months.forEach(month => {
    days.forEach(day => {
      years.forEach(year => {
        delineators.forEach(delineator => {
          dateFormatList.push([month, day, year].join(delineator));
        });
      });
    });
  });

  return dateFormatList;
}
