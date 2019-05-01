export function getDateFormatList () {
  const months = ['MM', 'M']
    , days = ['DD', 'D']
    , years = ['YYYY', 'YY']
    , delineators = ['/', '.', '', ' ', '-']
    , dateFormatList: string[] = []
    ;

  months.forEach(month => {
  days.forEach(day => {
  years.forEach(year => {
  delineators.forEach(delineator => {
    dateFormatList.push([month, day, year].join(delineator));
  }); }); }); });

  return dateFormatList;
}
